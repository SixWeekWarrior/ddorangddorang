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
import BtnSm from '../../atoms/btnSm';
import closeImg from '../../../assets/closeImg.png';
import {useIsFocused} from '@react-navigation/native';

const MissionToday = ({navigation}: {navigation: any}): JSX.Element => {
  const [todayMission, setTodayMission] = useState<MissionInfo>({
    missionId: 0,
    title: '',
    content: '',
    isComplete: false,
    missionType: 0,
  });
  const [isModalVisible, setModalVisible] = useState(false);
  const isFocused = useIsFocused();
  const [changeAvailable, setChangeAvailable] = useState(true);
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

  useEffect(() => {
    getMissionInfo();
  }, [isFocused]);

  const changeMission = () => {
    try {
      missionApi.putMissionChange(todayMission.missionId).then(data => {
        console.log('성공 :', data);
        getMissionInfo();
        if (data.success) {
          setChangeAvailable(true);
          toggleModal();
        } else {
          setChangeAvailable(false);
        }
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
          <Text style={style.missionText}>{todayMission.title}</Text>
          {todayMission.isComplete && (
            <View style={style.complete}>
              <Text style={style.miniText}>완료</Text>
            </View>
          )}
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
      <Modal
        isVisible={isModalVisible}
        onBackdropPress={() => setModalVisible(false)}>
        <View style={{flex: 1, justifyContent: 'center'}}>
          <View style={style.modalContainer}>
            <Pressable style={style.close} onPress={toggleModal}>
              <Image source={closeImg} style={style.closeImg} />
            </Pressable>
            {changeAvailable ? (
              <View style={style.noticeContainer}>
                <Text
                  // eslint-disable-next-line react-native/no-inline-styles
                  style={{
                    ...style.noticeText,
                    alignSelf: 'center',
                    textAlign: 'center',
                  }}>
                  {'미션을 변경하시겠어요?\n미션 변경 기회는 최대 2회입니다.'}
                </Text>
                <View style={style.btnContainer}>
                  <BtnSm text="미션변경" onPress={changeMission} />
                </View>
              </View>
            ) : (
              <View style={style.noticeContainer}>
                <Text
                  // eslint-disable-next-line react-native/no-inline-styles
                  style={{
                    ...style.noticeText,
                    alignSelf: 'center',
                    textAlign: 'center',
                  }}>
                  {
                    '미션 변경 기회를 모두 사용하셨습니다.\n\n이번 미션은 꼭 수행해주세요!'
                  }
                </Text>
              </View>
            )}
          </View>
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
    marginTop: -15,
  },
  modalContainer: {
    backgroundColor: GlobalStyles.white_2.color,
    borderRadius: 30,
    width: '90%',
    height: 200,
    alignSelf: 'center',
    verticalAlign: 'middle',
  },
  noticeContainer: {
    height: '100%',
    justifyContent: 'center',
  },
  btnContainer: {
    marginTop: 15,
  },
  pinkEyeImg: {
    top: height * -90,
    left: '62%',
    width: 90,
    objectFit: 'scale-down',
  },
  yellowEyeImg: {
    top: height * -390,
    left: '7%',
    width: 70,
    objectFit: 'scale-down',
  },
  missionAgainImg: {
    height: 40,
    width: 40,
    objectFit: 'scale-down',
  },
  close: {
    right: height * 20,
    position: 'absolute',
  },
  closeImg: {
    width: 15,
    objectFit: 'scale-down',
  },
  rolltheDice: {
    position: 'absolute',
    right: height * 15,
    top: height * 15,
  },
  innerContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    width: '80%',
    height: height * 250,
    top: height * -280,
    alignSelf: 'center',
    paddingTop: height * 20,
    paddingLeft: 24,
    borderRadius: 25,
    marginTop: height * 45,
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
  noticeText: {
    fontFamily: GlobalStyles.content.fontFamily,
    fontSize: height * 15,
    color: GlobalStyles.black.color,
  },
});

export default MissionToday;
