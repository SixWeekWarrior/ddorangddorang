import {StyleSheet, View} from 'react-native';
import MenuTop from '../../molecules/menuTop';
import GlobalStyles from '../../../styles/GlobalStyles';
import BtnBig from '../../atoms/btnBig';
import {useState} from 'react';
import InfoTextInput from '../../atoms/infoTextInput';
import {useRecoilState} from 'recoil';
import user from '../../../modules/user';
import {UserDailyInfo, UserInfo} from '../../../types/user';
import {userApi} from '../../../apis';

export const ReviseToday = ({navigation}: {navigation: any}) => {
  const [userInfo, setUserInfo] = useRecoilState(user.UserInfoState);
  const [defaultMood, defaultColor] = [userInfo.mood, userInfo.color];
  const [inputValues, setInputValues] = useState<UserDailyInfo>({
    mood: defaultMood,
    color: defaultColor,
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
      await userApi.putTodayInfo(inputValues);
      await setUserInfo(updatedUserInfo);
      navigation.navigate('정보');
    } catch (error) {
      console.error(error);
    }
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
            placeholder={defaultMood}
            setValue={data => onInputChange('mood', data)}
          />
          <InfoTextInput
            title="입은 옷"
            placeholder={defaultColor}
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
