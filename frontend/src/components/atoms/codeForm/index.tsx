import {StyleSheet, Text, Image, View, Pressable, Alert} from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import GlobalStyles from '../../../styles/GlobalStyles';
import copyImg from '../../../assets/copy.png';

type CodeFormProps = {
  code: string;
};

export default function CodeForm({code}: CodeFormProps) {
  const onCopyCode = async (code: string) => {
    try {
      await Clipboard.setString(code);
      Alert.alert('복사 완료', '코드가 복사되었습니다.');
    } catch (e) {
      Alert.alert('복사 실패', '코드 복사에 실패하였습니다.');
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.inputText}>{code}</Text>
      <Pressable onPress={() => onCopyCode(code)}>
        <Image source={copyImg} style={styles.copyImg}></Image>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
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
  inputText: {
    borderColor: GlobalStyles.grey_4.color,
    color: GlobalStyles.grey_3.color,
    marginLeft: '6%',
    bottom: 2,
  },
  copyImg: {
    marginRight: '4%',
  },
});
