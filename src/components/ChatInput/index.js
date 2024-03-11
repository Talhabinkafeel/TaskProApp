import React from 'react';
import {IconContainer, Input, InputContainer} from "./styles";
import {TouchableOpacity} from "react-native";
import {Icon} from "../index";
import {getTheme} from "../../config/theme";
import {getImageFromLibrary} from "../../utils/imagePicker";
import {withMenuContext} from 'react-native-popup-menu';
import {axios} from "../../config";
import {getFileObj} from "../../utils/helpers";

const ChatInput = ({value, onChange, onSend, appendMessage}) => {
  const theme = getTheme();

  const submit = React.useCallback(async () => {
    if (value) {
      sendMessage({text: value});
      onChange('');
    }
  }, [value]);

  const sendMessage = React.useCallback((data) => {
    appendMessage(data);
    onSend(data);
  }, []);

  const uploadFile = React.useCallback(async (file) => {
    const form = new FormData();
    form.append('file', getFileObj(file));
    const res = await axios.post(`/chat/file`, form, {headers: {"Content-Type": "multipart/form-data"}});
    return res.data.path;
  }, []);

  const sendImage = React.useCallback(async () => {
    const source = await getImageFromLibrary({mediaType: 'mixed', quality: 0.5});
    if (source.uri) {
      let data = {image: source.uri};
      appendMessage(data);
      data.image = await uploadFile(source);
      onSend(data);
    }
  }, []);

  return (
    <InputContainer>
      <Input
        value={value}
        onChangeText={onChange}
        placeholder={"Message"}
      />
      <TouchableOpacity style={{marginRight: 13}} onPress={sendImage}>
        <Icon size={21} name="attachment" color={theme.gray} />
      </TouchableOpacity>
      <IconContainer onPress={submit}>
        <Icon size={21} name="send" color={theme.primary} />
      </IconContainer>
    </InputContainer>
  )
};

export default withMenuContext(ChatInput);
