import React from 'react';
import {View, Text, ScrollView} from 'react-native';
import Screen from '../components/Screen';

export default UserListScreen = ({navigation}) => (
    <ScrollView>
        <Screen navigation={navigation} name="UserList" />
    </ScrollView>
)