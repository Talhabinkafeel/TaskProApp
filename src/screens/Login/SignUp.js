import React from 'react';
import {Spacer} from "../../utils/sharedStyles";
import {Button, Input, Text} from "../../components";
import {Divider, Footer, Logo} from './styles';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {register} from "./actions";
import {useDispatch, useSelector} from "react-redux";
import {validateEmail} from "../../utils/helpers";
import toastAlert from "../../utils/toast";

const SignUp = ({navigation}) => {
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const loading = useSelector(s => s.auth.user.loading);
  const dispatch = useDispatch();

  const registerFunc = React.useCallback(() => {
    if (!validateEmail(email)) return toastAlert('error', 'Email is not valid');
    dispatch(register({firstName, lastName, email, password}))
  }, [firstName, lastName, email, password]);

  return (
    <KeyboardAwareScrollView contentContainerStyle={{padding: 25}}>
      <Logo/>
      <Text size="big" weight={700}>TaskPro {'\n'}Sign Up</Text>
      <Divider/>
      <Input value={firstName} onChange={setFirstName} placeholder="First Name"/>
      <Input value={lastName} onChange={setLastName} placeholder="Last Name"/>
      <Input value={email} onChange={setEmail} placeholder="Email" autoCapitalize={false}/>
      <Input value={password} onChange={setPassword} placeholder="Password" secureTextEntry/>
      <Spacer/>
      <Button title="Sign Up" onPress={registerFunc} disabled={!firstName || !lastName || !email || !password} loading={loading}/>
      <Footer>
        <Text onPress={() => navigation.navigate('Login')} align="center">
          Do you have an account? <Text primary>Login</Text>
        </Text>
      </Footer>
    </KeyboardAwareScrollView>
  )
};

export default SignUp;
