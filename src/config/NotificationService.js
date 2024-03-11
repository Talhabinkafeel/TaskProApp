import OneSignal from 'react-native-onesignal';
import constants from "./constants";

OneSignal.setAppId(constants.ONESIGNAL_APP);

export const setNotificationUserId = id => OneSignal.setExternalUserId(id);

export const onNotificationOpened = cb => {
  OneSignal.setNotificationOpenedHandler(data => {
    cb(data.notification)
  });
};
