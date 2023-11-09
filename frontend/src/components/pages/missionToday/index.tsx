import {StyleSheet, View, Image, Text} from 'react-native';
import MenuTop from '../../molecules/menuTop';
import pinkEyeImg from '../../../assets/pinkEyeImg.png';
import yellowEyeImg from '../../../assets/yellowEyeImg.png';
import GlobalStyles, {height} from '../../../styles/GlobalStyles';
import BtnBig from '../../atoms/btnBig';
import {useState, useEffect} from 'react';
import {missionApi} from '../../../apis';
import { useRecoilState } from 'recoil';
import mission from '../../../modules/mission';

const MissionToday = ({navigation}: {navigation: any}): JSX.Element => {
  const [missionInfo, setMissionInfo] = useRecoilState(mission.MissionTodayInfoState);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const missionAll = await missionApi.getMission();
        const missionData = missionAll[0]
        setMissionInfo(missionData);
      } catch (error) {
        console.error('미션 데이터 불러오기 실패', error);
      }
    };
    fetchData();
  }, []);

  return (
    <View style={style.container}>
      <MenuTop
        menu="오늘의 미션"
        text={`오늘의 미션을 완수하고\n미션 도장을 찍어봐요!`}
      />
      <Image source={pinkEyeImg} style={style.pinkEyeImg} />
      <View style={style.innerContainer}>
        <Text style={style.titleText}>미션 소개</Text>
        <View style={style.row}>
          <Text style={style.missionText}>{missionInfo.title}</Text>
          {missionInfo.isComplete ? (
            <View style={style.complete}>
              <Text style={style.miniText}>완료</Text>
            </View>
          ) : (
            ''
          )}
        </View>
        <Text style={style.contentText}>
          {missionInfo.title}
          {`,\n빠르게 친해질 수 있는 방법 중 하나이죠!\n오늘도 미션 도장을 찍어봐요!`}
        </Text>
      </View>
      <Image source={yellowEyeImg} style={style.yellowEyeImg} />
      <BtnBig
        text="수행하기"
        onPress={() => navigation.navigate('GoMission')}
        disabled={missionInfo.isComplete}
      />
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
  },
  pinkEyeImg: {
    top: -100,
    left: '62%',
    width: 90,
    objectFit: 'scale-down',
  },

  yellowEyeImg: {
    width: height * 10,
    height: height * 5,
    resizeMode: 'cover',
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
  complete: {
    backgroundColor: GlobalStyles.green.color,
    width: 47,
    height: 18,
    borderRadius: 10,
    marginLeft: 10,
    marginTop: -5,
  },
  miniText: {
    fontFamily: GlobalStyles.home_title.fontFamily,
    fontSize: 11,
    marginTop: -5,
    alignSelf: 'center',
  },
  titleText: {
    fontFamily: GlobalStyles.home_title.fontFamily,
    fontSize: GlobalStyles.home_title.fontSize,
    color: GlobalStyles.grey_3.color,
    marginTop: 24,
  },
  missionText: {
    fontFamily: GlobalStyles.home_title.fontFamily,
    fontSize: height * 16,
    color: GlobalStyles.black.color,
    marginTop: -20,
  },
  contentText: {
    fontFamily: GlobalStyles.content.fontFamily,
    fontSize: 16,
    color: GlobalStyles.black.color,
    marginTop: 10,
  },
});

export default MissionToday;
