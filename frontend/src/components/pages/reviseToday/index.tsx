import {StyleSheet, View} from 'react-native';
import MenuTop from '../../molecules/menuTop';
import GlobalStyles from '../../../styles/GlobalStyles';
import BtnBig from '../../atoms/btnBig';
// import InputInfoMolecules from '../../molecules/inputInfoMolecules';
import {useState} from 'react';
import InfoTextInput from '../../atoms/infoTextInput';

export const ReviseToday = ({navigation}: {navigation: any}) => {
  const [inputValues, setInputValues] = useState({
    mood: '',
    color: '',
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
      <MenuTop
        menu="오늘의 정보 수정"
        text={`오늘의 정보를 입력하고\n나를 알려요!`}
      />
      <View style={styles.innerContainer}>
        <View style={[styles.flexColumn, {height: '50%', rowGap: 15}]}>
          <InfoTextInput
            title="기분"
            placeholder="오늘 기분을 알려주세요"
            setValue={data => onInputChange('mood', data)}
          />
          <InfoTextInput
            title="입은 옷"
            placeholder="옷 색깔을 알려주세요"
            setValue={data => onInputChange('color', data)}
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

export default ReviseToday;
