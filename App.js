import React from 'react';

import {createAppContainer} from 'react-navigation';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {Dimensions} from 'react-native';

import {Feather} from '@expo/vector-icons';

import {
  SignUserScreen, 
  UserListScreen
} from './screens';

import Sidebar from './components/SideBar';

const DrawerNavigator = createDrawerNavigator({
  SignUserScreen: {
    screen: SignUserScreen
  },
  UserListScreen: {
    screen: UserListScreen
  }
},{
  contentComponent: props => <Sidebar {...props} />,

  // drawerWidth: Dimensions.get('window').width * 0.85,
  hideStatusBar: true
})

export default createAppContainer(DrawerNavigator);