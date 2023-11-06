import * as React from 'react';
import {StyleSheet, Pressable, Text} from 'react-native';
import GlobalStyles from '../../../styles/GlobalStyles';

interface BtnBigProps {
  onPress: () => void;
  text: string;
  disabled?: boolean;
}

export const BtnBig = ({onPress, text, disabled}: BtnBigProps) => {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.btnContainer, disabled ? styles.disabled : null]}
      disabled={disabled}>
      <Text style={styles.btn}>{text}</Text>
    </Pressable>
  );
};
const styles = StyleSheet.create({
  btnContainer: {
    width: '90%',
    height: 48,
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: GlobalStyles.green.color,
    borderRadius: 20,
    position: 'absolute',
    bottom: '5%',
  },
  btn: {
    fontFamily: GlobalStyles.btn.fontFamily,
    fontSize: GlobalStyles.btn.fontSize,
    color: GlobalStyles.white_1.color,
    textAlign: 'center',
  },
  disabled: {
    opacity: 0.6,
  },
});

export default BtnBig;
