import {StyleSheet, View} from 'react-native';
import MenuTop from '../../molecules/menuTop';
import GlobalStyles from '../../../styles/GlobalStyles';
import BtnBig from '../../atoms/btnBig';
import InputInfoMolecules from '../../molecules/inputInfoMolecules';
import {useState} from 'react';

export const ReviseSsafy = ({navigation}: {navigation: any}) => {
  const group = Array.from({length: 20}, (_, index) => (index + 1).toString());
  const floor = Array.from({length: 20}, (_, index) => (index + 1).toString());

  const [inputValues, setInputValues] = useState({
    group: '',
    floor: '',
  });
  const handleInputChange = (title: string, value: string) => {
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
        menu="기본 정보 수정"
        text={`SSAFY 교육생으로서 \n나의 정보를 입력해주세요.`}
      />
      <View style={styles.innerContainer}>
        <View style={[styles.flexColumn, {height: '50%', rowGap: 15}]}>
          <InputInfoMolecules
            title="반"
            data={group}
            placeholder="현재 계신 반을 알려주세요"
            type="select"
            onInputChange={(text: string) => handleInputChange('group', text)}
          />
          <InputInfoMolecules
            title="층"
            data={floor}
            placeholder="현재 계신 층을 알려주세요"
            type="select"
            onInputChange={(text: string) => handleInputChange('floor', text)}
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
    bottom: '25%',
  },
  flexColumn: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
    flexDirection: 'column',
    flexWrap: 'wrap',
  },
});

export default ReviseSsafy;
