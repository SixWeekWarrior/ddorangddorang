import * as React from 'react';
import {StyleSheet, Pressable, Text} from 'react-native';
import GlobalStyles from '../../../styles/GlobalStyles';

type BtnSmProps = {
  onPress: any;
  text: string;
  isDark?: boolean;
};

export const BtnSm = ({onPress, text, isDark}: BtnSmProps) => {
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.btnContainer,
        isDark && {backgroundColor: GlobalStyles.grey_3.color}, // 수정된 부분
      ]}>
      <Text style={styles.btn}>{text}</Text>
    </Pressable>
  );
};
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
    color: GlobalStyles.white_2.color,
    lineHeight: 25,
    textAlign: 'center',
  },
});

export default BtnSm;
