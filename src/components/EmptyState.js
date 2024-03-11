import React from 'react';
import {View, Image} from 'react-native';
import styled from "styled-components/native";

const EmptyState = ({style, size}) => {
  return (
    <Container style={{...style}}>
      <Image source={require('../images/empty.png')} style={{width: size || 100, height: size || 100}}/>
    </Container>
  )
};

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  opacity: ${({theme}) => theme.mode === 'dark' ? 0.6 : 1}; 
`;

export default EmptyState;
