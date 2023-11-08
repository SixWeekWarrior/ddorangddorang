import {StyleSheet, View} from 'react-native';
import MenuTop from '../../molecules/menuTop';
import GlobalStyles from '../../../styles/GlobalStyles';
import BtnBig from '../../atoms/btnBig';
import {useState} from 'react';
import InfoTextInput from '../../atoms/infoTextInput';

export const ReviseEtc = ({navigation}: {navigation: any}) => {
  const [inputValues, setInputValues] = useState({
    MBTI: '',
    worry: '',
    like: '',
    hate: '',
  });

  const onInputChange = (title: string, value: string) => {
    setInputValues(prevState => ({
      ...prevState,
      [title]: value,
    }));
  };

  const handleSubmit = () => {
    console.log(inputValues);
    navigation.navigate('NavBar');
  };

  return (
    <View style={styles.container}>
      <MenuTop menu="추가 정보 수정" text={`추가 정보를 수정해봐요.`} />
      <View style={styles.innerContainer}>
        <View style={[styles.flexColumn, {height: '50%', rowGap: 15}]}>
          <InfoTextInput
            title="MBTI"
            placeholder="MBTI를 입력해주세요"
            setValue={data => onInputChange('MBTI', data)}
          />
          <InfoTextInput
            title="요즘 고민"
            placeholder="고민을 입력해주세요"
            setValue={data => onInputChange('worry', data)}
          />
          <InfoTextInput
            title="좋아하는 것"
            placeholder="좋아하는 것을 입력해주세요"
            setValue={data => onInputChange('like', data)}
          />
          <InfoTextInput
            title="싫어하는 것"
            placeholder="싫어하는 것을 입력해주세요"
            setValue={data => onInputChange('hate', data)}
          />
        </View>
      </View>
      <View style={styles.btnContainer}>
        <BtnBig text="수정완료" onPress={handleSubmit} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    borderWidth: 0.5,
    flex: 1,
    marginLeft: 24,
    marginRight: 24,
    marginTop: 20,
    borderStyle: 'solid',
    borderRadius: 20,
    borderColor: GlobalStyles.grey_3.color,
  },
  btnContainer: {
    flex: 1,
  },
  flexColumn: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
    flexDirection: 'column',
    flexWrap: 'wrap',
  },
});

export default ReviseEtc;
