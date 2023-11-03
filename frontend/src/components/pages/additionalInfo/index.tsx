import {StyleSheet, View} from 'react-native';
import AddInfoMolecules from '../../molecules/addInfoMolecules';
import {useState} from 'react';
import BtnBig from '../../atoms/btnBig';

export const AdditionalInfo = ({
  navigation,
}: {
  navigation: any;
}): JSX.Element => {
  const [inputValues, setInputValues] = useState({
    MBTI: '',
    currentConcern: '',
    likes: '',
    dislikes: '',
  });

  const handleInputChange = (title: string, value: string) => {
    setInputValues(prevState => ({
      ...prevState,
      [title]: value,
    }));
  };

  const handleSkip = () => {
    navigation.navigate('Enter');
  };

  const handleSubmit = () => {
    console.log(inputValues);
    navigation.navigate('Enter');
  };

  return (
    <View style={styles.container}>
      <AddInfoMolecules
        menu={'추가 정보'}
        text={`나의 마니띠에게 소개할 수 있는\n추가 정보를 입력해주세요.`}
        onInputChange={handleInputChange}
        onSkip={handleSkip}
      />
      <BtnBig text="완료" onPress={handleSubmit}></BtnBig>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default AdditionalInfo;
