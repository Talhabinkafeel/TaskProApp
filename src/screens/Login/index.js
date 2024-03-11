import React from 'react';
import {Spacer} from "../../utils/sharedStyles";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Button, Input, Text} from "../../components";
import {Divider, Footer, Logo} from './styles';
import {useDispatch, useSelector} from "react-redux";
import {login} from "./actions";
import {axios} from "../../config";
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const Login = ({navigation}) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const loading = useSelector(s => s.auth.user.loading);
  const dispatch = useDispatch();

  React.useEffect(() => {
    AsyncStorage.getItem('token').then(token => {
      if (token) {
        axios.setToken(token);
        navigation.replace('Home');
      }
    })
  }, []);

  const loginFunc = React.useCallback(() => {
    dispatch(login({email, password}))
  }, [email, password]);

  return (
    <KeyboardAwareScrollView contentContainerStyle={{padding: 25}}>
      <Logo/>
      <Text size="big" weight={700}>TaskPro {'\n'}Login</Text>
      <Divider/>
      <Input value={email} onChange={setEmail} placeholder="Email" autoCapitalize="none"/>
      <Input value={password} onChange={setPassword} placeholder="Password" autoCapitalize="none" secureTextEntry/>
      <Spacer/>
      <Button title="Login" onPress={loginFunc} loading={loading}/>
      <Footer>
        <Text onPress={() => navigation.navigate('SignUp')} align="center">
          Don’t have an account? <Text primary>Sign up</Text>
        </Text>
      </Footer>
    </KeyboardAwareScrollView>
  )
};

export default Login;
