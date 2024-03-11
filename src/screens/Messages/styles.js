import styled from "styled-components/native";
import {IS_IOS, WINDOW_WIDTH} from "../../config/theme";
import {Text} from "../../components";

const FloatButton = styled.TouchableOpacity.attrs({activeOpacity: 0.8})`
  width: 60px;
  height: 60px;
  border-radius: 30px;
  position: absolute;
  right: 25px;
  bottom: 25px;
  background-color: ${({theme}) => theme.primary};
  opacity: ${({disabled}) => disabled ? 0.7 : 1};
  justify-content: center;
  align-items: center;
`;

const Item = styled.TouchableOpacity.attrs({activeOpacity: 0.7})`
  flex-direction: row;
  height: 80px;
  border-bottom-width: 1px;
  border-bottom-color: ${({theme}) => theme.border};
  padding-horizontal: 20px;
  align-items: center;
  justify-content: space-between;
`;

const UserName = styled(Text)`
  font-size: 17px;
  margin-bottom: 3px;
  color: ${({theme, unseen}) => !unseen ? theme.title : theme.primary};
  font-weight: ${({unseen}) => !unseen ? 400 : 600};
`;

const MessageText = styled.Text.attrs({numberOfLines: 1})`
  font-size: 14px;
  color: ${({theme}) => theme.gray};
  font-weight: ${({unseen}) => !unseen ? 400 : 600};
  width: ${({withIcon}) => !withIcon ? WINDOW_WIDTH - 160 + 'px' : 'null'};
  margin-left: ${({withIcon}) => withIcon ? 4 : 0}px;
  ${({withIcon}) => !withIcon ? `
    position: absolute;
    top: 27px;
  ` : ''
}
`;

const Time = styled.Text`
  color: ${({theme}) => theme.gray};
  font-size: 13px;
`;

const UnseenCount = styled.View`
  width: 25px;
  height: 25px;
  border-radius: 25px;
  background-color: ${({theme}) => theme.primary};
  justify-content: center;
  align-items: center;
`;

export const ItemRight = styled.View`
  margin-top: 10px;
  align-self: flex-end;
`;

export const Empty = styled.View`
  margin-top: -60px;
  margin-bottom: 25px;
`;

const ModalContent = styled.View`
  background-color: ${({theme}) => theme.bg};
  flex: 1;
`;

const CreateHeader = styled.View`
  height: 50px;
  flex-direction: row;
  align-items: center;
  padding-horizontal: 15px;
`;

const Head = styled.View`
  background-color: ${({theme}) => theme.mode === 'dark' ? theme.bg2 : '#fff'};
  paddingTop: 10px;
`;

const Row = styled.View`
  flex-direction: row;
  padding-horizontal: 25px;
  padding-top: ${IS_IOS ? 7 : 9}px;
  margin-bottom: ${IS_IOS ? 20 : 0}px;
`;

const Msg = styled.View`
  flex-direction: row;
  align-items: center;
  opacity: 0.6;
`;

const LeftText = styled.Text`
  color: ${({theme}) => theme.gray};
  font-size: 16px;
`;

const Input = styled.TextInput.attrs(({theme}) => ({placeholderTextColor: theme.gray, color: theme.txt}))`
  margin-left: ${IS_IOS ? 15 : 7}px;
  width: 90%;
  font-size: 16px;
  top: ${!IS_IOS ? -13 : 0}px;
`;

const UserItem = styled.TouchableOpacity.attrs({activeOpacity: 0.8})`
  padding-horizontal: 15px;
  flex-direction: row;
  height: 70px;
  alignItems: center;
  border-bottom-width: 1px;
  border-bottom-color: ${({theme}) => theme.border};
`;

export const Checked = styled.View`
  width: 20px;
  height: 20px;
  background-color: ${({theme}) => theme.primary};
  border-radius: 20px;
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: -2px;
  right: -5px;
  padding-top: 2px;
`;

export const GroupInfo = styled.View`
  flex-direction: row;
  margin-top: 25px;
  margin-horizontal: 15px;
  align-items: center;
`;

export const NameInput = styled.TextInput.attrs(({theme}) => ({
  placeholder: 'Group Name',
  placeholderTextColor: theme.gray
}))`
  border-bottom-width: 1px;
  border-bottom-color: ${({theme}) => theme.border};
  color: ${({theme}) => theme.txt};
  height: 45px;
  width: 60%;
`;

export const ImagePicker = styled.TouchableOpacity`
  width: 80px;
  height: 80px;
  border-radius: 50px;
  margin-right: 15px;
  background-color: ${({theme}) => theme.mode === 'dark' ? theme.bg2 : '#ddd'};
  justify-content: center;
  align-items: center;
`;

export const GroupImage = styled.Image`
  width: 80px;
  height: 80px;
  border-radius: 50px;
`;


export {
  FloatButton,
  Item,
  UserName,
  MessageText,
  Time,
  CreateHeader,
  LeftText,
  Input,
  Row,
  UserItem,
  ModalContent,
  Msg,
  UnseenCount,
  Head
};
