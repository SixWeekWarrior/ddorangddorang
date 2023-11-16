import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import BlockImg from '../../../assets/blockImg.png';
import TitleAtom from '../../atoms/titleAtom';
import GlobalStyles, {height} from '../../../styles/GlobalStyles';
import InfoSelectInput from '../../atoms/infoSelectInput';
import InfoTextInput from '../../atoms/infoTextInput';
import InfoRadioInput from '../../atoms/infoRadioInput';
import ImagePicker from '../imagePicker';

type BorderedBoxProps = {
  menu: string;
  text: string;
  onInputChange: (title: string, value: any) => void;
  onSkip?: () => void;
  onImageSelect?: (imageUri: string) => void;
};

export const BorderedBox = ({
  menu,
  text,
  onInputChange,
  onSkip,
  onImageSelect,
}: BorderedBoxProps) => {
  const generationList = [9, 10];
  const isMajor = ['전공', '비전공'];
  const gender = ['남자', '여자'];
  const campusList = ['서울', '대전', '광주', '구미', '부울경'];
  const classList = Array.from({length: 20}, (_, index) => index + 1);
  const floorList = Array.from({length: 20}, (_, index) => index + 1);

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
      case '사진 등록': {
        return onImageSelect ? (
          <ImagePicker onImageSelect={onImageSelect} />
        ) : (
          <></>
        );
      }
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
});
export default BorderedBox;
