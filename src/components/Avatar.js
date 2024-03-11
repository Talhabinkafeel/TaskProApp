import React from 'react';
import styled from "styled-components/native";
import {Text} from "./index";
import {fixImgPath} from "../utils/helpers";
import FastImage from "react-native-fast-image";

const Wrapper = styled.View`
  border-radius: 50px;
  border-width: 2px;
  border-color: ${({theme}) => theme.border};
  background-color: ${({theme}) => theme.bg};
  justify-content: center;
  align-items: center;
`;

const Image = styled(FastImage)`
  width: 100%;
  height: 100%;
  border-radius: 50px;
`;

const Avatar = ({src, size, firstName, font, style}) => {
  const styles = React.useMemo(() => ({...(style||{}), width: size || 37, height: size || 37}), [size, style]);
  return (
    <Wrapper style={styles}>
      {src ? <Image source={{uri: src?.uri ? src.uri : fixImgPath(src), cache: FastImage.cacheControl.web}}/> :
        <Text size={font}>{firstName ? firstName[0].toUpperCase() : ''}</Text>}
    </Wrapper>
  )
};

export default Avatar;
