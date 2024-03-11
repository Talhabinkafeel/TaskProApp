import React from 'react';
import {Animated, SafeAreaView, Dimensions, TouchableOpacity} from 'react-native';
import {Bar, headerContainer, Head, LeftBtn, LeftContainer, titleStyle, ListHeader, ListItem, ListLeft, ListAvatar, ExitBtn, RightBtn, NameInput, InputContainer} from "./styles";
import {deleteConversation, exitConversation, updateGroupImageSuccess, updateGroupSuccess} from "../Messages/actions";
import {Avatar, Icon, MenuPopup, Text} from "../../components";
import {getAvatarPath, getFileObj} from "../../utils/helpers";
import {useDispatch, useSelector} from "react-redux";
import AddParticipantsModal from "./AddParticipant";
import {getImageFromLibrary} from "../../utils/imagePicker";
import FastImage from "react-native-fast-image";
import {axios} from "../../config";

const AnimatedText = Animated.createAnimatedComponent(Text);
const AnimatedImage = Animated.createAnimatedComponent(FastImage);

const GroupProfile = (props) => {
  const [data, setData] = React.useState({...props.route.params});
  const [modalVisible, setModalVisible] = React.useState(false);
  const [isEdit, setIsEdit] = React.useState(false);
  const [name, setName] = React.useState(props.route.params.name);
  const animatedScrollYValue = React.useRef(new Animated.Value(0)).current;
  const userId = useSelector(state => state.auth.user.data._id);
  const dispatch = useDispatch();
  const menuItems = React.useMemo(() => [
    {value: 0, label: 'Delete group', onPress: () => dispatch(deleteConversation(data._id))},
    {value: 1, label: 'Exit group', onPress: () => dispatch(exitConversation(data._id))},
  ]);

  React.useEffect(() => {
    fetchData();
  }, []);

  const avatarSize = animatedScrollYValue.interpolate({
    inputRange: [10, 80],
    outputRange: [120, 45],
    extrapolate: 'clamp',
  });
  const avatarLeft = animatedScrollYValue.interpolate({
    inputRange: [10, 80],
    outputRange: [(Dimensions.get('window').width / 2) - 60, 60],
    extrapolate: 'clamp',
  });
  const titleOpacity = animatedScrollYValue.interpolate({
    inputRange: [50, 80],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  const fetchData = React.useCallback(async () => {
    const res = await axios.get('/chat/conversation/' + props.route.params._id);
    if (res.data) setData(res.data);
  }, []);

  const removeGroupUser = React.useCallback(async (userId) => {
    setData(state => ({...state, users: state.users.filter(x => x._id !== userId)}));
    await axios.put(`/chat/conversation/group/${data._id}/remove/${userId}`);
  }, [data._id]);

  const addParticipants = React.useCallback(async (participants) => {
    setData(state => ({...state, users: [...state.users, ...participants]}));
    setModalVisible(false);
    await axios.put(`/chat/conversation/group/${data._id}/participant`, {participants: participants.map(p => p._id)});
  }, []);

  const updateImage = React.useCallback(async () => {
    const file = await getImageFromLibrary({quality: 0.5});
    if (file.uri) {
      setData(state => ({...state, image: file.uri}));
      dispatch(updateGroupImageSuccess({conversationId: data._id, path: file.uri}));
      const form = new FormData();
      form.append('image', getFileObj(file));
      const res = await axios.put(`/chat/conversation/group/${data._id}/image`, form, {headers: {"Content-Type": "multipart/form-data"}});
      setData(state => ({...state, image: res.path}));
    }
  }, [data]);

  const updateName = React.useCallback(async () => {
    await axios.put('/chat/conversation/group/' + data._id, {name});
    setData(state => ({...state, name}));
    dispatch(updateGroupSuccess({conversationId: data._id, name}));
    setIsEdit(false);
  }, [name]);

  const renderName = React.useMemo(() =>
    !isEdit ? <Text onPress={() => setIsEdit(true)} size="large" numberOfLines={1}>{data.name}</Text> :
      <InputContainer>
        <NameInput value={name} onChangeText={setName} />
        <TouchableOpacity onPress={updateName}><Icon name="edit" size={20} /></TouchableOpacity>
      </InputContainer>, [name, isEdit, data]
  );

  return (
    <>
      <SafeAreaView><Bar/></SafeAreaView>
      <Animated.View style={headerContainer}>
        <LeftContainer>
          <LeftBtn onPress={props.navigation.goBack}><Icon name="arrow-left" size={23}/></LeftBtn>
          <AnimatedText style={{...titleStyle, opacity: titleOpacity}} numberOfLines={1}>{data.name}</AnimatedText>
        </LeftContainer>
        <AnimatedImage
          source={getAvatarPath(data.image, true)}
          style={{height: avatarSize, width: avatarSize, left: avatarLeft, position: 'absolute', top: -2, borderRadius: 80}}/>
        <MenuPopup
          triggerButton={<RightBtn><Icon name="dots-vertical" /></RightBtn>}
          items={menuItems}
          optionsContainerStyle={{maxWidth: 150, marginLeft: -35}}
        />
      </Animated.View>
      <Animated.ScrollView onScroll={Animated.event([{nativeEvent: {contentOffset: {y: animatedScrollYValue}}}], {useNativeDriver: false})}>
        <Head>{renderName}</Head>
        <ListItem style={{borderBottomWidth: 1}} onPress={updateImage}>
          <ListLeft>
            <Icon name="image" themeColor="gray"/><Text style={{marginLeft: 7}}>Change Image</Text>
          </ListLeft>
        </ListItem>
        <ListHeader>
          <Text>Participants ({data.users?.length})</Text>
          {userId === data.admin ? <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Icon name="plus-circle" size={23} themeColor="primary" />
          </TouchableOpacity>: null}
        </ListHeader>
        {data.users?.map(user =>
          <ListItem key={user._id}>
            <ListLeft>
              <Avatar src={user.avatar} firstName={user.firstName} style={{marginRight: 10}}/>
              <Text>{user.firstName} {user.lastName}</Text>
            </ListLeft>
            {(userId !== user._id && userId === data.admin) ? <TouchableOpacity onPress={() => removeGroupUser(user._id)}><Icon name="delete" size={15}/></TouchableOpacity>: null}
          </ListItem>
        )}
        <ExitBtn onPress={() => dispatch(exitConversation(data._id))}>
          <Icon name="close" size={20} themeColor="danger" />
          <Text color="danger" style={{marginLeft: 10}}>Exit Group</Text>
        </ExitBtn>
        {userId === data.admin ?
          <ExitBtn onPress={() => dispatch(deleteConversation(data._id))}>
            <Icon name="delete" size={20} themeColor="danger" />
            <Text color="danger" style={{marginLeft: 10}}>Delete Group</Text>
          </ExitBtn> : null
        }
      </Animated.ScrollView>
      <AddParticipantsModal
        visible={modalVisible}
        close={() => setModalVisible(false)}
        currentParticipants={data.users?.map(x => x._id) || []}
        addParticipants={addParticipants}
      />
    </>
  )
};

export default GroupProfile;
