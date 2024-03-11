import styled from "styled-components/native";
import {IS_IPHONE_X} from "../../config/theme";

const BoardHead = styled.View`
  padding: 25px;
  padding-top: 5px;
  padding-bottom: 20px;
  background: ${({theme}) => theme.mode === 'dark' ? theme.bg2 : theme.bg3};
`;

const Tabs = styled.View`
  flex-direction: row;
  margin-top: 25px;
  justify-content: space-between;
  width: 100%;
`;

const TabItem = styled.TouchableOpacity.attrs({activeOpacity: 0.8})`
  align-items: center;
`;

const Dot = styled.View`
  width: 5px;
  height: 5px;
  border-radius: 5px;
  margin-top: 8px;
  background: ${({theme}) => theme.primary}; 
`;

const FloatBtn = styled.TouchableOpacity.attrs({activeOpacity: 0.8})`
  width: 60px;
  height: 60px;
  border-radius: 40px;
  background-color: ${({theme}) => theme.primary};
  position: absolute;
  right: 25px;
  bottom: 25px;
  justify-content: center;
  align-items: center;
`;

const CalendarContainer = styled.SafeAreaView`
  background-color: ${({theme}) => theme.mode === 'dark' ? theme.bg2 : '#fff'};
  
`;

const CalendarCard = styled.TouchableOpacity.attrs({activeOpacity: 0.8})`
  background-color: ${({theme}) => theme.bg3};
  flex-direction: row;
  align-items: center;
  padding: 15px;
  marginBottom: 20px;
  border-radius: 5px;
`;

const Divider = styled.View`
  height: 1px;
  background-color: ${({theme}) => theme.border};
  margin-vertical: 35px;
`;

export {BoardHead, TabItem, Tabs, Dot, FloatBtn, CalendarContainer, CalendarCard, Divider};
