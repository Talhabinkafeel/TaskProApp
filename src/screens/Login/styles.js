import styled from "styled-components/native";
import {IS_IPHONE_X} from "../../config/theme";

const Divider = styled.View`
  width: 45px;
  height: 7px;
  background-color: ${({theme}) => theme.secondary};
  margin-vertical: 25px;
`;

const Footer = styled.View`
  marginTop: 25px;
  left: 0;
  right: 0;
  
`;

const Logo = styled.Image.attrs({source: require('../../images/logo.png')})`
  width: 60px;
  height: 60px;
  margin-top: ${IS_IPHONE_X ? 70 : 50}px;
  margin-bottom: 25px;
`;

export {
  Divider,
  Footer,
  Logo
}
