import * as React from 'react';
import {StyleSheet, Pressable, Text} from 'react-native';
import GlobalStyles, {height, width} from '../../../styles/GlobalStyles';

type BtnMidProps = {
  onPress: () => void;
  text: string;
  color: string;
  disabled: boolean;
};

export const BtnReg = ({onPress, text, color, disabled}: BtnMidProps) => {
  const btnStyle = {
    backgroundColor: color,
    opacity: disabled ? 0.5 : 1,
  };
  return (
    <Pressable
      onPress={onPress}
      style={({pressed}) => [
        styles.btnContainer,
        btnStyle,
        pressed && styles.pressedBtnContainer,
      ]}
      disabled={disabled}>
      <Text style={styles.btnText}>{text}</Text>
    </Pressable>
  );
};
const styles = StyleSheet.create({
  btnContainer: {
    width: width * 160,
    height: height * 48,
    backgroundColor: GlobalStyles.black.color,
    borderRadius: 30,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  pressedBtnContainer: {
    backgroundColor: GlobalStyles.grey_2.color, // Pressed state color
  },
  btnText: {
    fontFamily: GlobalStyles.btn.fontFamily,
    fontSize: height * 14,
    color: GlobalStyles.white_1.color,
    alignSelf: 'center',
  },
  arrow: {
    width: 15,
    height: 13,
    objectFit: 'scale-down',
    marginTop: 13,
  },
});

export default BtnReg;
