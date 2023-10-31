import * as React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import GlobalStyles from '../../../styles/GlobalStyles';
import blockImg from '../../../assets/blockImg.png';

interface MenuTopProps {
  menu: string;
  text: string;
}

export const MenuTop = ({menu, text}: MenuTopProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.menu}>{menu}</Text>
        <Text style={styles.text}>{text}</Text>
      </View>
      <Image source={blockImg} style={styles.blockImg}></Image>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 235,
    flexDirection: 'row',
    backgroundColor: GlobalStyles.blue.color,
  },
  innerContainer: {
    flex: 1,
  },
  menu: {
    marginLeft: 20,
    bottom: -120,
    fontFamily: GlobalStyles.section_title.fontFamily,
    fontSize: 22,
    color: GlobalStyles.white_1.color,
  },
  text: {
    marginLeft: 20,
    marginRight: -10,
    bottom: -115,
    fontFamily: GlobalStyles.content.fontFamily,
    fontSize: 14,
    lineHeight: 20,
    color: GlobalStyles.white_1.color,
  },
  blockImg: {
    flex: 1,
    height: 120,
    objectFit: 'scale-down',
    bottom: -90,
  },
});

export default MenuTop;
