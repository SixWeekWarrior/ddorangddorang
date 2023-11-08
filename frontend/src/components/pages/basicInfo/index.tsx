import {StyleSheet, View} from 'react-native';
import BtnBig from '../../atoms/btnBig';
import BorderedBox from '../../molecules/BorderedBox';
import user from '../../../modules/user';
import {useRecoilState} from 'recoil';

export const BasicInfo = ({navigation}: {navigation: any}): JSX.Element => {
  const [tmpUserInfo, setTmpUserInfo] = useRecoilState(user.TmpUserInfoState);

  const {name, gender, generation, campus, isMajor, classes, floor} =
    tmpUserInfo;
  const isAllInputsFilled =
    name !== '' &&
    gender !== undefined &&
    generation !== 0 &&
    campus !== -1 &&
    isMajor !== undefined &&
    classes !== 0 &&
    floor !== 0;

  const handleInputChange = (title: string, value: any) => {
    setTmpUserInfo(prevUserInfo => ({
      ...prevUserInfo,
      [title]: value,
    }));
  };

  const handleSubmit = async () => {
    console.log(tmpUserInfo);
    navigation.navigate('AdditionalInfo');
  };

  return (
    <View style={styles.container}>
      <BorderedBox
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
