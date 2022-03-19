import React, {FC, useRef} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Image,
  ScrollView,
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import * as yup from 'yup';
import {Formik, FormikProps} from 'formik';
import {AppColor} from '../../common/Colors';
import CustomLabelTextInput from '../../component/CustomLabelTextInput';
import {UserDetailScreenProps} from '../../navigation/MainStackNavigator.interface';
import useUserDetail from './useUserDetail';
import CustomButton from '../../component/CustomButton';
import {UserFormProps} from '../../interfaces/UserFormProps';

const UserDetailScreen: FC<UserDetailScreenProps> = () => {
  const {userModel, isNewUser, addButtonOnPress} = useUserDetail();
  const ref = useRef<FormikProps<UserFormProps>>(null);
  const validationSchema = yup.object().shape({
    name: yup.string().required('Full name is required.'),
    username: yup.string().required('Username is required'),
    email: yup.string().email().required('Email is required'),
    street: yup.string().required('Street is required'),
    city: yup.string().required('City is required'),
    zipcode: yup
      .number()
      .typeError('Invalid value')
      .required('Zipcode is required'),
    phone: yup.string().required('Phone is required.'),
  });
  return (
    <SafeAreaView style={styles.base}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.base}>
        <ScrollView>
          <Formik
            innerRef={ref}
            initialValues={{
              name: userModel.name,
              username: userModel.username,
              email: userModel.email,
              street: userModel.address.street,
              suite: userModel.address?.suite ?? '',
              city: userModel.address.city,
              zipcode: userModel.address.zipcode,
              phone: userModel.phone,
              website: userModel?.website ?? '',
              companyName: userModel?.company?.name ?? '',
            }}
            validationSchema={validationSchema}
            onSubmit={addButtonOnPress}>
            {({handleChange, values, errors}) => (
              <View style={styles.content}>
                {!isNewUser && (
                  <Image
                    style={styles.image}
                    source={{
                      uri: 'https://i.pravatar.cc/300',
                    }}
                  />
                )}

                <CustomLabelTextInput
                  label={'ID'}
                  value={userModel.id.toString()}
                  editable={false}
                />

                <CustomLabelTextInput
                  label={'Full Name'}
                  value={values.name}
                  onChangeText={handleChange('name')}
                  editable={isNewUser}
                />
                {errors.name && <Text style={styles.error}>{errors.name}</Text>}

                <CustomLabelTextInput
                  label={'Username'}
                  value={values.username}
                  onChangeText={handleChange('username')}
                  editable={isNewUser}
                />
                {errors.username && (
                  <Text style={styles.error}>{errors.username}</Text>
                )}

                <CustomLabelTextInput
                  label={'Email'}
                  value={values.email}
                  onChangeText={handleChange('email')}
                  editable={isNewUser}
                  keyboardType={'email-address'}
                />
                {errors.email && (
                  <Text style={styles.error}>{errors.email}</Text>
                )}

                <CustomLabelTextInput
                  label={'Street'}
                  value={values.street}
                  onChangeText={handleChange('street')}
                  editable={isNewUser}
                />
                {errors.street && (
                  <Text style={styles.error}>{errors.street}</Text>
                )}

                <CustomLabelTextInput
                  label={'Suite'}
                  value={values.suite}
                  onChangeText={handleChange('suite')}
                  editable={isNewUser}
                />

                <CustomLabelTextInput
                  label={'City'}
                  value={values.city}
                  onChangeText={handleChange('city')}
                  editable={isNewUser}
                />
                {errors.city && <Text style={styles.error}>{errors.city}</Text>}

                <CustomLabelTextInput
                  label={'Zipcode'}
                  value={values.zipcode}
                  onChangeText={handleChange('zipcode')}
                  editable={isNewUser}
                  keyboardType={'number-pad'}
                />
                {errors.zipcode && (
                  <Text style={styles.error}>{errors.zipcode}</Text>
                )}

                <CustomLabelTextInput
                  label={'Latitude'}
                  value={userModel.address.geo.lat}
                  editable={false}
                />

                <CustomLabelTextInput
                  label={'Longitude'}
                  value={userModel.address.geo.lng}
                  editable={false}
                />

                <CustomLabelTextInput
                  label={'Phone'}
                  value={values.phone}
                  onChangeText={handleChange('phone')}
                  editable={isNewUser}
                  keyboardType={'phone-pad'}
                />
                {errors.phone && (
                  <Text style={styles.error}>{errors.phone}</Text>
                )}

                <CustomLabelTextInput
                  label={'Website'}
                  value={values.website}
                  onChangeText={handleChange('website')}
                  editable={isNewUser}
                />

                <CustomLabelTextInput
                  label={'Company Name'}
                  value={values.companyName}
                  onChangeText={handleChange('companyName')}
                  editable={isNewUser}
                />

                {userModel.company?.bs && (
                  <CustomLabelTextInput
                    label={'Company Bs'}
                    value={userModel.company.bs}
                    editable={isNewUser}
                  />
                )}

                {userModel.company?.catchPhrase && (
                  <CustomLabelTextInput
                    label={'Company Catch Phrase'}
                    value={userModel.company.catchPhrase}
                    editable={isNewUser}
                  />
                )}
              </View>
            )}
          </Formik>
        </ScrollView>
        {isNewUser && (
          <CustomButton
            label="Add User"
            buttonStyle={styles.button}
            onPress={() => ref.current?.handleSubmit()}
          />
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  base: {
    flex: 1,
    backgroundColor: AppColor.white,
  },
  content: {
    flex: 1,
    padding: 15,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginVertical: 15,
    alignSelf: 'center',
  },
  button: {marginHorizontal: 15},
  error: {
    fontSize: 14,
    color: AppColor.red,
    marginBottom: 15,
  },
});

export default UserDetailScreen;
