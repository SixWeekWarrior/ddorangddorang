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
      <View style={styles.container}>
        <Text style={styles.btn}>{text}</Text>
        <Image source={ArrowRight} style={styles.arrow} />
      </View>
    </Pressable>
  );
}
const styles = StyleSheet.create({
  btnContainer: {
    width: 300,
    height: 40,
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: GlobalStyles.blue.color,
    borderRadius: 20,
    marginTop: 30,
  },
  btn: {
    fontFamily: GlobalStyles.btn.fontFamily,
    fontSize: GlobalStyles.btn.fontSize,
    color: GlobalStyles.white_1.color,
    textAlign: 'left',
    paddingLeft: 30,
    lineHeight: 25,
  },
  container: {
    flexDirection: 'row',
  },
  arrow: {
    width: 10,
    height: 13,
    marginTop: 5,
    marginLeft: '55%',
  },
});
