import React, {useEffect, useState, useLayoutEffect, useRef} from 'react';
import {
  TouchableOpacity,
  Image,
  Platform,
  PermissionsAndroid,
  AppState,
} from 'react-native';
import {
  useNavigation,
  useRoute,
  useFocusEffect,
} from '@react-navigation/native';
import {UserModel} from '../../interfaces/UserModel';
import Geolocation from 'react-native-geolocation-service';
import {
  UserDetailScreenNavigationProp,
  UserDetailScreenRouteProp,
} from '../../navigation/MainStackNavigator.type';
import {WhiteBackButtonIcon} from '../../assets';
import {UserFormProps} from '../../interfaces/UserFormProps';
import {GeoModel} from '../../interfaces/GeoModel';
import {openDeviceSetting} from '../../helper/GeneralHelper';

const useUserDetail = () => {
  const navigation = useNavigation<UserDetailScreenNavigationProp>();
  const route = useRoute<UserDetailScreenRouteProp>();
  const {user, isNewUser} = route.params;
  const [userModel, setUserModel] = useState<UserModel>(user);
  const [isGrantedLocation, setIsGrantedLocation] = useState<boolean>(false);
  const [isShowingOpenDeviceSetting, setIsShowingOpenDeviceSetting] =
    useState<boolean>(false);
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);

  const addButtonOnPress = (values: UserFormProps) => {
    let newUserModel: UserModel = JSON.parse(JSON.stringify(userModel));
    newUserModel.name = values.name;
    newUserModel.username = values.username;
    newUserModel.email = values.email;
    newUserModel.address.street = values.street;
    newUserModel.address.suite = values.suite;
    newUserModel.address.city = values.city;
    newUserModel.address.zipcode = values.zipcode;
    newUserModel.phone = values.phone;
    newUserModel.company.name = values.companyName;
    setUserModel(newUserModel);
    navigation.navigate('UserList', {newUser: newUserModel});
  };

  async function requestPermission() {
    let isGranted: boolean = false;

    if (Platform.OS === 'ios') {
      const result = await Geolocation.requestAuthorization('whenInUse');
      isGranted = result === 'granted';
    } else if (Platform.OS === 'android') {
      const result = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
      ]);

      isGranted =
        result['android.permission.ACCESS_FINE_LOCATION'] === 'granted' &&
        result['android.permission.ACCESS_COARSE_LOCATION'] === 'granted';
    }

    setIsGrantedLocation(isGranted);
    if (!isGranted) {
      setIsShowingOpenDeviceSetting(true);
      openDeviceSetting(() => setIsShowingOpenDeviceSetting(false));
    } else {
      setIsShowingOpenDeviceSetting(false);
    }
  }

  useEffect(() => {
    async function getLocationCoordinate() {
      let geo: GeoModel = {
        lat: '',
        lng: '',
      };
      Geolocation.getCurrentPosition(
        (position: Geolocation.GeoPosition) => {
          geo.lat = position.coords.latitude.toString();
          geo.lng = position.coords.longitude.toString();
          let newUserModel: UserModel = JSON.parse(JSON.stringify(userModel));
          newUserModel.address.geo = geo;
          setUserModel(newUserModel);
        },
        error => {
          // See error code charts below.
          console.log(error.code, error.message);
        },
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
      );
    }

    if (isNewUser) {
      if (!isGrantedLocation) {
        requestPermission();
      } else {
        getLocationCoordinate();
      }
    }
  }, [isNewUser, isGrantedLocation]);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        if (isNewUser && !isShowingOpenDeviceSetting) {
          console.log('App has come to the foreground!');
          requestPermission();
        }
      }

      appState.current = nextAppState;
      setAppStateVisible(appState.current);
    });

    return () => {
      subscription.remove();
    };
  }, [isNewUser, isShowingOpenDeviceSetting]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <Image source={WhiteBackButtonIcon} />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  return {
    addButtonOnPress,
    userModel,
    isNewUser,
  };
};

export default useUserDetail;
