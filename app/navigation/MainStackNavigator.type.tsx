import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RouteProp} from '@react-navigation/native';
import {UserModel} from '../interfaces/UserModel';

export type MainStackParamList = {
  UserList: {
    newUser?: UserModel;
  };
  UserDetail: {
    user: UserModel;
    isNewUser: boolean;
  };
};

//UserListScreen
export type UserListScreenNavigationProp = NativeStackNavigationProp<
  MainStackParamList,
  'UserList'
>;
export type UserListScreenRouteProp = RouteProp<MainStackParamList, 'UserList'>;

//UserDetailScreen
export type UserDetailScreenNavigationProp = NativeStackNavigationProp<
  MainStackParamList,
  'UserDetail'
>;
export type UserDetailScreenRouteProp = RouteProp<
  MainStackParamList,
  'UserDetail'
>;
