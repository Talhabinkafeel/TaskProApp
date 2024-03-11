import React from 'react';
import {View, FlatList, TouchableOpacity, RefreshControl} from 'react-native';
import {sharedStyles, theme} from "../../config/theme";
import {Avatar, Header, Icon, Text} from "../../components";
import {FloatButton, Item, MessageText, Time, UserName, Msg, UnseenCount, ItemRight, Empty} from "./styles";
import CreateChat from "./CreateChat";
import {useDispatch, useSelector} from "react-redux";
import {createConversationSuccess, getConversations, refreshConversation} from "./actions";
import {moment} from "../../utils/moment";
import {sortConversations} from "../../utils/helpers";
import {disconnectSocket, initiateSocket, newChat, refreshMessages} from "./socket";

function Home(props) {
  const [modalVisible, setModalVisible] = React.useState(false);
  const dispatch = useDispatch();
  const conversations = useSelector(state => state.chat.conversations);
  const user = useSelector(state => state.auth.user.data);

  React.useEffect(() => {
    dispatch(getConversations());
    return () => {disconnectSocket()}
  }, []);

  React.useEffect(() => {
    if (user._id) {
      initiateSocket(user._id);
      refreshMessages(data => dispatch(refreshConversation(data)));
      newChat(data => dispatch(createConversationSuccess({conversation: data})));
    }
  }, [user._id]);

  const onItemClick = React.useCallback((item) => {
    if (item.isGroup) props.navigation.navigate('GroupProfile', item);
  }, [user]);

  const msgText = React.useCallback((icon, text, unseenMessage) => <Msg><Icon name={icon} size={18} /><MessageText unseen={unseenMessage}withIcon>{text}</MessageText></Msg>, []);
  const renderItem = React.useCallback(({item}) => {
    const recipient = item.users.find(x => x._id !== user._id);
    let text;
    const msg = item.message;
    const sender = msg?.user._id === user._id;
    const unseenMessage = msg && !sender && !msg?.seenBy?.includes(user._id);
    const unseenMessageLength = item.unseenMessageLength;
    text = !msg ? <MessageText>Draft...</MessageText>
      : msg.image ? msgText('image', 'Photo', unseenMessage)
      : msg.file ? msgText('file', 'File', unseenMessage):
        <MessageText unseen={unseenMessage}>{msg.text}</MessageText>;
    return (
      <Item onPress={() => props.navigation.navigate('Chat', {conversation: item})} unseen={unseenMessage}>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity onPress={() => onItemClick(item)} activeOpacity={1}>
            <Avatar
              src={!item.isGroup ? recipient.avatar : item.image}
              firstName={!item.isGroup ? recipient.firstName : item.name} size={40} style={{marginRight: 10}}/>
          </TouchableOpacity>
          <View>
            <UserName unseen={unseenMessage}>{item.isGroup ? item.name : recipient.firstName + ' ' + recipient.lastName}</UserName>
            {text}
          </View>
        </View>
        <View>
          <Time>{moment(msg?.createdAt || item.createdAt).fromNow()}</Time>
          <ItemRight>
            {unseenMessage ? <UnseenCount><Text color="#fff">{unseenMessageLength > 9 ? '9+' : unseenMessageLength}</Text></UnseenCount>
              : <View style={{height: 17}} />}
          </ItemRight>
        </View>
      </Item>
    )
  }, [user._id]);

  return (
    <View style={{flex: 1}}>
      <Header title="Messages"/>
      <View style={theme.body}>
        {conversations.loading || conversations.data.length > 0 ?
          <FlatList
            data={conversations.data.slice().sort(sortConversations)}
            renderItem={renderItem}
            keyExtractor={(item) => item._id}
            refreshControl={<RefreshControl refreshing={conversations.loading} onRefresh={() => dispatch(getConversations())}/>}
          />
          :
          <View style={sharedStyles.centeredContent}>
            <Empty>
              <Icon name="message" size={50}/>
            </Empty>
            <Text size="large" weight="bold">No Messages</Text>
          </View>
        }
        <FloatButton onPress={() => setModalVisible(true)}>
          <Icon name='plus' size={30} color="#fff" />
        </FloatButton>
      </View>
      <CreateChat visible={modalVisible} close={() => setModalVisible(false)} navigate={props.navigation.navigate}/>
    </View>
  )
}

export default Home;
