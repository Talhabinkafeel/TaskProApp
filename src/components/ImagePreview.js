import React from 'react';
import ImageView from "react-native-image-viewing";

const ImagePreview = ({images, visible, index, onClose}) => {
  return (
    <ImageView
      imageIndex={index}
      images={images}
      visible={visible}
      onRequestClose={onClose}
    />
  )
};

export default ImagePreview;
