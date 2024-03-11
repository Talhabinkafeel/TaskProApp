import styled from "styled-components/native";

const Wrapper = styled.TouchableOpacity.attrs({activeOpacity: 0.8})`
  background-color: ${({theme}) => theme.bg3};
  width: 100%;
  margin-bottom: 15px;
  border-width: 1px;
  border-color: ${({theme}) => theme.border};
  flex-direction: row;
  align-items: center;
  padding-horizontal: 15px;
  padding-vertical: 15px;
  border-radius: 10px;
`;

const Content = styled.View`
  margin-left: 15px;
  flex: 1;
`;

const Footer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export {Wrapper, Content, Footer};
