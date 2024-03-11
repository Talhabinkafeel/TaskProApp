import styled from "styled-components/native";
import {IS_IOS, IS_IPHONE_X} from "../../config/theme";

const Container = styled.View`
  background-color: ${({theme}) => theme.mode === 'dark' ? theme.bg2 : theme.bg3};
  height: ${IS_IPHONE_X ? 110 : IS_IOS ? 90 : 70}px;
  padding-top: ${IS_IPHONE_X ? 40 : IS_IOS ? 20 : 0}px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-horizontal: 20px;
`;

const Right = styled.View`
  flex-direction: row;
  align-items: center;
`;

const Btn = styled.TouchableOpacity`
  padding: 5px;
  margin-left: 10px;
`;

export {
  Container, Right, Btn
}
