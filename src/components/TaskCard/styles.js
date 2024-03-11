import styled from "styled-components/native";
import {Text} from "../index";

const CardContainer = styled.TouchableOpacity.attrs({activeOpacity: 0.8})`
  background-color: ${({theme}) => theme.bg3};
  padding: 15px;
  margin-bottom: 15px;
  border-radius: 10px;
`;

const CardImage = styled.Image`
  width: 100%;
  height: 150px;
  background: ${({theme}) => theme.border}
  margin-bottom: 10px;
  border-radius: 10px;
  resize-mode: cover;
  margin-top: 15px;
`;

const FooterItem = styled.View`
  flex-direction: row;
  align-items: center;
  margin-left: 10px;
`;

export {CardContainer, CardImage, FooterItem};
