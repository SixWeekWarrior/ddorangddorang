import {StyleSheet, View, Image} from 'react-native';
import GlobalStyles, {height, width} from '../../../styles/GlobalStyles';
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
      <View style={styles.contentContainer}>
        <TitleAtom
          menu={menu}
          text={text}
          menuColor={menuColor}
          textColor={textColor}
        />
      </View>
      <View style={styles.imgContainer}>
        <Image source={blockImg} style={styles.blockImg} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: height * 255,
    flexDirection: 'row',
    backgroundColor: GlobalStyles.blue.color,
    paddingLeft: width * 24,
    paddingRight: width * 24,
  },
  contentContainer: {
    flex: 1,
    alignSelf: 'flex-end',
    bottom: width * 25,
  },
  imgContainer: {
    alignSelf: 'flex-end',
    height: '68%',
    flex: 1,
  },
  blockImg: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
});

export default MenuTop;
