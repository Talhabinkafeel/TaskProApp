# TaskProApp Mobile Setup

## Getting Started

TaskProApp (mobile app project). For all features to work properly, third-party applications must be created and api keys must be added to the source code. The following applications need to be created sequentially and the keys must be saved.

AWS S3 bucket should be created, then “access_key”, “secret_key”, “region” and bucket name should be saved. It can be done easily by following the steps in this link. Files such as image, mp3, video in the application will be kept here.

Onesignal app should be created then “app id” and “key” (how to get key & app id ⇒ https://documentation.onesignal.com/docs/accounts-and-keys) should be registered. Push notification processes are managed with Onesignal.

That's all the keys needed. Now the constant variables in the projects should be updated. Thus, the necessary keys and domains will be dynamically used in the application.

### Variables will be updated in the following files:


TaskProApp/src/config/constants.js




Mobile Setup

```bash
  cd TaskProApp
  yarn install
  cd ios
  pod install
  cd ..
  yarn run ios #for ios
  yarn run android #for android
```

If you have any questions, you can send an email: talha@botsolutions.tech

