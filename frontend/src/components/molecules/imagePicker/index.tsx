import {useState} from 'react';
import {
  Alert,
  Image,
  ImageURISource,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  launchCamera,
  launchImageLibrary,
  CameraOptions,
  ImagePickerResponse,
  ImageLibraryOptions,
  Asset,
} from 'react-native-image-picker';
import GlobalStyles from '../../../styles/GlobalStyles';

type ImagePickerProps = {
  onImageSelect: (imageUri: string) => void;
};

const ImagePicker = ({onImageSelect}: ImagePickerProps) => {
  const [img, setImg] = useState<ImageURISource>({
    uri: 'https://cdn.pixabay.com/photo/2020/03/31/19/20/dog-4988985_640.jpg',
  });

  const handleImageSelect = (uri: string | undefined) => {
    setImg({uri: uri || ''});
    if (uri) {
      onImageSelect(uri);
    }
  };

  const showCamera = () => {
    const options: CameraOptions = {
      mediaType: 'photo',
      cameraType: 'back',
      saveToPhotos: true,
      quality: 1,
      videoQuality: 'high',
    };

    //2. 촬영 결과를 받아오는 callback 메소드 등록
    launchCamera(options, (response: ImagePickerResponse) => {
      if (response.didCancel) {
      } else if (response.errorMessage)
        Alert.alert('Error : ' + response.errorMessage);
      else {
        //이곳에 왔다면 이미지가 잘 촬영된 것
        //촬용된 이미지는 response 객체의 assets 라는 속성으로 전달됨
        if (response.assets != null) {
          //선택된 이미지 객체를 이미지뷰가 보여주는 state변수 img에 저장
          //선택된 이미지의 uri 경로 얻어오기
          const uri = response.assets[0].uri;
          handleImageSelect(uri);
        }
      }
    }); //파라미터로 응답객체 받음
  };

  //사진앱을 실행하는 기능 화살표 함수
  const showPhoto = async () => {
    //1. 옵션객체 만들기
    const option: ImageLibraryOptions = {
      mediaType: 'photo',
      selectionLimit: 1,
    };

    //callback 말고 async-await 문법 사용해보기!!!!!!
    //ES7의 새로운 문법 : async-await 문법 [callback 비동기 작업을 동기작업처럼 처리함]
    const response = await launchImageLibrary(option); //함수에 async가 붙어 있어야 함
    //결과를 기다렸다가 받아와라

    if (response.didCancel) {
    } else if (response.errorMessage)
      Alert.alert('Error : ' + response.errorMessage);
    else {
      const uris: Asset[] = [];
      response.assets?.forEach(value => uris.push(value)); //선택한 사진 순서와 상관없이 들어옴
      //원래는 FlatList로 이미지 보여줘야하지만
      //첫번째 이미지만 보여주기
      setImg({uri: uris[0]?.uri || ''});
      handleImageSelect(uris[0]?.uri || '');
    }
  };

  return (
    <View style={styles.innerContainer}>
      <Image source={img} style={styles.img} />
      <View style={styles.buttonContainer}>
        <Pressable
          style={{
            ...styles.btn,
            backgroundColor: GlobalStyles.blue.color,
          }}
          onPress={showCamera}>
          <Text style={styles.btnText}>사진 찍기</Text>
        </Pressable>
        <Pressable style={styles.btn} onPress={showPhoto}>
          <Text style={styles.btnText}>갤러리 열기</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  innerContainer: {
    flex: 1,
    alignItems: 'center',
    rowGap: 15,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '90%',
  },
  img: {
    width: 200,
    height: 200,
    borderRadius: 100,
  },
  btn: {
    backgroundColor: GlobalStyles.pink.color,
    width: '35%',
    height: 50,
    justifyContent: 'center',
    textAlign: 'middle',
    borderRadius: 30,
    shadowColor: GlobalStyles.black.color,
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 5,
  },
  btnText: {
    color: GlobalStyles.white_1.color,
    fontFamily: GlobalStyles.section_title.fontFamily,
    fontSize: GlobalStyles.btn.fontSize,
    alignSelf: 'center',
  },
});
export default ImagePicker;
