import * as React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import GlobalStyles from '../../../styles/GlobalStyles';
import {BlockImg} from '../../../assets';

interface MenuTopProps {
  menu: string;
  text: string;
}

export default function MenuTop({menu, text}: MenuTopProps) {
  return (
    <View style={styles.Container}>
      <View style={styles.innerContainer}>
        <Text style={styles.Menu}>{menu}</Text>
        <Text style={styles.Text}>{text}</Text>
      </View>
      <Image source={BlockImg} style={styles.BlockImg}></Image>
    </View>
  );
}
const styles = StyleSheet.create({
  Container: {
    flexDirection: 'row',
    height: '35%',
    backgroundColor: GlobalStyles.blue.color,
  },
  innerContainer: {
    flex: 1,
  },
  Menu: {
    marginLeft: 20,
    marginTop: 160,
    fontFamily: GlobalStyles.section_title.fontFamily,
    fontSize: GlobalStyles.section_title.fontSize,
    color: GlobalStyles.white_1.color,
  },
  Text: {
    marginLeft: 20,
    marginTop: -20,
    marginRight: -10,
    fontFamily: GlobalStyles.sub_title.fontFamily,
    fontSize: 13,
    color: GlobalStyles.white_1.color,
  },
  BlockImg: {
    flex: 1,
    height: 130,
    objectFit: 'scale-down',
    marginTop: 120,
  },
});
