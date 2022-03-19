import {Alert, Linking} from 'react-native';

export const showErrorMessage = (
  message: string,
  completeHandler?: () => void,
) => {
  Alert.alert(
    'Error',
    message,
    [
      {
        text: 'Ok',
        onPress: () => {
          if (completeHandler) {
            completeHandler();
          }
        },
      },
    ],
    {cancelable: false},
  );
};

export const openDeviceSetting = (completeHandler?: () => void) => {
  showErrorMessage(
    'For better experience, please allow location permission.',
    () => {
      if (completeHandler) {
        completeHandler();
      }
      Linking.openSettings();
    },
  );
};
