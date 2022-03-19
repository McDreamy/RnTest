import React, {FC} from 'react';
import {
  Text,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
  TextStyle,
  StyleSheet,
} from 'react-native';
import {AppColor} from '../common/Colors';

interface Props {
  label: string;
  buttonStyle?: StyleProp<ViewStyle>;
  buttonTextStyle?: StyleProp<TextStyle>;
  onPress: () => void;
  disabled?: boolean;
}

const CustomButton: FC<Props> = ({
  label,
  buttonStyle,
  buttonTextStyle,
  onPress,
  disabled = false,
}) => {
  return (
    <TouchableOpacity
      style={[styles.button, buttonStyle]}
      onPress={onPress}
      disabled={disabled}>
      <Text style={[styles.buttonText, buttonTextStyle]}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    backgroundColor: AppColor.dark_blue,
    paddingVertical: 18,
    flexDirection: 'row',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: AppColor.white,
  },
});

export default CustomButton;
