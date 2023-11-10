import {StyleSheet, View} from 'react-native';
import BtnBig from '../../atoms/btnBig';
import BorderedBox from '../../molecules/borderedBox';
import axios from 'axios';
import {useState} from 'react';

export const ProfilePicAdd = ({navigation}: {navigation: any}): JSX.Element => {
  const [selectedImageUri, setSelectedImageUri] = useState<string>('');
  const handleImageSelect = (imageUri: string) => {
    setSelectedImageUri(imageUri);
  };

  const handleSubmit = async () => {
    try {
      if (selectedImageUri === '') {
        // 이미지를 선택하지 않은 경우 경고 메시지 출력 또는 처리 로직
        return;
      }

      const formData = new FormData();
      formData.append('profile', {
        uri: selectedImageUri,
        type: 'image/jpeg',
        name: selectedImageUri,
      });

      // 이미지 업로드
      const res = await axios.post(
        'https://k9a210.p.ssafy.io/api/v1/users/s3-test',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );

      console.log('Uploaded profile image:', res.data);

      // 필요한 경우, 다음 화면으로 이동
      navigation.navigate('BasicInfo');
    } catch (error) {
      console.error('Error uploading profile picture:', error);
    }
  };
  return (
    <View style={styles.container}>
      <BorderedBox
        menu={'프로필 사진등록'}
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
