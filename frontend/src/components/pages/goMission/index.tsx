import {StyleSheet, View, Image, Text, Pressable} from 'react-native';
import MenuTop from '../../molecules/menuTop';
import pinkEyeImg from '../../../assets/pinkEyeImg.png';
import yellowEyeImg from '../../../assets/yellowEyeImg.png';
import GlobalStyles, {height} from '../../../styles/GlobalStyles';
// import InputTextwithBtn from '../../molecules/inputTextwithBtn';
import BtnBig from '../../atoms/btnBig';
import BottomSheet, {BottomSheetBackdrop} from '@gorhom/bottom-sheet';
import {useRef, useMemo, useState, useCallback, useEffect} from 'react';
import rightImg from '../../../assets/missionRightImg.png';
import wrongImg from '../../../assets/missionWrongImg.png';
import {MissionInfo} from '../../../types/mission';
import {missionApi} from '../../../apis';

export const GoMission = ({navigation}: {navigation: any}): JSX.Element => {
  const [todayMission, setTodayMission] = useState<MissionInfo>({
    missionId: 0,
    title: '',
    content: '',
    isComplete: false,
    missionType: 0,
  });

  const getMissionInfo = () => {
    try {
      missionApi.getMission().then(data => {
        const missionList = data.data.missionPerformsInfoRes;
        setTodayMission(missionList[missionList.length - 1]);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const postMissionComplete = () => {
    try {
      missionApi.postMissionComplete(todayMission.missionId).then(() => {
        navigation.navigate('미션');
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMissionInfo();
  }, []);

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

  const [answerRight, setAnswerRight] = useState(false);

  const renderContent = () => (
    <View style={style.contentContainer}>
      <Image
        source={answerRight ? rightImg : wrongImg}
        style={style.missionImg}
      />
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

  return (
    <View style={style.container}>
      <MenuTop
        menu="오늘의 미션"
        text={'오늘의 미션을 완수하고\n미션 도장을 찍어봐요!'}
      />
      <Image source={pinkEyeImg} style={style.pinkEyeImg} />
      <View style={style.innerContainer}>
        <Text style={style.titleText}>미션 소개</Text>
        <Text style={style.missionText}>{todayMission.title}</Text>
        <Text style={style.contentText}>
          {todayMission.content + ', 완료했나요?'}
        </Text>
      </View>
      <BtnBig text="수행완료" onPress={postMissionComplete} />
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
    top: -410,
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
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
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
