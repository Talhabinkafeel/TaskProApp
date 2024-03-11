import constants from "../config/constants";
import {Linking} from 'react-native';
import {moment} from "./moment";

export function getAvatarPath(path, isGroup, q) {
  if (path) return {uri: (!path.includes('file') ? constants.AWS_URL : '') + path + (q ? '?v=' + new Date() : '')};
  else return isGroup ? require('../images/group.png') : require('../images/user.png');
}

export function sortConversations(a, b) {
  return new Date(b.message?.createdAt || b.createdAt) - new Date(a.message?.createdAt || a.createdAt)
}

export function fixImgPath(path) {
  if (!path) return '';
  if (path?.includes('http') || path?.includes('file')) return path;
  else return constants.AWS_URL + path;
}

export const mapMessageData = messages => {
  return messages.map(msg => ({
    ...msg,
    ...(msg.image ? {image: fixImgPath(msg.image)} : {}),
    user: {...msg.user, ...(msg.user.avatar ? {avatar: fixImgPath(msg.user.avatar)} : {})}
  }));
};

export const getTemptId = function () {
  return '_' + Math.random().toString(36).substr(2, 9);
};

export const getFileObj = (file) => {
  return {
    name: file.fileName,
    type: file.type,
    uri: file.uri,
  }
};

export function getExt(type) {
  const re = /(?:\/([^/]+))?$/;
  return re.exec(type)[1];
}

export function humanFileSize(size) {
  const i = Math.floor(Math.log(size) / Math.log(1024));
  return (size / Math.pow(1024, i)).toFixed(2) * 1 + ' ' + ['B', 'KB', 'MB', 'GB', 'TB'][i];
}

export function openFile(src, type) {
  if (type === 'image/png' || type === 'image/jpeg') return null;
  else
    Linking.canOpenURL(fixImgPath(src)).then(supported => {
      if (supported) Linking.openURL(fixImgPath(src));
    });
}

export function isImg(file) {
  return file.type === 'image/png' || file.type === 'image/jpeg';
}

export function mapFileData(file) {
  return {
    _id: getTemptId(),
    src: file.uri,
    name: file.name,
    size: file.size,
    type: file.type
  }
}

export function validateEmail(email) {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
}

export function capitalizeFirstLetter(string) {
  if (!string) return '';
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function getBoardList() {
  return [{value: 1, label: 'Todo'},{value: 2, label: 'In Progress'},{value: 3, label: 'In Review'},{value: 4, label: 'Done'}];
}

export function isDatesSame(date1, date2) {
  const dateOne = moment(date1).format('YYYY-MM-DD');
  return moment(moment(date2).format('YYYY-MM-DD')).isSame(dateOne)
}
