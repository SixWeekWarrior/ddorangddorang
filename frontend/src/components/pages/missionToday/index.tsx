import {StyleSheet, View, Image, Text, Pressable} from 'react-native';
import Modal from 'react-native-modal';
import MenuTop from '../../molecules/menuTop';
import GlobalStyles, {height} from '../../../styles/GlobalStyles';
import BtnBig from '../../atoms/btnBig';
import {useEffect, useState} from 'react';
import {missionApi} from '../../../apis';
import {MissionInfo} from '../../../types/mission';
import missionAgainImg from '../../../assets/missionAgainImg.png';
import pinkEyeImg from '../../../assets/pinkEyeImg.png';
import yellowEyeImg from '../../../assets/yellowEyeImg.png';

const MissionToday = ({navigation}: {navigation: any}): JSX.Element => {
  const [todayMission, setTodayMission] = useState<MissionInfo>({
    missionId: 0,
    title: '',
    content: '',
    isComplete: false,
    missionType: 0,
  });
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

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

  // const changeMission = () => {
  //   try {
  //     missionApi.putMissionChange().then(data => {
  //       setMissionList(data.data.missionPerformsInfoRes);
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

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
        <View style={style.row}>
          <Text style={style.missionText}>{todayMission.title}</Text>
          {todayMission.isComplete && (
            <View style={style.complete}>
              <Text style={style.miniText}>완료</Text>
            </View>
          )}
          <Text style={style.missionText}>{todayMission?.title}</Text>
        </View>
        {!todayMission?.isComplete && (
          <Pressable style={style.rolltheDice} onPress={toggleModal}>
            <Image source={missionAgainImg} style={style.missionAgainImg} />
          </Pressable>
        )}
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
      <Image source={yellowEyeImg} style={style.yellowEyeImg} />
      <Modal isVisible={isModalVisible}>
        <View style={{flex: 1}}>
          <Text style={style.titleText}>Hello!</Text>
          <Pressable style={style.btn} onPress={toggleModal}>
            <Text style={style.titleText}>닫기</Text>
          </Pressable>
        </View>
      </Modal>
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
    marginTop: 15,
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
  missionAgainImg: {
    height: 40,
    width: 40,
    objectFit: 'scale-down',
  },
  rolltheDice: {
    position: 'absolute',
    right: height * 15,
    top: height * 15,
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
  btn: {},
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
  },
  missionText: {
    fontFamily: GlobalStyles.home_title.fontFamily,
    fontSize: height * 18,
    color: GlobalStyles.black.color,
  },
  contentText: {
    fontFamily: GlobalStyles.content.fontFamily,
    fontSize: height * 13,
    color: GlobalStyles.black.color,
  },
});

export default MissionToday;
