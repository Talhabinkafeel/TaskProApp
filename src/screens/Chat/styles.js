import styled from "styled-components/native";
import {IS_IOS, IS_IPHONE_X} from "../../config/theme";

const bubbleCommonStyle = {
  marginBottom: 10,
  padding: 7,
  paddingBottom: 5
};

const LoadBtn = styled.TouchableOpacity.attrs({activeOpacity: 0.8})`
  padding-vertical: 6px;
  background-color: ${({theme}) => theme.primary};
  width: 130px;
  align-self: center;
  align-items: center;
  margin-bottom: 15px;
  border-radius: 3px;
  height: 35px;
  justify-content: center;
  margin-top: 15px;
`;

const LoadBtnTxt = styled.Text`
  color: #fff;
  font-size: 14px;
`;

const Header = styled.SafeAreaView`
  backgroundColor: ${({theme}) => theme.mode === 'dark' ? theme.bg2 : '#fff'};
  height: ${IS_IPHONE_X ? 90 : 70}px;
  padding-top: ${IS_IPHONE_X ? 0 : 15}px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  z-index: 9999;
`;

const Content = styled.View`
  flex-direction: row;
  align-items: center;
  flex: 1;
  margin-bottom: ${(IS_IOS && !IS_IPHONE_X) ? 10: 15}px;
  margin-top: ${(IS_IOS && !IS_IPHONE_X) ? 10 : 0}px;
`;

const FileLink = styled.TouchableOpacity`
  padding-vertical: 10px;
  padding-horizontal: 15px;
  margin-bottom: 10px;
  background-color: ${({theme}) => theme.mode === 'dark' ? theme.bg2 : '#fff'};
`;

export {bubbleCommonStyle, LoadBtn, LoadBtnTxt, Header, Content, FileLink};
