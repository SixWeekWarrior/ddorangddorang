import {StyleSheet, View} from 'react-native';
import AddInfoMolecules from '../../molecules/addInfoMolecules';
import {useState} from 'react';
import BtnBig from '../../atoms/btnBig';

export const BasicInfo = ({navigation}: {navigation: any}): JSX.Element => {
  const [inputValues, setInputValues] = useState({
    region: '',
    isMajor: 'true',
    group: '',
    floor: '',
  });

  const isAllInputsFilled = Object.values(inputValues).every(
    value => value !== '',
  );

  const handleInputChange = (title: string, value: string) => {
    setInputValues(prevState => ({
      ...prevState,
      [title]: value,
    }));
  };

  const handleSubmit = () => {
    console.log(inputValues);
    navigation.navigate('AdditionalInfo');
  };

  return (
    <View style={styles.container}>
      <AddInfoMolecules
        menu={'기본 정보'}
        text={`SSAFY 교육생으로서\n나의 정보를 입력해주세요.`}
        onInputChange={handleInputChange}
      />
      <BtnBig
        text="다음"
        onPress={handleSubmit}
        disabled={!isAllInputsFilled}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default BasicInfo;
