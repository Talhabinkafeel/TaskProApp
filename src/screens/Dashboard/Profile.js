import React from 'react';
import {View} from "react-native";
import {Avatar, Button, Input, Text, Header} from "../../components";
import {Card, Container, Spacer} from "../../utils/sharedStyles";
import {Btn, ProfileHead} from './styles';
import {useDispatch, useSelector} from "react-redux";
import {logoutAction, updateUser, updateUserAvatar} from "../Login/actions";
import {getImageFromLibrary} from "../../utils/imagePicker";
import {getFileObj} from "../../utils/helpers";
import {axios} from "../../config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";

const Profile = ({navigation}) => {
  const [avatar, setAvatar] = React.useState();
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const user = useSelector(s => s.auth.user.data);
  const dispatch = useDispatch();

  React.useEffect(() => {
    setAvatar(user.avatar);
    setFirstName(user.firstName);
    setLastName(user.lastName);
  }, [user]);

  const uploadLogo = React.useCallback(async () => {
    const image = await getImageFromLibrary();
    setAvatar(image.uri);
    const formData = new FormData();
    formData.append('avatar', getFileObj(image));
    dispatch(updateUserAvatar(formData));
  }, []);

  const updateData = React.useCallback(() => {
    dispatch(updateUser({firstName, lastName}))
  }, [firstName, lastName]);

  const logout = React.useCallback(() => {
    axios.setToken('');
    dispatch(logoutAction());
    navigation.replace('Login');
    AsyncStorage.removeItem('token');
  }, []);

  return (
    <View style={{flex: 1}}>
      <Header title="Profile"/>
      <KeyboardAwareScrollView>
        <Container>
          <Card>
            <ProfileHead onPress={uploadLogo}>
              <Avatar src={avatar} firstName={user.firstName} size={85}/>
            </ProfileHead>
            <Input placeholder="First Name" value={firstName} onChange={setFirstName}/>
            <Input placeholder="Last Name" value={lastName} onChange={setLastName}/>
            <Input placeholder="Email" value={user.email} disabled/>
            <Spacer/>
            <Button title="Submit" onPress={updateData} disabled={!firstName || !lastName}/>
          </Card>
          <Spacer/>
          <Btn onPress={() => navigation.navigate('Invitations')}><Text primary size="medium">Invitations</Text></Btn>
          <Spacer/>
          <Btn onPress={logout}><Text color="#e74c3c" size="medium">Logout</Text></Btn>
        </Container>
      </KeyboardAwareScrollView>
    </View>
  )
};

export default Profile;
