import React, {FC} from 'react';
import {Modal, View, ActivityIndicator, StyleSheet} from 'react-native';
import {AppColor} from '../common/Colors';

interface Props {
  isShowLoadingIndicator: boolean;
}

const LoadingIndicator: FC<Props> = ({isShowLoadingIndicator}) => {
  return (
    <Modal animationType="fade" transparent visible={isShowLoadingIndicator}>
      <View style={styles.loading}>
        <ActivityIndicator size="large" color={AppColor.white} />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: AppColor.black_opacity,
  },
});

export default LoadingIndicator;
