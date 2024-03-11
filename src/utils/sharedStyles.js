import styled from "styled-components/native";
import {IS_IOS, IS_IPHONE_X} from "../config/theme";

const Container = styled.View`
  flex: 1;
  padding: 25px;
  background-color: ${({theme}) => theme.bg}
`;

const Spacer = styled.View`
  height: 20px
`;

const Card = styled.View`
  padding: 25px;
  background-color: ${({theme}) => theme.bg3};
  border-radius : 6px;
`;

const Row = styled.View`
  flex-direction: row;
  align-items: center;
`;

const Header = styled.View`
  background-color: ${({theme}) => theme.mode === 'dark' ? theme.bg2 : theme.bg3};
  height: ${IS_IPHONE_X ? 110 : IS_IOS ? 90 : 70}px;
  padding-top: ${IS_IPHONE_X ? 40 : IS_IOS ? 20 : 0}px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-horizontal: 25px;
`;

const BackBtn = styled.TouchableOpacity`
  margin-right: 18px;
  padding-top: 2px;
`;

const Link = styled.TouchableOpacity.attrs({activeOpacity: 0.8})`
  
`;

export {
  Container,
  Spacer,
  Card,
  Row,
  Header,
  BackBtn,
  Link
}
