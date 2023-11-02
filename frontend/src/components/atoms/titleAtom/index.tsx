import {StyleSheet, Text, View} from 'react-native';
import GlobalStyles from '../../../styles/GlobalStyles';

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
    innerContainer: {
      flex: 1,
    },
    menu: {
      marginLeft: 20,
      bottom: -120,
      fontFamily: GlobalStyles.section_title.fontFamily,
      fontSize: 22,
      color: menuColor || GlobalStyles.white_1.color,
    },
    text: {
      marginLeft: 20,
      marginRight: -10,
      bottom: -115,
      fontFamily: GlobalStyles.content.fontFamily,
      fontSize: 14,
      lineHeight: 20,
      color: textColor || GlobalStyles.white_1.color,
    },
  });
  return (
    <View style={styles.innerContainer}>
      <Text style={styles.menu}>{menu}</Text>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

export default TitleAtom;
