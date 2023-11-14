import {StyleSheet, View, Text} from 'react-native';
import MenuTop from '../../molecules/menuTop';
import GlobalStyles, {height} from '../../../styles/GlobalStyles';
import BtnBig from '../../atoms/btnBig';
import {useEffect, useState} from 'react';
import {missionApi} from '../../../apis';
import {MissionInfo} from '../../../types/mission';

const MissionToday = ({navigation}: {navigation: any}): JSX.Element => {
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

  useEffect(() => {
    getMissionInfo();
  }, []);

  return (
    <View style={style.container}>
      <MenuTop
        menu="오늘의 미션"
        text={'오늘의 미션을 완수하고\n미션 도장을 찍어봐요!'}
      />
      <View style={style.innerContainer}>
        <Text style={style.titleText}>미션 소개</Text>
        <View style={style.row}>
          <Text style={style.missionText}>{todayMission.title}</Text>
          {todayMission.isComplete && (
            <View style={style.complete}>
              <Text style={style.miniText}>완료</Text>
            </View>
          )}
        </View>
        <Text style={style.contentText}>
          {todayMission.title +
            '는' +
            '\n빠르게 친해질 수 있는 방법 중 하나이죠!\n오늘도 미션 도장을 찍어봐요!'}
        </Text>
      </View>
      <BtnBig
        text="수행하기"
        onPress={() => navigation.navigate('GoMission')}
        disabled={todayMission.isComplete}
      />
    </View>
  );
};

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
    height: 300,
    alignSelf: 'center',
    justifyContent: 'center',
    paddingLeft: 24,
    borderRadius: 25,
    marginTop: height * 40,
  },

  complete: {
    backgroundColor: GlobalStyles.green.color,
    width: height * 40,
    height: height * 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
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
  },
  missionText: {
    fontFamily: GlobalStyles.home_title.fontFamily,
    fontSize: height * 18,
    color: GlobalStyles.black.color,
    marginTop: -20,
  },
  contentText: {
    fontFamily: GlobalStyles.content.fontFamily,
    fontSize: height * 13,
    color: GlobalStyles.black.color,
    marginTop: 10,
  },
});

export default MissionToday;
