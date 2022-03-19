import React, {useEffect, useState, useLayoutEffect} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {UserModel} from '../../interfaces/UserModel';
import {getUserListApi} from '../../apiKit/ApiController';
import {showErrorMessage} from '../../helper/GeneralHelper';
import {DEFAULT_ERROR_MESSAGE} from '../../common/Constants';
import {
  UserListScreenNavigationProp,
  UserListScreenRouteProp,
} from '../../navigation/MainStackNavigator.type';
import {TouchableOpacity, Image} from 'react-native';
import {WhiteAddButtonIcon} from '../../assets';

const useUserList = () => {
  const navigation = useNavigation<UserListScreenNavigationProp>();
  const route = useRoute<UserListScreenRouteProp>();
  const [userList, setUserList] = useState<Array<UserModel>>([]);
  const [isShowLoadingIndicator, setIsShowLoadingIndicator] =
    useState<boolean>(false);

  const onAddNewUser = (user: UserModel) => {
    let list = JSON.parse(JSON.stringify(userList));
    list.push(user);
    setUserList(list);
  };

  const itemOnPressed = (item: UserModel) => {
    navigation.navigate('UserDetail', {user: item, isNewUser: false});
  };

  const callGetUserListApi = () => {
    setIsShowLoadingIndicator(true);
    getUserListApi()
      .then(res => {
        const resList: Array<UserModel> = res.data;
        setUserList(resList);
      })
      .catch(err => {
        showErrorMessage(err?.message ?? DEFAULT_ERROR_MESSAGE);
      })
      .finally(() => {
        setIsShowLoadingIndicator(false);
      });
  };

  useEffect(() => {
    if (route?.params?.newUser) {
      onAddNewUser(route?.params?.newUser);
    }
  }, [route?.params?.newUser]);

  useEffect(() => {
    callGetUserListApi();
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('UserDetail', {
              isNewUser: true,
              user: {
                id: userList.length + 1,
                username: '',
                name: '',
                email: '',
                website: '',
                phone: '',
                address: {
                  street: '',
                  suite: '',
                  zipcode: '',
                  city: '',
                  geo: {lat: '', lng: ''},
                },
                company: {
                  name: '',
                },
              },
            });
          }}>
          <Image source={WhiteAddButtonIcon} />
        </TouchableOpacity>
      ),
    });
  }, [navigation, userList]);

  return {
    userList,
    isShowLoadingIndicator,
    callGetUserListApi,
    itemOnPressed,
  };
};

export default useUserList;
