import {StyleSheet, View} from 'react-native';
import MenuTop from '../../molecules/menuTop';
import BtnBig from '../../atoms/btnBig';
import GlobalStyles from '../../../styles/GlobalStyles';
import {TextInput} from 'react-native-gesture-handler';
import {useState} from 'react';

export const SendOpinion = ({navigation}: {navigation: any}) => {
  const [value, setValue] = useState('');

  const handleInputChange = (text: string) => {
    setValue(text);
  };

  const handlePress = () => {
    console.log(value);
    navigation.navigate('NavBar');
  };

  return (
    <View style={styles.container}>
      <MenuTop
        menu="의견 보내기"
        text={`자유롭게 또랑또랑에 대한\n의견을 보내주세요.`}
      />
      <View style={styles.innerContainer}>
        <TextInput
          multiline={true}
          numberOfLines={40}
          style={styles.inputText}
          onChangeText={handleInputChange}
          value={value}
          placeholder={'의견을 입력해주세요.'}
          placeholderTextColor={GlobalStyles.grey_3.color}
        />
      </View>
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
  innerContainer: {
    flex: 1,
    marginLeft: 24,
    marginRight: 24,
    marginTop: 20,
  },
  btnContainer: {
    flex: 1,
    bottom: '25%',
  },
  inputText: {
    width: '100%',
    height: '100%',
    textAlignVertical: 'top',
    marginRight: 12,
    borderWidth: 1,
    padding: 30,
    borderRadius: 20,
    borderColor: GlobalStyles.grey_3.color,
    backgroundColor: GlobalStyles.white_1.color,
    fontSize: 17,
    color: GlobalStyles.black.color,
  },
});
export default SendOpinion;
