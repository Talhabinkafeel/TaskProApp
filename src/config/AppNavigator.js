import React from "react";
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Login, Dashboard, SignUp, Chat, Profile, ProjectBoard, ProjectCalendar, ProjectSettings, Messages, TaskDetail} from '../screens';
import useColorScheme from "react-native/Libraries/Utilities/useColorScheme";
import {Icon} from "../components";
import {navigationRef} from './Navigator';
import Invitations from "../screens/Dashboard/Invitations";
import {getTheme, IS_IOS, theme} from "./theme";
import GroupProfile from "../screens/GroupProfile";
import Notifications from "../screens/Dashboard/Notifications";
import Search from "../screens/Dashboard/Search";
import {isIphoneX} from "react-native-iphone-x-helper";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function Project() {
  const theme = getTheme();
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarHideOnKeyboard: true,
        headerShown: false,
        tabBarIcon: ({color, size}) => {
          let iconName;
          if (route.name === 'Board') iconName = 'layout';
          if (route.name === 'Calendar') iconName = 'calendar';
          if (route.name === 'Settings') iconName = 'setting';
          return <Icon name={iconName} size={size} color={color}/>;
        },
        tabBarActiveTintColor: theme.primary,
        tabBarStyle: {
          backgroundColor: theme.mode === 'dark' ? theme.bg2 : '#fff', borderTopWidth: 0, paddingTop: 3,
          ...(!IS_IOS ? {height: 80, paddingBottom: 15} : {height: isIphoneX() ?  90 : 60, paddingBottom: isIphoneX() ? 27 : 5})
        },
        tabBarLabelStyle: {fontSize: 13, top: IS_IOS ? 0 : -5}
      })}
    >
      <Tab.Screen name="Board" component={ProjectBoard}/>
      <Tab.Screen name="Calendar" component={ProjectCalendar}/>
      <Tab.Screen name="Settings" component={ProjectSettings}/>
    </Tab.Navigator>
  );
}

function Home() {
  const theme = getTheme();
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarHideOnKeyboard: true,
        headerShown: false,
        tabBarIcon: ({color, size}) => {
          let iconName;
          if (route.name === 'Dashboard') iconName = 'home2';
          if (route.name === 'Messages') iconName = 'message';
          if (route.name === 'Profile') iconName = 'user';
          return <Icon name={iconName} size={size} color={color}/>;
        },
        tabBarActiveTintColor: theme.primary,
        tabBarStyle: {
          backgroundColor: theme.mode === 'dark' ? theme.bg2 : '#fff', borderTopWidth: 0, paddingTop: 3,
          ...(!IS_IOS ? {height: 80, paddingBottom: 15} : {height: isIphoneX() ?  90 : 60, paddingBottom: isIphoneX() ? 27 : 5})
        },
        tabBarLabelStyle: {fontSize: 13, top: IS_IOS ? 0 : -5}
      })}
    >
      <Tab.Screen name="Dashboard" component={Dashboard}/>
      <Tab.Screen name="Messages" component={Messages}/>
      <Tab.Screen name="Profile" component={Profile}/>
    </Tab.Navigator>
  );
}

const AppNavigator = () => {
  const scheme = useColorScheme();
  const navTheme = React.useMemo(() => ({
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: scheme === 'dark' ? theme.dark.bg : theme.light.bg
    },
  }), [scheme]);

  return (
    <NavigationContainer theme={navTheme} ref={navigationRef}>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Login" component={Login}/>
        <Stack.Screen name="SignUp" component={SignUp}/>
        <Stack.Screen name="Home" component={Home}/>
        <Stack.Screen name="Project" component={Project}/>
        <Stack.Screen name="TaskDetail" component={TaskDetail}/>
        <Stack.Screen name="Chat" component={Chat}/>
        <Stack.Screen name="GroupProfile" component={GroupProfile}/>
        <Stack.Screen name="Invitations" component={Invitations}/>
        <Stack.Screen name="Notifications" component={Notifications}/>
        <Stack.Screen name="Search" component={Search}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
};

export default AppNavigator;
