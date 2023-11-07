import {StyleSheet, View} from 'react-native';
import {BorderedBox} from '../../molecules/BorderedBox';
import {useState} from 'react';
import BtnBig from '../../atoms/btnBig';
import {userApi} from '../../../apis';

export const AdditionalInfo = ({
  navigation,
}: {
  navigation: any;
}): JSX.Element => {
  const [inputValues, setInputValues] = useState({
    MBTI: '',
    worry: '',
    likes: '',
    hate: '',
  });

  const handleInputChange = (title: string, value: string) => {
    setInputValues((prevState) => ({
      ...prevState,
      [title]: value,
    }));
  };

  const handleSignup = async () => {
    console.log(inputValues);
    try {
      const response = await userApi.putMoreInfo({
         mbti: inputValues.MBTI,
         worry: inputValues.worry,
         likes: inputValues.likes,
         hate: inputValues.hate,
      });
        console.log(response);
        navigation.navigate('Enter');
      } catch (e: any) {
          console.log(e);
          navigation.navigate('Enter');
      }
    };

  return (
    <View style={styles.container}>
      <BorderedBox
        menu={'추가 정보'}
        text={`나의 마니띠에게 소개할 수 있는\n추가 정보를 입력해주세요.`}
        onInputChange={handleInputChange}
        onSkip={handleSignup}
      />
      <BtnBig text="회원가입" onPress={handleSignup} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default AdditionalInfo;
