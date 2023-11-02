import * as React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import GlobalStyles from '../../../styles/GlobalStyles';
import blockImg from '../../../assets/blockImg.png';
import TitleAtom from '../../atoms/titleAtom';

interface MenuTopProps {
  menu: string;
  text: string;
  menuColor?: string;
  textColor?: string;
}

export const MenuTop = ({menu, text, menuColor, textColor}: MenuTopProps) => {
  return (
    <View style={styles.container}>
      <TitleAtom
        menu={menu}
        text={text}
        menuColor={menuColor}
        textColor={textColor}
      />
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

  blockImg: {
    flex: 1,
    height: 120,
    objectFit: 'scale-down',
    bottom: -90,
  },
});

export default MenuTop;
