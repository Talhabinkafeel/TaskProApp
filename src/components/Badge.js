import React from 'react';
import styled from "styled-components/native";

const Badge = ({status}) => {
  return <Item status={status} color={badgeColors[status]?.color}/>;
};

const Item = styled.View`
  background-color: ${({color, theme}) => color ? color.background : theme.mode === 'dark' ? '#42444d' : '#fafafa'};
  border-color: ${({color, theme}) => color ? color.borderColor : theme.mode === 'dark' ? theme.bg2 : '#d9d9d9'};
  width: 5px;
  height: 5px;
  border-width: 1px;
  border-radius: 5px;
  margin-right: 10px;
`;

export const badgeColors = {
  success: {
    color: '#52c41a',
    background: '#f6ffed',
    borderColor: '#b7eb8f'
  },
  processing: {
    color: '#1890ff',
    background: '#e6f7ff',
    borderColor: '#91d5ff'
  },
  error: {
    color: '#ff4d4f',
    background: '#fff2f0',
    borderColor: '#ffccc7'
  },
  warning: {
    color: '#faad14',
    background: '#fffbe6',
    borderColor: '#ffe58f'
  }
};

export default Badge;
