import React from 'react';
import {Modal, View, SafeAreaView, FlatList} from 'react-native';
import debounce from 'lodash.debounce';
import {Avatar, Icon, Text} from "../../components";
import {theme} from "../../config/theme";
import {useDispatch, useSelector} from "react-redux";
import {createConversation, createGroup} from "./actions";
import {getImageFromLibrary} from "../../utils/imagePicker";
import {axios} from "../../config";
import {BackBtn} from "../../utils/sharedStyles";
import {
  CreateHeader,
  LeftText,
  Input,
  Row,
  UserItem,
  UserName,
  MessageText,
  ModalContent,
  Checked,
  GroupInfo,
  ImagePicker,
  GroupImage,
  NameInput,
  FloatButton,
  Head
} from './styles';

const CreateChat = ({visible, close, navigate}) => {
  const [search, setSearch] = React.useState('');
  const [searchDb, setSearchDb] = React.useState('');
  const [data, setData] = React.useState([]);
  const [selected, setSelected] = React.useState([]);
  const [isGroupCreating, setIsGroupCreating] = React.useState(false);
  const [groupImage, setGroupImage] = React.useState();
  const [groupName, setGroupName] = React.useState('');
  const contacts = useSelector(state => state.auth.user.data.contacts);
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (!visible) {
      setSearch('');
      setSearchDb('');
      setData([]);
      setSelected([]);
      setIsGroupCreating(false);
      setGroupImage();
      setGroupName('');
    }
  }, [visible]);

  React.useEffect(() => {
    if (search.length > 1) {
      setData([]);
      searchData(searchDb);
    }
  }, [searchDb]);
  const searchData = React.useCallback(async (Search = search) => {
    const res = await axios.get('/user/search?q=' + Search);
    setData(res.data);
  }, []);

  const debouncedSave = React.useCallback(debounce(nextValue => setSearchDb(nextValue), 1000), []);
  const handleChange = val => {setSearch(val); debouncedSave(val)};

  const newConversation = React.useCallback(async (user) => {
    const res = (await axios.get('/chat/conversation-exist/' + user._id)).data;
    if (res.isExist)
      navigate('Chat', {conversation: {_id: res.conversationId}, noInitialData: true});
    else
      dispatch(createConversation(user));
    close();
  }, []);
  const newGroup = React.useCallback(() => {
    dispatch(createGroup({name: groupName, participants: selected.map(p => p._id), groupImage}));
    close();
  }, [groupName, selected, groupImage]);

  const onItemClick = React.useCallback((item) => {
    if (selected.length) {
      if (selected.find(x => x._id === item._id)) {
        setSelected(selected.filter(x => x._id !== item._id));
        if (selected.length < 3) setIsGroupCreating(false);
      }
      else
        setSelected([...selected, item]);
    } else
      newConversation(item)
  }, [selected]);
  const onItemLongClick = React.useCallback((item) => {
    if (!selected.find(x => x._id === item))
      setSelected([...selected, item]);
  }, [selected]);

  const renderItem = React.useCallback(({item}, groupItem) => <UserItem key={item._id} onPress={() => onItemClick(item)} onLongPress={() => !groupItem && onItemLongClick(item)}>
    <View style={{width: 40, height: 40, marginRight: 15}}>
      <Avatar src={item.avatar} size={40} firstName={item.firstName}/>
      {groupItem ? <Checked><Icon name="check" size={10} color="#fff"/></Checked> : null}
    </View>
    <View style={{top: -9}}>
      <UserName>{item.firstName} {item.lastName}</UserName>
      <MessageText>{item.email}</MessageText>
    </View>
  </UserItem>);

  const uploadImage = React.useCallback(async () => {
    const source = await getImageFromLibrary({quality: 0.5});
    if (source?.uri) setGroupImage(source);
  }, []);

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={close}>
      <ModalContent>
        {!isGroupCreating ?
          <>
          <Head>
            <SafeAreaView>
              <CreateHeader>
                <BackBtn style={{marginLeft: 6}} onPress={close}><Icon name="close"/></BackBtn>
                <Text size="title">New Conversation</Text>
              </CreateHeader>
            </SafeAreaView>
            <Row>
              <LeftText>To</LeftText>
              <Input placeholder="Type a name or email" value={search} onChangeText={handleChange}/>
            </Row>
          </Head>
          <View style={theme.body}>
            {selected.length ?
              <View>
                <Text style={{margin: 15}}>Participants</Text>
                {selected.map(item => renderItem({item}, true))}
              </View> : null
            }
            <FlatList
              data={(searchDb ? data : contacts)?.filter(x => !selected.find(y => x._id === y._id))}
              renderItem={renderItem}
              keyExtractor={(x, i) => i.toString()}
              contentContainerStyle={{paddingTop: 25}}
            />
          </View>
          {selected.length > 1 ? <FloatButton onPress={() => setIsGroupCreating(true)}>
            <Icon name='arrow-right' color="#fff" /></FloatButton> : null}
          </>
          :
          <>
            <Head>
              <SafeAreaView>
                <CreateHeader>
                  <BackBtn style={{marginLeft: 6}} onPress={() => setIsGroupCreating(false)}><Icon name="close"/></BackBtn>
                  <Text size="title">New Group</Text>
                </CreateHeader>
              </SafeAreaView>
            </Head>
            <GroupInfo>
              <ImagePicker onPress={uploadImage}>
                {groupImage ? <GroupImage source={{uri: groupImage.uri}} /> : <Icon name="image" size={20}/>}
              </ImagePicker>
              <NameInput value={groupName} onChangeText={setGroupName} />
            </GroupInfo>
            <View style={theme.body}>
              <View>
                <Text style={{margin: 15}}>Group Participants</Text>
                {selected.map(item => renderItem({item}, true))}
              </View>
            </View>
            <FloatButton disabled={!groupName} onPress={newGroup}><Icon name="send" color="#fff"/></FloatButton>
          </>
        }
      </ModalContent>
    </Modal>
  )
};

export default CreateChat;
