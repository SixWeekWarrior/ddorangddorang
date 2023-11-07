import {StyleSheet, Text, View} from 'react-native';
import GlobalStyles, {width} from '../../../styles/GlobalStyles';

type TitleAtomProps = {
  menuColor?: string;
  textColor?: string;
  menu: string;
  text: string;
};

export const TitleAtom = ({
  menuColor,
  textColor,
  menu,
  text,
}: TitleAtomProps) => {
  const styles = StyleSheet.create({
    menu: {
      fontFamily: GlobalStyles.section_title.fontFamily,
      fontSize: width * 19,
      color: menuColor || GlobalStyles.white_1.color,
    },
    text: {
      fontFamily: GlobalStyles.content.fontFamily,
      fontSize: width * 13,
      marginTop: -10,
      color: textColor || GlobalStyles.white_1.color,
    },
  });
  return (
    <View>
      <Text style={styles.menu}>{menu}</Text>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

export default TitleAtom;
