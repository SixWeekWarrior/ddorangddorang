import * as React from 'react';
import {StyleSheet, Pressable, Text, Image, View} from 'react-native';
import GlobalStyles from '../../../styles/GlobalStyles';
import ArrowRight from '../../../assets/ArrowRight.png';

interface BtnMidProps {
  onPress: () => void;
  text: string;
}

export default function BtnMid({onPress, text}: BtnMidProps) {
  return (
    <Pressable onPress={onPress} style={styles.btnContainer}>
      <Text style={styles.BtnText}>{text}</Text>
      <Image source={ArrowRight} style={styles.Arrow} />
    </Pressable>
  );
}
const styles = StyleSheet.create({
  btnContainer: {
    width: 260,
    height: 40,
    backgroundColor: GlobalStyles.blue.color,
    borderRadius: 20,
    marginTop: 30,
    flexDirection: 'row',
    alignSelf: 'center',
    paddingLeft: '7%',
    paddingRight: '4%',
    justifyContent: 'space-between',
  },
  BtnText: {
    fontFamily: GlobalStyles.btn.fontFamily,
    fontSize: GlobalStyles.btn.fontSize,
    color: GlobalStyles.white_1.color,
    textAlign: 'left',
    verticalAlign: 'middle',
    lineHeight: 43,
  },
  Arrow: {
    width: 15,
    height: 13,
    objectFit: 'scale-down',
    marginTop: 13,
  },
});
