import React, {FC} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {MainStackParamList} from './MainStackNavigator.type';
import UserListScreen from '../screens/UserListScreen/UserListScreen';
import UserDetailScreen from '../screens/UserDetailScreen/UserDetailScreen';
import {AppColor} from '../common/Colors';

const MainStackNavigator: FC = () => {
  const MainStack = createNativeStackNavigator<MainStackParamList>();

  return (
    <MainStack.Navigator
      screenOptions={{
        animation: 'slide_from_right',
        headerStyle: {
          backgroundColor: AppColor.dark_blue,
        },
        headerTintColor: AppColor.white,
      }}>
      <MainStack.Screen
        name={'UserList'}
        component={UserListScreen}
        options={{title: 'User List'}}
      />
      <MainStack.Screen
        name={'UserDetail'}
        component={UserDetailScreen}
        options={{title: 'User Profile'}}
      />
    </MainStack.Navigator>
  );
};

export default MainStackNavigator;
