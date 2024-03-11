import React from 'react';
import Raw from 'react-native-date-picker';
import {moment} from "../utils/moment";

const DatePicker = ({open, value, onChange, close}) => {
  return (
    <Raw
      modal
      open={open}
      date={new Date(value) == 'Invalid Date' ? new Date() : new Date(value)}
      onConfirm={(date) => {
        onChange(date);
        close();
      }}
      onCancel={close}
    />
  )
};

export default DatePicker;
