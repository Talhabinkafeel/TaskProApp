import styled from "styled-components";
import {Text} from "../../components";

const Wrapper = styled.View`
  background-color: ${({theme}) => theme.mode === 'dark' ? theme.bg2 : theme.bg3};
  flex: 1;
`;

const Head = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const LabelContainer = styled.View`
  flex-direction: row;
  align-items: center;
  marginVertical: 10px;
  margin-top: 25px;
  width: 100%;
`;

const Label = styled(Text)`
  margin-left: 5px;
  font-size: 17px;
`;

const SaveBtn = styled.TouchableOpacity`
  background: ${({theme, close}) => close ? theme.border : theme.secondary};
  width: 28px;
  height: 28px;
  justify-content: center;
  align-items: center;
  border-radius: 15px;
  margin-left: 8px;
`;

const EditBtns = styled.View`
  position: absolute;
  right: 10px;
  bottom: 5px;
  flex-direction: row;
`;

const BtnContainer = styled.View`
  align-items: flex-end;
  margin-top: 15px;
`;

const AttachmentImage = styled.Image`
  width: 100px;
  height: 60px;
  image-resize: cover;
  margin-right: 15px;
  border-radius: 10px;
`;

const FileView = styled.TouchableOpacity`
  width: 100px;
  height: 60px;
  margin-right: 15px;
  border-radius: 10px;
  background-color: ${({theme}) => theme.bg};
  border-color: ${({theme}) => theme.border};
  border-width: 1px;
  justify-content: center;
  align-items: center;
`;

const CommentItem = styled.View`
  margin-top: 20px;
`;

const CommentBubble = styled.View`
  padding: 10px;
  background-color: ${({theme}) => theme.bg3};
  border-color: ${({theme}) => theme.border};
  border-width: 1px;
  border-radius: 5px;
`;

export {Wrapper, Head, Label, LabelContainer, SaveBtn, EditBtns, BtnContainer, AttachmentImage, CommentItem, FileView, CommentBubble};
