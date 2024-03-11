import React from 'react';
import {ActivityIndicator, TouchableOpacity, View} from 'react-native';
import {GiftedChat, Bubble} from 'react-native-gifted-chat';
import {getTheme, IS_IOS, IS_IPHONE_X} from "../../config/theme";
import {theme as themeStyle} from "../../config/theme";
import {ChatInput, Icon, Spinner, Text, Avatar} from "../../components";
import {getBubbleProps} from "./config";
import {useDispatch, useSelector} from "react-redux";
import {axios} from "../../config";
import {clearSentMessage, conversationReply, deleteConversation, deleteMessageSuccess, setSeenMessages} from "../Messages/actions";
import {disconnectSocket, initiateSocket, sendMessage, subscribeToChat} from "./socket";
import {mapMessageData, openFile} from "../../utils/helpers";
import {LoadBtn, LoadBtnTxt, Content, Header, FileLink} from "./styles";
import {BackBtn, Row} from "../../utils/sharedStyles";
import MenuPopup from "../../components/MenuPopup";

const Chat = (props) => {
  const [loading, setLoading] = React.useState(true);
  const [page, setPage] = React.useState(0);
  const [messages, setMessages] = React.useState([]);
  const [isGroup, setIsGroup] = React.useState(false);
  const [groupName, setGroupName] = React.useState('');
  const [groupImage, setGroupImage] = React.useState('');
  const [recipient, setRecipient] = React.useState(false);
  const [recipients, setRecipients] = React.useState([]);
  const [message, setMessage] = React.useState('');
  const [loadingMoreMsg, setLoadingMoreMsg] = React.useState(false);
  const [noMoreMsg, setNoMoreMsg] = React.useState(false);
  const theme = getTheme();
  const dispatch = useDispatch();
  const conversationId = React.useMemo(() => props.route.params?.conversation._id, []);
  const menuItems = React.useMemo(() => [
    ...(!isGroup ? [
      {value: 1, label: 'Delete', onPress: () => {dispatch(deleteConversation(conversationId)); props.navigation.goBack()}},
    ] : []),
  ], [isGroup, recipient, conversationId]);
  const user = useSelector(state => state.auth.user.data);
  const sentMessage = useSelector(state => state.chat.sentMessage);

  React.useEffect(() => {
    const conversation = props.route.params?.conversation;
    if (conversation._id) {
      if (!props.route.params?.noInitialData) setInitialData(conversation);
      fetchData(conversation._id);
      initiateSocket(conversation._id);
      subscribeToChat(data => {
        if (data.message) {
          setMessages(oldChats =>[data.message, ...oldChats]);
          dispatchSetSeenMessages([data.message._id]);
        }
      });
    }
    return () => {disconnectSocket()}
  }, []);

  const fetchData = React.useCallback(async (conversationId) => {
    const res = await axios.get('/chat/conversation/' + conversationId);
    setInitialData(res.data);
    setLoading(false);
    setMessages(res.data.messages || []);
    const unseenMessages = res.data.messages.filter(m => m.user !== user._id && !m.seenBy?.includes(user._id)).map(m => m._id);
    dispatchSetSeenMessages(unseenMessages);
  }, [user._id]);
  const dispatchSetSeenMessages = React.useCallback((messageIds) => {
    dispatch(setSeenMessages({messageIds, conversationId: props.route.params?.conversation._id, userId: user._id}));
  }, [user]);

  const setInitialData = React.useCallback((data) => {
    if (!data.isGroup) {
      const recipientUser = data.users.find(x => x._id !== user._id);
      setRecipient(recipientUser);
    }
    else {
      setRecipients(data.users.filter(x => x._id !== user._id));
      setGroupName(data.name);
      if (data.image) setGroupImage(data.image);
      setIsGroup(true);
    }
  }, [user]);

  const appendMessage = React.useCallback((message, cb) => {
    const tempId = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(2, 10);
    setMessages(previousMessages => [{
      _id: tempId,
      ...message,
      createdAt: new Date(),
      user: {_id: user._id, name: user.name, avatar: user.avatar},
    }, ...previousMessages]);
    if (cb) cb(tempId);
  }, [user, recipients, isGroup, recipient]);

  const onSend = React.useCallback((message) => {
    const dbData = {conversationId, messageData: {...message}};
    dispatch(conversationReply(dbData));
  }, [conversationId]);

  React.useEffect(() => {
    if (sentMessage) {
      setMessages(messages => messages.map((msg, i) => i === 0 ? sentMessage : msg));
      sendMessage({...sentMessage, recipientIds: isGroup ? recipients.map(r => r._id) : [recipient._id]});
      dispatch(clearSentMessage());
    }
  }, [sentMessage, isGroup, recipients, recipient]);

  const deleteMessage = React.useCallback(async (message) => {
    if (message.user._id === user._id) {
      await axios.delete('/chat/conversation/message/' + message._id);
      setMessages(messages => messages.filter(msg => msg._id !== message._id));
      const msgPos = messages.findIndex(m => m._id === message._id) + 1;
      if (messages.length === msgPos) deleteMessageSuccess({conversationId, lastMsg: messages[messages.length-2]});
    }
  }, [user._id]);

  const onBubbleLongPress = React.useCallback((context, message) => {
    const options = ['Cancel'];
    if (message.user._id === user._id) options.unshift('Delete Message');
    if (options.length > 1) {
      const cancelButtonIndex = options.length - 1;
      context.actionSheet().showActionSheetWithOptions({options, cancelButtonIndex}, async (buttonIndex) => {
        if (buttonIndex === 0) deleteMessage(message);
      });
    }
  }, []);

  const bubbleProps = React.useMemo(() => ({...getBubbleProps(theme), onLongPress: onBubbleLongPress}), [theme]);

  const navigateProfile = React.useCallback(() => {
    if (isGroup)
      props.navigation.navigate('GroupProfile', {_id: conversationId, image: groupImage, name: groupName});
  }, [isGroup, groupImage, groupName, recipient, conversationId]);

  const updateMessageData = React.useCallback((id, data) => {
    setMessages(messages => messages.map(m => m._id === id ? ({...m, ...data}) : m))
  }, []);

  const loadMore = React.useCallback(async () => {
    const newPage = page + 1;
    setLoadingMoreMsg(true);
    const res = await axios.get(`/chat/conversation/${conversationId}/messages?page=${newPage}`);
    setMessages(state => [...state, ...res.data.messages]);
    setLoadingMoreMsg(false);
    setPage(newPage);
    if (!res.data.messages.length) setNoMoreMsg(true);
  }, [page]);

  const messagesData = React.useMemo(() => mapMessageData(messages), [messages]);

  const renderLoadMoreBtn = React.useMemo(() => (messages.length > 19 && !noMoreMsg) ?
    <LoadBtn onPress={loadMore} disabled={loadingMoreMsg}>{loadingMoreMsg ? <ActivityIndicator size="small" color="#fff"/>
    : <LoadBtnTxt>Load more</LoadBtnTxt>}</LoadBtn>
    : null, [messages, loadingMoreMsg, noMoreMsg, page]);

  return (
    <>
      <Header style={{height: 'auto'}}>
        <Row style={{justifyContent: 'space-between', paddingHorizontal: 25}}>
          <Content>
            <BackBtn onPress={() => props.navigation.goBack()}>
              <Icon name="arrow-left"/>
            </BackBtn>
            <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center'}} onPress={navigateProfile} activeOpacity={1}>
              <Avatar src={isGroup ? groupImage : recipient.avatar} firstName={isGroup ? groupName : recipient.firstName} style={{marginRight: 15}}/>
              <Text size="title">{isGroup ? groupName : (recipient.firstName||'') + ' ' + (recipient.lastName||'')}</Text>
            </TouchableOpacity>
          </Content>
          {!isGroup && <MenuPopup triggerButton={<View style={{top: (IS_IOS && !IS_IPHONE_X) ? 0 : -5, padding: 5}}><Icon name="dots-vertical"/></View>} items={menuItems}/>}
        </Row>
      </Header>
      {loading ? <Spinner/> :
        <View style={themeStyle.body}>
          <GiftedChat
            messages={messagesData}
            user={{_id: user._id}}
            minInputToolbarHeight={60}
            renderBubble={props => {
              if (props.currentMessage.file)
                return <FileLink onPress={() => openFile(props.currentMessage.file)}><Text>{props.currentMessage.fileName}</Text></FileLink>;
              else {
                const allProps = {...props, ...bubbleProps};
                return <Bubble {...allProps}/>
              }
            }}
            renderAvatar={props => <Avatar src={props.currentMessage.user.avatar} firstName={props.currentMessage.user.firstName} style={{top: -10, marginRight: 0}}/>}
            renderInputToolbar={() => <ChatInput value={message} onChange={setMessage} onSend={onSend} appendMessage={appendMessage} updateMessageData={updateMessageData} />}
            listViewProps={{ListFooterComponent: renderLoadMoreBtn}}
          />
        </View>
      }
    </>
  )
};

export default Chat;
