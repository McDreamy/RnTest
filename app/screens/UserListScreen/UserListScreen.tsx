import React, {FC} from 'react';
import {
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  View,
} from 'react-native';
import {AppColor} from '../../common/Colors';
import CustomLabelTextInput from '../../component/CustomLabelTextInput';
import LoadingIndicator from '../../component/LoadingIndicator';

import {UserListScreenProps} from '../../navigation/MainStackNavigator.interface';
import useUserList from './useUserList';

const UserListScreen: FC<UserListScreenProps> = () => {
  const {userList, isShowLoadingIndicator, callGetUserListApi, itemOnPressed} =
    useUserList();
  return (
    <SafeAreaView style={styles.base}>
      <FlatList
        style={styles.list}
        refreshing={isShowLoadingIndicator}
        onRefresh={callGetUserListApi}
        data={userList}
        renderItem={({item}) => (
          <TouchableOpacity
            style={styles.itemBaseContainer}
            onPress={() => {
              itemOnPressed(item);
            }}>
            <Text style={styles.label}>Username: {item.username}</Text>
            <Text style={styles.label}>Email: {item.email}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => index.toString()}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
      <LoadingIndicator isShowLoadingIndicator={isShowLoadingIndicator} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  base: {
    flex: 1,
    backgroundColor: AppColor.white,
  },
  list: {
    marginVertical: 15,
  },
  itemBaseContainer: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  labelContainer: {
    flex: 0.5,
  },
  valueContainer: {
    flex: 1,
  },
  label: {
    marginBottom: 8,
    fontWeight: '600',
    fontSize: 16,
  },
  separator: {
    height: 1,
    backgroundColor: AppColor.separator_grey,
  },
});

export default UserListScreen;
