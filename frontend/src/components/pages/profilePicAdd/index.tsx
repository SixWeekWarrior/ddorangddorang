import {StyleSheet, View} from 'react-native';
import BtnBig from '../../atoms/btnBig';
import BorderedBox from '../../molecules/BorderedBox';

export const ProfilePicAdd = ({navigation}: {navigation: any}): JSX.Element => {
  const handleInputChange = (title: string, value: any) => {};

  const handleSubmit = async () => {
    navigation.navigate('BasicInfo');
  };

  return (
    <View style={styles.container}>
      <BorderedBox
        menu={'프로필 사진등록'}
        text={`그룹에서 나를 알아볼 수 있도록\nSSAFY 학생증 사진을 업로드해주세요.`}
        onInputChange={handleInputChange}
      />
      <BtnBig text="다음" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ProfilePicAdd;
