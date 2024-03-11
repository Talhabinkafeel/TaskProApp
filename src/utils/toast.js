import Toast from 'react-native-toast-message';

export default function toastAlert(type = 'success', text1, text2) {
  Toast.show({type, text1, text2});
}
