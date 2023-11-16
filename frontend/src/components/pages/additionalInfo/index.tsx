import {ScrollView, StyleSheet, View} from 'react-native';
import BorderedBox from '../../molecules/borderedBox';
import BtnBig from '../../atoms/btnBig';
import {userApi} from '../../../apis';
import {useRecoilState, useSetRecoilState} from 'recoil';
import user from '../../../modules/user';
import {UserInfo} from '../../../types/user';

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
      // 기존 값을 복사하여 업데이트
      await setTmpUserInfo(prevUserInfo => ({
        ...prevUserInfo,
        mbti: '',
        like: '',
        hate: '',
        worry: '',
      }));

      // await setTmpUserInfo 이후에 직접 tmpUserInfo 값을 참조하여 사용
      const updatedUserInfo = {
        ...tmpUserInfo,
        mbti: '',
        like: '',
        hate: '',
        worry: '',
      };

      await handleSignup(updatedUserInfo);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSignup = async (userInfo: UserInfo) => {
    try {
      await userApi.postSignup(userInfo);
      await setUserInfo(userInfo);
      navigation.navigate('Enter', 'signup');
    } catch (error) {
      navigation.navigate('Onboarding');
    }
  };

  return (
    <View style={styles.container}>
      <BorderedBox
        menu={'추가 정보'}
        text={'나의 마니띠에게 소개할 수 있는\n추가 정보를 입력해주세요.'}
        onInputChange={handleInputChange}
        onSkip={handleSkip}
      />
      <BtnBig text="회원가입" onPress={() => handleSignup(tmpUserInfo)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default AdditionalInfo;
