import {StyleSheet, View} from 'react-native';
import MenuTop from '../../molecules/menuTop';
import GlobalStyles from '../../../styles/GlobalStyles';
import BtnBig from '../../atoms/btnBig';
import {useState} from 'react';
import InfoTextInput from '../../atoms/infoTextInput';
import {userApi} from '../../../apis';
import {useRecoilState} from 'recoil';
import {UserInfo, UserMoreInfo} from '../../../types/user';
import user from '../../../modules/user';

export const ReviseEtc = ({navigation}: {navigation: any}) => {
  const [userInfo, setUserInfo] = useRecoilState(user.UserInfoState);
  const [defaultMbti, defaultWorry, defaultLikes, defaultHate] = [
    userInfo.mbti,
    userInfo.worry,
    userInfo.likes,
    userInfo.hate,
  ];
  const [inputValues, setInputValues] = useState<UserMoreInfo>({
    mbti: defaultMbti,
    worry: defaultWorry,
    likes: defaultLikes,
    hate: defaultHate,
  });

  const onInputChange = (title: string, value: string) => {
    setInputValues(prevState => ({
      ...prevState,
      [title]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const updatedUserInfo: UserInfo = {...userInfo, ...inputValues};
      await userApi.putMoreInfo(inputValues);
      await setUserInfo(updatedUserInfo);
      navigation.navigate('정보');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <MenuTop menu="추가 정보 수정" text={`추가 정보를 수정해봐요.`} />
      <View style={styles.innerContainer}>
        <View style={[styles.flexColumn, {height: '50%', rowGap: 15}]}>
          <InfoTextInput
            title="mbti"
            placeholder={defaultMbti}
            setValue={data => onInputChange('mbti', data)}
          />
          <InfoTextInput
            title="요즘 고민"
            placeholder={defaultWorry}
            setValue={data => onInputChange('worry', data)}
          />
          <InfoTextInput
            title="좋아하는 것"
            placeholder={defaultLikes}
            setValue={data => onInputChange('likes', data)}
          />
          <InfoTextInput
            title="싫어하는 것"
            placeholder={defaultHate}
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
