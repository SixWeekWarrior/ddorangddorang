import {StyleSheet, View} from 'react-native';
import {BorderedBox} from '../../molecules/BorderedBox';
import BtnBig from '../../atoms/btnBig';
import {userApi} from '../../../apis';
import {useRecoilState, useSetRecoilState} from 'recoil';
import user from '../../../modules/user';

export const AdditionalInfo = ({
  navigation,
}: {
  navigation: any;
}): JSX.Element => {
  const [tmpUserInfo, setTmpUserInfo] = useRecoilState(user.TmpUserInfoState);
  const setUserInfo = useSetRecoilState(user.UserInfoState);

  const handleInputChange = (title: string, value: string) => {
    setTmpUserInfo(prevUserInfo => ({
      ...prevUserInfo,
      [title]: value,
    }));
  };

  const handleSkip = async () => {
    try {
      await setTmpUserInfo(prevUserInfo => ({
        ...prevUserInfo,
        mbti: '',
        likes: '',
        hate: '',
        worry: '',
      }));
      await handleSignup();
    } catch (error) {
      console.error(error);
    }
  };

  const handleSignup = async () => {
    try {
      await userApi.postSignup(tmpUserInfo);
      await setUserInfo(tmpUserInfo);
      navigation.navigate('Enter');
    } catch (error) {
      console.error(error);
      navigation.navigate('Onboarding');
    }
  };

  return (
    <View style={styles.container}>
      <BorderedBox
        menu={'추가 정보'}
        text={`나의 마니띠에게 소개할 수 있는\n추가 정보를 입력해주세요.`}
        onInputChange={handleInputChange}
        onSkip={handleSkip}
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
