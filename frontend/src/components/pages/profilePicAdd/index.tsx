import {StyleSheet, View} from 'react-native';
import BtnBig from '../../atoms/btnBig';
import BorderedBox from '../../molecules/borderedBox';
import axios, {AxiosError} from 'axios';
import {useState} from 'react';

export const ProfilePicAdd = ({navigation}: {navigation: any}): JSX.Element => {
  const [selectedImageUri, setSelectedImageUri] = useState<string | null>(null);
  const handleImageSelect = (imageUri: string) => {
    setSelectedImageUri(imageUri);
  };

  const handleSubmit = async () => {
    try {
      if (!selectedImageUri) {
        // 이미지를 선택하지 않은 경우 경고 메시지 출력 또는 처리 로직
        console.warn('프로필 사진을 선택해주세요.');
        return;
      }

      const formData = new FormData();
      const file = {
        uri: selectedImageUri,
        type: 'image/jpeg',
        name: '프로필 사진.jpg',
      };
      formData.append('profile', file);

      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        maxContentLength: 10000000,
      };

      const res = await axios.post(
        'https://k9a210.p.ssafy.io/api/v1/users/s3-test',
        formData,
        config,
      );

      console.log('Uploaded profile image:', res.data);

      // 필요한 경우, 다음 화면으로 이동
      // navigation.navigate('BasicInfo');
    } catch (error) {
      handleUploadError(error);
    }
  };

  const handleUploadError = (error: AxiosError) => {
    if (error.response) {
      // 서버가 응답한 상태 코드가 4xx 또는 5xx 인 경우
      console.error(
        'Error uploading profile picture. Server responded with:',
        error.response.data,
      );
    } else if (error.request) {
      // 요청이 서버에 도달하지 않은 경우
      console.error(
        'Error uploading profile picture. Request failed:',
        error.request,
      );
    } else {
      // 오류를 생성하는 과정에서 문제가 발생한 경우
      console.error('Error uploading profile picture:', error.message);
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
