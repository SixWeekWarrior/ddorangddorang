import {StyleSheet, View} from 'react-native';
import BtnBig from '../../atoms/btnBig';
import BorderedBox from '../../molecules/borderedBox';
import {useState} from 'react';
import {useSetRecoilState} from 'recoil';
import user from '../../../modules/user';

export const ProfilePicAdd = ({navigation}: {navigation: any}): JSX.Element => {
  const setTmpUserInfo = useSetRecoilState(user.TmpUserInfoState);
  const [selectedImageUri, setSelectedImageUri] = useState<string | null>(null);
  const handleImageSelect = (imageUri: string) => {
    setSelectedImageUri(imageUri);
  };

  const handleSubmit = () => {
    if (!selectedImageUri) {
      // 이미지를 선택하지 않은 경우 경고 메시지 출력 또는 처리 로직
      console.warn('프로필 사진을 선택해주세요.');
      return;
    }
    setTmpUserInfo(prevUserInfo => ({
      ...prevUserInfo,
      profile: selectedImageUri || '',
    }));
    navigation.navigate('BasicInfo');
  };

  return (
    <View style={styles.container}>
      <BorderedBox
        menu={'사진 등록'}
        text={`그룹에서 나를 알아볼 수 있도록\nSSAFY 학생증 사진을 업로드해주세요.`}
        onInputChange={() => console.log('onInputChange 실행')}
        onImageSelect={handleImageSelect}
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
