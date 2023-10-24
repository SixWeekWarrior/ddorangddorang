import * as React from 'react';
import {StyleSheet, Pressable, Text} from 'react-native';
import GlobalStyles from '../../../styles/GlobalStyles';

interface BtnSmProps {
  onPress: () => void;
  text: string;
}

export default function BtnSm({onPress, text}: BtnSmProps) {
  return (
    <Pressable onPress={onPress} style={styles.btnContainer}>
      <Text style={styles.btn}>{text}</Text>
    </Pressable>
  );
}
const styles = StyleSheet.create({
  btnContainer: {
    width: '25%',
    height: 40,
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: GlobalStyles.green.color,
    borderRadius: 10,
  },
  btn: {
    fontFamily: GlobalStyles.btn.fontFamily,
    fontSize: GlobalStyles.btn.fontSize,
    color: GlobalStyles.white_1.color,
    lineHeight: 25,
    textAlign: 'center',
  },
});
