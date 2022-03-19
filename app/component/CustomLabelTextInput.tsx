import React, {FC} from 'react';
import {
  StyleProp,
  ViewStyle,
  TextInputProps,
  Text,
  View,
  TextInput,
  StyleSheet,
} from 'react-native';
import {AppColor} from '../common/Colors';

interface Props extends TextInputProps {
  baseStyle?: StyleProp<ViewStyle>;
  label: string;
  labelStyle?: StyleProp<ViewStyle>;
  textInputStyle?: StyleProp<ViewStyle>;
  horizontalViewStyle?: StyleProp<ViewStyle>;
}

const CustomLabelTextInput: FC<Props> = ({
  baseStyle,
  label,
  labelStyle,
  textInputStyle,
  ...atr
}) => {
  return (
    <View style={[styles.base, baseStyle]}>
      <Text style={[styles.label, labelStyle]}>{label}</Text>
      <TextInput
        autoCapitalize={'none'}
        style={[styles.textInput, textInputStyle]}
        placeholderTextColor={AppColor.light_grey}
        {...atr}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  base: {
    marginBottom: 8,
    backgroundColor: AppColor.white,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    paddingVertical: 8,
    color: AppColor.black,
  },
  textInput: {
    minHeight: 50,
    fontSize: 16,
    paddingVertical: 5,
    borderBottomWidth: 1.5,
    borderBottomColor: AppColor.separator_grey,
    color: AppColor.black,
  },
});

export default CustomLabelTextInput;
