import {
  Button,
  Image,
  ScrollView,
  StyleSheet,
  ImageURISource,
  Text,
  View,
  Alert,
  Pressable,
} from 'react-native';
import BlockImg from '../../../assets/blockImg.png';
import TitleAtom from '../../atoms/titleAtom';
import GlobalStyles, {height} from '../../../styles/GlobalStyles';
import InfoSelectInput from '../../atoms/infoSelectInput';
import InfoTextInput from '../../atoms/infoTextInput';
import InfoRadioInput from '../../atoms/infoRadioInput';
import {
  launchCamera,
  launchImageLibrary,
  CameraOptions,
  ImagePickerResponse,
  ImageLibraryOptions,
  Asset,
} from 'react-native-image-picker';
import {useState} from 'react';

type BorderedBoxProps = {
  menu: string;
  text: string;
  onInputChange: (title: string, value: any) => void;
  onSkip?: () => void;
};

export const BorderedBox = ({
  menu,
  text,
  onInputChange,
  onSkip,
}: BorderedBoxProps) => {
  const generationList = [9, 10];
  const isMajor = ['전공', '비전공'];
  const gender = ['남자', '여자'];
  const campusList = ['서울', '대전', '광주', '구미', '부울경'];
  const classList = Array.from({length: 20}, (_, index) => index + 1);
  const floorList = Array.from({length: 20}, (_, index) => index + 1);
  const [img, setImg] = useState<ImageURISource>({
    uri: 'https://cdn.pixabay.com/photo/2020/03/31/19/20/dog-4988985_640.jpg',
  });

  // const handleSubmit = () => {};
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
          const uri = response.assets[0].uri; //assets 여러개가 올수 있는데 중에 0번방 거
          const souce = {uri: uri};
          setImg(souce);
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
      setImg(uris[0]);
    }
  };

  const renderContent = (menu: string) => {
    switch (menu) {
      case '기본 정보':
        return (
          <ScrollView>
            <View style={styles.contentContainer}>
              <InfoTextInput
                title="이름"
                placeholder="이름을 입력해주세요"
                setValue={data => onInputChange('name', data)}
              />
              <InfoRadioInput
                title="성별"
                data={gender}
                setValue={data => {
                  const genderValue = data === '남자' ? true : false;
                  onInputChange('gender', genderValue);
                }}
              />
              <InfoSelectInput
                title="기수"
                placeholder="기수를 선택하세요"
                data={generationList}
                setValue={data => onInputChange('generation', data)}
              />
              <InfoSelectInput
                title="지역"
                placeholder="지역을 선택하세요"
                data={campusList}
                setValue={data => {
                  const campusDict = {
                    서울: 0,
                    대전: 1,
                    광주: 2,
                    구미: 3,
                    부울경: 4,
                  };
                  onInputChange('campus', campusDict[data]);
                }}
              />
              <InfoRadioInput
                title="전공"
                data={isMajor}
                setValue={data => {
                  const isMajorValue = data === '전공' ? true : false;
                  onInputChange('isMajor', isMajorValue);
                }}
              />
              <InfoSelectInput
                title="반"
                placeholder="반을 선택하세요"
                data={classList}
                setValue={data => onInputChange('classes', data)}
              />
              <InfoSelectInput
                title="층"
                placeholder="층을 선택하세요"
                data={floorList}
                setValue={data => onInputChange('floor', data)}
              />
            </View>
          </ScrollView>
        );
      case '추가 정보':
        return (
          <View style={styles.contentContainer}>
            <InfoTextInput
              title="MBTI"
              placeholder="MBTI를 입력해주세요"
              setValue={data => onInputChange('mbti', data)}
            />
            <InfoTextInput
              title="요즘 고민"
              placeholder="고민을 입력해주세요"
              setValue={data => onInputChange('worry', data)}
            />
            <InfoTextInput
              title="좋아하는 것"
              placeholder="좋아하는 것을 입력해주세요"
              setValue={data => onInputChange('likes', data)}
            />
            <InfoTextInput
              title="싫어하는 것"
              placeholder="싫어하는 것을 입력해주세요"
              setValue={data => onInputChange('hate', data)}
            />
            <Text style={styles.skipText} onPress={onSkip}>
              건너뛰기
            </Text>
          </View>
        );
      case '프로필 사진등록':
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
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.borderedBox}>
        <Image source={BlockImg} style={styles.blockImg} />
        <View style={styles.title}>
          <TitleAtom
            menu={menu}
            text={text}
            menuColor={GlobalStyles.green.color}
            textColor={GlobalStyles.grey_3.color}
          />
        </View>
        <View style={styles.content}>{renderContent(menu)}</View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '90%',
  },
  borderedBox: {
    alignSelf: 'center',
    top: '10%',
    width: '90%',
    height: '70%',
    paddingBottom: 20,
    borderRadius: 20,
    borderColor: GlobalStyles.grey_3.color,
    borderWidth: 0.5,
  },
  blockImg: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: '20%',
  },
  title: {
    flex: 1,
    marginLeft: '10%',
    marginTop: height * 10,
  },
  content: {
    marginTop: height * 30,
    flex: 3,
  },
  skipText: {
    fontFamily: GlobalStyles.section_title.fontFamily,
    fontSize: height * 12,
    color: GlobalStyles.grey_3.color,
    marginTop: 10,
    alignSelf: 'flex-end',
  },
  contentContainer: {
    flex: 1,
    alignSelf: 'center',
    rowGap: 15,
  },
  innerContainer: {
    flex: 1,
    alignItems: 'center',
    rowGap: 15,
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
    shadowOffset: {width: 0, height: 3}, // Adjusted shadow offset
    shadowOpacity: 0.4, // Adjusted shadow opacity
    shadowRadius: 6, // Adjusted shadow radius
    elevation: 5, // Added elevation for Android
  },
  btnText: {
    color: GlobalStyles.white_1.color,
    fontFamily: GlobalStyles.section_title.fontFamily,
    fontSize: GlobalStyles.btn.fontSize,
    alignSelf: 'center',
  },
});
export default BorderedBox;
