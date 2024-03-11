import React from 'react';
import {TouchableOpacity} from "react-native";
import styled from "styled-components/native";
import {Icon, Text} from "./index";

const Tag = ({title, color, remove}) => {
  return (
    <Item color={tagColors[color]}>
      <Text color={tagColors[color]?.color}>{title}</Text>
      {remove &&
      <TouchableOpacity onPress={remove} style={{marginLeft: 5}}><Icon name="close" size={13} color={tagColors[color]?.color}/></TouchableOpacity>
      }
    </Item>
  )
};

export default Tag;

const Item = styled.View`
  background-color: ${({color, theme}) => color ? color.background : theme.mode === 'dark' ? '#42444d' : '#fafafa'};
  border-color: ${({color, theme}) => color ? color.borderColor : theme.mode === 'dark' ? theme.bg2 : '#d9d9d9'};
  flex-direction: row;
  align-items: center;
  border-width: 1px;
  padding-vertical: 5px;
  padding-horizontal: 8px;
  border-radius: 5px;
  margin: 3px;
`;

export const tagColors = {
  pink: {
    color: '#c41d7f',
    background: '#fff0f6',
    borderColor: '#ffadd2'
  },
  magenta: {
    color: '#c41d7f',
    background: '#fff0f6',
    borderColor: '#ffadd2'
  },
  red: {
    color: '#cf1322',
    background: '#fff1f0',
    borderColor: '#ffa39e'
  },
  volcano: {
    color: '#d4380d',
    background: '#fff2e8',
    borderColor: '#ffbb96'
  },
  orange: {
    color: '#d46b08',
    background: '#fff7e6',
    borderColor: '#ffd591'
  },
  yellow: {
    color: '#d4b106',
    background: '#feffe6',
    borderColor: '#fffb8f'
  },
  gold: {
    color: '#d48806',
    background: '#fffbe6',
    borderColor: '#ffe58f'
  },
  cyan: {
    color: '#08979c',
    background: '#e6fffb',
    borderColor: '#87e8de'
  },
  lime: {
    color: '#7cb305',
    background: '#fcffe6',
    borderColor: '#eaff8f'
  },
  green: {
    color: '#389e0d',
    background: '#f6ffed',
    borderColor: '#b7eb8f'
  },
  blue: {
    color: '#096dd9',
    background: '#e6f7ff',
    borderColor: '#91d5ff'
  },
  geekblue: {
    color: '#1d39c4',
    background: '#f0f5ff',
    borderColor: '#adc6ff'
  },
  purple: {
    color: '#531dab',
    background: '#f9f0ff',
    borderColor: '#d3adf7'
  }
}
