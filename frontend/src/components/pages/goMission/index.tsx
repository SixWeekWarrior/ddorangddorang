import {StyleSheet, View, Image, Text, Keyboard} from 'react-native';
import MenuTop from '../../atoms/menuTop';
import pinkEyeImg from '../../../assets/pinkEyeImg.png';
import yellowEyeImg from '../../../assets/yellowEyeImg.png';
import GlobalStyles from '../../../styles/GlobalStyles';
import InputTextwithBtn from '../../molecules/inputTextwithBtn';
import BtnBig from '../../atoms/btnBig';
import BottomSheet, {BottomSheetBackdrop} from '@gorhom/bottom-sheet';
import {useRef, useMemo, useState, useCallback} from 'react';
import rightImg from '../../../assets/missionRightImg.png';
import wrongImg from '../../../assets/missionWrongImg.png';

export const GoMission = ({navigation}: {navigation: any}): JSX.Element => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['70%', '20%', '70%'], []);
  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={1}
        appearsOnIndex={2}
      />
    ),
    [],
  );

  const [enteredText, setEnteredText] = useState('');
  const handleTextChange = (text: string) => {
    setEnteredText(text); // Set the entered text in GoMission
  };
  const [answerRight, setAnswerRight] = useState(false);

  const renderContent = () => (
    <View style={style.contentContainer}>
      <Image
        source={answerRight ? rightImg : wrongImg}
        style={style.missionImg}></Image>
      <View style={style.contentInnerContainer}>
        <Text style={style.noticeText}>
          {answerRight ? '🎉 맞았습니다! 🎉' : '틀렸습니다.'}
        </Text>
        <Text style={style.miniNoticeText}>
          {answerRight
            ? '마니띠와 조금 더 가까워졌나요?'
            : '다시 도전해서 맞춰보세요!'}
        </Text>
        <Text style={style.tiniNoticeText}>
          {answerRight ? '오늘 미션도 CLEAR!' : '3번의 기회를 드려요!'}
        </Text>
      </View>

      <BtnBig
        text="미션 홈으로 가기"
        onPress={() => {
          setAnswerRight(false);
          navigation.navigate('미션');
        }}
      />
    </View>
  );

  const handleExpand = () => {
    Keyboard.dismiss();
    if (bottomSheetRef.current && enteredText === '햄버거') {
      setAnswerRight(true);
      bottomSheetRef.current.expand();
    } else if (bottomSheetRef.current) {
      bottomSheetRef.current.expand();
    }
  };

  return (
    <View style={style.container}>
      <MenuTop
        menu="오늘의 미션"
        text={`오늘의 미션을 완수하고\n미션 도장을 찍어봐요!`}
      />
      <Image source={pinkEyeImg} style={style.pinkEyeImg} />
      <View style={style.innerContainer}>
        <Text style={style.titleText}>미션 소개</Text>
        <Text style={style.missionText}>좋아하는 음식 알아내기</Text>
        <Text style={style.contentText}>
          {`좋아하는 음식을 알아냈군요!\n정답을 입력해서 확인 받아볼까요?`}
        </Text>
        <InputTextwithBtn
          navigation={navigation}
          btnText="입력"
          onPress={handleExpand}
          onChange={handleTextChange}
        />
      </View>
      <Image source={yellowEyeImg} style={style.yellowEyeImg} />
      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        bottomInset={46}
        detached={true}
        index={-1}
        style={style.sheetContainer}
        backdropComponent={renderBackdrop}
        enablePanDownToClose={true}>
        {renderContent()}
      </BottomSheet>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  sheetContainer: {
    marginHorizontal: 20,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
  contentInnerContainer: {
    flex: 1,
    alignItems: 'center',
    rowGap: -20,
  },
  pinkEyeImg: {
    top: -100,
    left: '62%',
    width: 90,
    objectFit: 'scale-down',
  },
  yellowEyeImg: {
    top: -310,
    left: '7%',
    width: 70,
    objectFit: 'scale-down',
  },
  missionImg: {
    flex: 1,
    width: 200,
    objectFit: 'scale-down',
  },
  innerContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Adjust the opacity to your preference
    width: '80%',
    height: 250,
    alignSelf: 'center',
    top: -280,
    paddingLeft: 24,
    borderRadius: 25,
  },
  titleText: {
    fontFamily: GlobalStyles.home_title.fontFamily,
    fontSize: GlobalStyles.home_title.fontSize,
    color: GlobalStyles.grey_3.color,
    marginTop: 24,
  },
  missionText: {
    fontFamily: GlobalStyles.home_title.fontFamily,
    fontSize: 20,
    color: GlobalStyles.black.color,
    marginTop: -20,
  },
  contentText: {
    fontFamily: GlobalStyles.content.fontFamily,
    fontSize: 16,
    color: GlobalStyles.black.color,
    marginTop: 10,
  },
  noticeText: {
    fontFamily: GlobalStyles.section_title.fontFamily,
    fontSize: 20,
    color: GlobalStyles.green.color,
  },
  miniNoticeText: {
    fontFamily: GlobalStyles.section_title.fontFamily,
    fontSize: GlobalStyles.section_title.fontSize,
    color: GlobalStyles.grey_2.color,
  },
  tiniNoticeText: {
    fontFamily: GlobalStyles.sub_title.fontFamily,
    fontSize: GlobalStyles.section_title.fontSize,
    color: GlobalStyles.grey_2.color,
  },
});
export default GoMission;
