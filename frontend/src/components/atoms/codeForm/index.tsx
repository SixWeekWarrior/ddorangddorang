import {StyleSheet, Text, Image, View} from 'react-native';
import GlobalStyles from '../../../styles/GlobalStyles';
import Copy from '../../../assets/copy.png';

interface CodeFormProps {
  text: string;
}

export default function CodeForm({text}: CodeFormProps) {
  return (
    <View style={styles.Container}>
      <Text style={styles.InputText}>{text}</Text>
      <Image source={Copy} style={styles.Img}></Image>
    </View>
  );
}

const styles = StyleSheet.create({
  Container: {
    width: 290,
    height: 35,
    borderWidth: 1,
    borderColor: GlobalStyles.grey_4.color,
    padding: 5,
    borderRadius: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  InputText: {
    borderColor: GlobalStyles.grey_4.color,
    color: GlobalStyles.grey_3.color,
    marginLeft: '6%',
    bottom: 2,
  },
  Img: {
    marginRight: '4%',
  },
});
