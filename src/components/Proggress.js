import React from 'react';
import * as ProgressItem from 'react-native-progress';
import {getTheme, WINDOW_WIDTH} from "../config/theme";

const Progress = ({progress, circle, size, color, width}) => {
  const theme = getTheme();
  if (circle)
    return <ProgressItem.Circle
      progress={progress}
      size={size || 55}
      color={color || theme.primary}
      unfilledColor={theme.border}
      borderWidth={0}
      showsText
      textStyle={{fontSize: 16}}
      animated={false}
    />;

  return <ProgressItem.Bar
    progress={progress}
    width={width || WINDOW_WIDTH - 85}
    height={10}
    color={color || theme.primary}
    unfilledColor={theme.mode === 'dark' ? theme.bg : theme.border}
    borderWidth={0}
  />;
};

export default Progress;
