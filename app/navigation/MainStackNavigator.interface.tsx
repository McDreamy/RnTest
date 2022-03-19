import {
  UserDetailScreenNavigationProp,
  UserDetailScreenRouteProp,
  UserListScreenNavigationProp,
  UserListScreenRouteProp,
} from './MainStackNavigator.type';

export interface UserListScreenProps {
  navigation: UserListScreenNavigationProp;
  route: UserListScreenRouteProp;
}

export interface UserDetailScreenProps {
  navigation: UserDetailScreenNavigationProp;
  route: UserDetailScreenRouteProp;
}
