import * as React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import GlobalStyles from '../../../styles/GlobalStyles';
import blockImg from '../../../assets/blockImg.png';

interface MenuTopProps {
  menu: string;
  text: string;
}

export default function MenuTop({menu, text}: MenuTopProps) {
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.menu}>{menu}</Text>
        <Text style={styles.text}>{text}</Text>
      </View>
      <Image source={blockImg} style={styles.blockImg}></Image>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: GlobalStyles.blue.color,
  },
  innerContainer: {
    flex: 1,
  },
  menu: {
    marginLeft: 20,
    marginTop: 150,
    marginBottom: -20,
    fontFamily: GlobalStyles.section_title.fontFamily,
    fontSize: GlobalStyles.section_title.fontSize,
    color: GlobalStyles.white_1.color,
  },
  text: {
    marginLeft: 20,
    marginRight: -10,
    marginBottom: 20,
    fontFamily: GlobalStyles.sub_title.fontFamily,
    fontSize: 11,
    color: GlobalStyles.white_1.color,
  },
  blockImg: {
    flex: 1,
    height: 130,
    objectFit: 'scale-down',
    marginTop: 105,
  },
});
