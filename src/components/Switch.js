import React from 'react';
import {Switch as SwitchComp} from 'react-native';
import {Row} from "../utils/sharedStyles";
import {Text} from "./index";

const Switch = ({value, onChange, label}) =>
  <Row>
    <SwitchComp
      trackColor={{ false: "#767577", true: "#81b0ff" }}
      // thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
      // ios_backgroundColor="#3e3e3e"
      onValueChange={onChange}
      value={value}
    />
    {label && <Text>{label}</Text>}
  </Row>;

export default Switch;
