import {StyleSheet, View, Image, Text} from 'react-native';
import MenuTop from '../../molecules/menuTop';
import pinkEyeImg from '../../../assets/pinkEyeImg.png';
import yellowEyeImg from '../../../assets/yellowEyeImg.png';
import GlobalStyles, {height} from '../../../styles/GlobalStyles';
import BtnBig from '../../atoms/btnBig';
import {useEffect, useState} from 'react';
import {missionApi} from '../../../apis';
import {MissionInfo} from '../../../types/mission';

const MissionToday = ({navigation}: {navigation: any}): JSX.Element => {
  const [missionList, setMissionList] = useState<MissionInfo[]>([]);

  const getMissionInfo = () => {
    try {
      missionApi.getMission().then(data => {
        setMissionList(data.data.missionPerformsInfoRes);
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMissionInfo();
  }, []);

  return (
    <View style={style.container}>
      <MenuTop
        menu="오늘의 미션"
        text={'오늘의 미션을 완수하고\n미션 도장을 찍어봐요!'}
      />
      <Image source={pinkEyeImg} style={style.pinkEyeImg} />
      <View style={style.innerContainer}>
        <Text style={style.titleText}>미션 소개</Text>
        <View style={style.row}>
          <Text style={style.missionText}>
            {missionList[missionList.length - 1]?.title}
          </Text>
          {missionList[missionList.length - 1]?.isComplete && (
            <View style={style.complete}>
              <Text style={style.miniText}>완료</Text>
            </View>
          )}
        </View>
        <Text style={style.contentText}>
          {missionList[missionList.length - 1]?.title +
            ',\n빠르게 친해질 수 있는 방법 중 하나이죠!\n오늘도 미션 도장을 찍어봐요!'}
        </Text>
      </View>
      <BtnBig
        text="수행하기"
        onPress={() => navigation.navigate('GoMission')}
        disabled={missionList[missionList.length - 1]?.isComplete}
      />
      <Image source={yellowEyeImg} style={style.yellowEyeImg} />
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: -15,
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
    width: height * 40,
    height: height * 20,
    borderRadius: 10,
    marginLeft: 10,
    alignItems: 'center',
  },

  miniText: {
    fontFamily: GlobalStyles.home_title.fontFamily,
    color: GlobalStyles.white_1.color,
    fontSize: 12,
    lineHeight: 30,
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
  },
  contentText: {
    fontFamily: GlobalStyles.content.fontFamily,
    fontSize: 16,
    color: GlobalStyles.black.color,
  },
});

export default MissionToday;
