import React from 'react';
import {Image} from 'react-native';
import {fixImgPath} from "../utils/helpers";

const ProjectLogo = ({src, size}) => {
  const style = React.useMemo(() => ({width: size || 30, height: size || 30, borderRadius: 30}), [size]);

  return <Image source={src ? {uri: fixImgPath(src)} : require('../images/logo.png')} alt="" style={style} />
};

export default ProjectLogo;
