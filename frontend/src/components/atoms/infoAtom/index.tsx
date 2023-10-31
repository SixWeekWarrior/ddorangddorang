import {StyleSheet, Text, View} from 'react-native';
import GlobalStyles from '../../../styles/GlobalStyles';

type InfoAtomProps = {
  title: string;
  content: string;
  dark: boolean;
};
export const InfoAtom = ({title, content, dark}: InfoAtomProps) => {
  const textColor = dark
    ? GlobalStyles.grey_2.color
    : GlobalStyles.white_2.color;

  const style = StyleSheet.create({
    container: {
      flexDirection: 'row',
      marginVertical: -7,
    },
    titleText: {
      color: textColor,
      fontFamily: GlobalStyles.home_title.fontFamily,
      fontSize: 15,
    },
    contentText: {
      color: textColor,
      fontFamily: GlobalStyles.section_title.fontFamily,
      fontSize: 15,
    },
    border: {
      color: GlobalStyles.yellow.color,
      fontFamily: GlobalStyles.section_title.fontFamily,
      marginHorizontal: 10,
    },
  });
  return (
    <View style={style.container}>
      <Text style={style.titleText}>{title}</Text>
      <Text style={style.border}>|</Text>
      <Text style={style.contentText}>{content}</Text>
    </View>
  );
};

export default InfoAtom;
