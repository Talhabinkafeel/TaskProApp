import styled from "styled-components";
import React from "react";
import {IS_IOS} from "../../config/theme";

const HeadContainer = styled.View`
  padding: 20px;
  padding-top: ${IS_IOS ? 5 : 20}px;
  padding-bottom: 0;
  background-color: ${({theme}) => theme.mode === 'dark' ? theme.bg2 : theme.bg3};
`;

const Row = styled.View`
  flex-direction: row;
`;

const GraphItem = styled.View`
  width: 160px
  border-width: 1px;
  border-color: ${({theme}) => theme.border};
  background-color: ${({theme}) => theme.mode === 'dark' ? theme.bg3 : 'transparent'};
  padding: 10px;
  border-radius: 8px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-right: 15px;
`;

const Scroll = styled.ScrollView.attrs({horizontal: true})`
  padding-bottom: 15px;
`;

const Menu = styled.View`
  flex-direction: row;
`;

const MenuItem = styled.TouchableOpacity.attrs({activeOpacity: 0.8})`
  height: 50px;
  border-bottom-width: 3px;
  border-color: ${({theme, active}) => active ? theme.txt : 'transparent'};
  justify-content: center;
  padding-horizontal: 20px;
  margin-right: 15px;
`;

const ProfileHead = styled.TouchableOpacity.attrs({activeOpacity: 0.9})`
  align-items: center;
  margin-horizontal: 25px;
`;

const Btn = styled.TouchableOpacity.attrs({activeOpacity: 0.8})`
  padding: 15px;
  align-items: center;
  background: ${(({theme}) => theme.bg3)};
`;

const ListItem = styled.View`
  padding: 15px;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  background: ${(({theme}) => theme.bg3)};
  margin-bottom: 15px;
`;

export {
  HeadContainer, GraphItem, Row, Scroll, Menu, MenuItem, ProfileHead, Btn, ListItem
}
