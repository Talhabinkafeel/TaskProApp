import React from 'react';
import BouncyCheckbox from "react-native-bouncy-checkbox";

const Checkbox = ({value, onChange}) => {
  return <BouncyCheckbox
    isChecked={value}
    onPress={() => onChange(!value)}
    fillColor={"#3498DB"}
    iconStyle={{borderColor: "#3498DB"}}
  />;
};

export default Checkbox;
