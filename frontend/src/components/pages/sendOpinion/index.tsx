import {StyleSheet, View} from 'react-native';
import MenuTop from '../../molecules/menuTop';
import BtnBig from '../../atoms/btnBig';
import GlobalStyles, {height} from '../../../styles/GlobalStyles';
import {TextInput} from 'react-native-gesture-handler';
import {useState} from 'react';
import {OpinionInfo} from '../../../types/user';
import {userApi} from '../../../apis';

const SendOpinion = ({navigation}: {navigation: any}) => {
  const [value, setValue] = useState<OpinionInfo>({
    content: '',
  });

  const handleInputChange = (text: string) => {
    setValue(prevValue => ({
      ...prevValue,
      content: text,
    }));
  };

  const handlePress = async () => {
    try {
      const creatOpinion: OpinionInfo = {...value};
      await userApi.postOpinion(value);
      await setValue(creatOpinion);
      navigation.navigate('NavBar');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <MenuTop
        menu="의견 보내기"
        text={`또랑또랑에 대한\n의견을 보내주세요.`}
      />
      <TextInput
        multiline={true}
        style={styles.inputText}
        onChangeText={handleInputChange}
        placeholder={'의견을 입력해주세요.'}
        placeholderTextColor={GlobalStyles.grey_3.color}
      />

      <View style={styles.btnContainer}>
        <BtnBig text="제출하기" onPress={handlePress} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  btnContainer: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },
  inputText: {
    flex: 1,
    textAlignVertical: 'top',
    padding: 30,
    margin: 20,
    borderRadius: 24,
    backgroundColor: GlobalStyles.white_1.color,
    fontSize: height * 14,
    color: GlobalStyles.grey_1.color,
  },
});
export default SendOpinion;
