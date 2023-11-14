import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import greenArrowRightImg from '../../../assets/greenArrowRightImg.png';
import yellowArrowRightImg from '../../../assets/yellowArrowRightImg.png';
import whiteArrowRightImg from '../../../assets/whiteArrowRightImg.png';
import GlobalStyles, {height} from '../../../styles/GlobalStyles';
import InfoAtom from '../../atoms/infoAtom';
import token from '../../../utils/token';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {useRecoilState} from 'recoil';
import user from '../../../modules/user';
import {useEffect, useState} from 'react';
import {MissionInfo, PerformsInfo} from '../../../types/mission';
import {missionApi, roomApi} from '../../../apis';
import {RoomEndInfo} from '../../../types/room';

type InfoBoxProps = {
  navigation: any;
  destination: string;
};

const campusDict: {[key: number]: string} = {
  0: '서울',
  1: '대전',
  2: '광주',
  3: '구미',
  4: '부울경',
};

const InfoBox = ({navigation, destination}: InfoBoxProps): JSX.Element => {
  const [userInfo, setUserInfo] = useRecoilState(user.UserInfoState);
  const [missionList, setMissionList] = useState<MissionInfo[]>([]);
  const [performsInfo, setPerformsInfo] = useState<PerformsInfo>();
  const [endInfo, setEndInfo] = useState<RoomEndInfo>();

  const getMissionInfo = () => {
    try {
      missionApi.getMission().then(data => {
        setPerformsInfo(data.data);
        setMissionList(data.data.missionPerformsInfoRes);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getEndInfo = () => {
    try {
      roomApi.getRoomEnd().then(data => {
        console.log('여기?', data.data);
        setEndInfo(data.data);
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMissionInfo();
    getEndInfo();
  }, []);

  const handlePress = () => {
    switch (destination) {
      case 'MissionToday':
        navigation.navigate('MissionToday');
        break;
      case 'InfoToday':
        navigation.navigate('ReviseInfo', {destination: 'InfoToday'});
        break;
      case 'InfoSsafy':
        navigation.navigate('ReviseInfo', {destination: 'InfoSsafy'});
        break;
      case 'InfoEtc':
        navigation.navigate('ReviseInfo', {destination: 'InfoEtc'});
        break;
      case 'SendOpinion':
        navigation.navigate('SendOpinion', {destination: 'SendOpinion'});
        break;
      case 'Logout':
        (async () => {
          await token.removeToken();
          try {
            await GoogleSignin.revokeAccess();
            await GoogleSignin.signOut();
          } catch (error) {
            console.log('Error in Logout', error);
          }
          navigation.navigate('Onboarding', {destination: 'Onboarding'});
        })();

        break;
      default:
        break;
    }
  };

  const renderTitle = () => {
    switch (destination) {
      case 'MissionToday':
        return '오늘의 미션';
      case 'BasicInfo':
        return '진행 정보';
      case 'InfoToday':
        return '오늘의 정보';
      case 'InfoSsafy':
        return '기본 정보';
      case 'InfoEtc':
        return '추가 정보';
      case 'SendOpinion':
        return '의견 보내기';
      case 'Logout':
        return '로그아웃';
      default:
        return '';
    }
  };

  const renderContent = () => {
    switch (destination) {
      case 'MissionToday':
        return (
          <Text style={style.midFont}>
            {missionList[missionList.length - 1]?.title
              ? missionList[missionList.length - 1]?.title
              : '데이터가 없습니다.'}
          </Text>
        );
      case 'BasicInfo':
        return (
          <View style={style.innerInfoContainer}>
            <View style={style.top}>
              <Text style={style.coloredFont}>
                종료까지 D-{endInfo?.daysLeft}
              </Text>
            </View>
            <View style={style.middle}>
              <Text style={style.bigFont}>{performsInfo?.dayCount}일차</Text>
              <Text style={style.regFont}>
                지금까지 {performsInfo?.missionCompleteCount}개 수행 😀
              </Text>
            </View>
          </View>
        );

      case 'InfoToday':
        return (
          <View style={[style.flexColumn]}>
            <InfoAtom
              title="기분"
              content={userInfo.mood ? userInfo.mood : '미설정'}
            />
            <InfoAtom
              title="입은 옷"
              content={userInfo.color ? userInfo.color : '미설정'}
            />
          </View>
        );
      case 'InfoSsafy':
        return (
          // eslint-disable-next-line react-native/no-inline-styles
          <View style={[style.flexColumn, {height: '50%'}]}>
            <InfoAtom
              title="지역"
              content={campusDict[userInfo.campus]}
              isWhite={true}
            />
            <InfoAtom
              title="전공"
              content={userInfo.isMajor ? '전공' : '비전공'}
              isWhite={true}
            />
            <InfoAtom title="반" content={userInfo.classes} isWhite={true} />
            <InfoAtom title="층" content={userInfo.floor} isWhite={true} />
          </View>
        );
      case 'InfoEtc':
        return (
          <View style={style.flexColumn}>
            <InfoAtom title="MBTI" content={userInfo.mbti} isWhite={true} />
            <InfoAtom
              title="요즘 고민"
              content={userInfo.worry}
              isWhite={true}
            />
            <InfoAtom
              title="좋아하는 것"
              content={userInfo.likes}
              isWhite={true}
            />
            <InfoAtom
              title="싫어하는 것"
              content={userInfo.hate}
              isWhite={true}
            />
          </View>
        );
      default:
        return <></>;
    }
  };

  const renderBackgroundColor = () => {
    switch (destination) {
      case 'MissionToday':
        return GlobalStyles.white_2.color;
      case 'InfoToday':
        return GlobalStyles.white_2.color;
      case 'InfoSsafy':
        return GlobalStyles.pink.color;
      case 'InfoEtc':
        return GlobalStyles.green.color;
      case 'SendOpinion':
        return GlobalStyles.blue.color;
      case 'Logout':
        return GlobalStyles.yellow.color;
      default:
        return GlobalStyles.green.color;
    }
  };

  const renderBorderStyle = () => {
    switch (destination) {
      case 'MissionToday':
        return 0.5;
      case 'BasicInfo':
        return 0;
      case 'InfoToday':
        return 0.5;
      case 'InfoSsafy':
        return 0;
      case 'InfoEtc':
        return 0;
      case 'SendOpinion':
        return 0;
      case 'Logout':
        return 0;
      default:
        return 0.5;
    }
  };

  const renderTitleColor = () => {
    switch (destination) {
      case 'MissionToday':
        return GlobalStyles.green.color;
      case 'InfoToday':
        return GlobalStyles.green.color;
      case 'InfoSsafy':
        return GlobalStyles.yellow.color;
      case 'InfoEtc':
        return GlobalStyles.white_2.color;
      default:
        return GlobalStyles.white_2.color;
    }
  };

  const renderArrowColor = () => {
    switch (destination) {
      case 'MissionToday':
        return (
          <Image source={greenArrowRightImg} style={style.coloredArrowImg} />
        );
      case 'InfoToday':
        return (
          <Image source={greenArrowRightImg} style={style.coloredArrowImg} />
        );
      case 'InfoSsafy':
        return (
          <Image source={yellowArrowRightImg} style={style.coloredArrowImg} />
        );
      case 'InfoEtc':
        return (
          <Image source={whiteArrowRightImg} style={style.coloredArrowImg} />
        );
      case 'SendOpinion':
        return (
          <Image source={whiteArrowRightImg} style={style.coloredArrowImg} />
        );
      case 'Logout':
        return (
          <Image source={whiteArrowRightImg} style={style.coloredArrowImg} />
        );
      default:
        return;
    }
  };

  return (
    <Pressable
      style={[
        style.container,
        {backgroundColor: renderBackgroundColor()},
        {borderWidth: renderBorderStyle()},
      ]}
      onPress={handlePress}>
      {missionList[missionList.length - 1]?.isComplete ? (
        <View style={style.row}>
          <Text style={[style.titleFont, {color: renderTitleColor()}]}>
            {renderTitle()}
          </Text>
          <View style={style.complete}>
            <Text style={style.miniText}>완료</Text>
          </View>
        </View>
      ) : (
        <Text style={[style.titleFont, {color: renderTitleColor()}]}>
          {renderTitle()}
        </Text>
      )}
      {renderContent()}
      {renderArrowColor()}
    </Pressable>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: height * 24,
    marginRight: height * 24,
    backgroundColor: GlobalStyles.white_2.color,
    borderWidth: 0.5,
    borderStyle: 'solid',
    borderRadius: 20,
    borderColor: GlobalStyles.grey_3.color,
  },
  flexColumn: {
    flexDirection: 'column',
    marginLeft: height * 24,
    marginBottom: height * 24,
    columnGap: height * 1.4,
  },
  titleFont: {
    fontFamily: GlobalStyles.boldest.fontFamily,
    fontSize: height * 16,
    letterSpacing: -1,
    marginLeft: 15,
    marginTop: 5,
  },
  midFont: {
    color: GlobalStyles.grey_2.color,
    fontFamily: 'NotoSansKR-Medium',
    fontSize: height * 14,
    letterSpacing: -1,
    marginLeft: 15,
    marginTop: -10,
    marginBottom: height * 10,
  },
  arrowImg: {
    marginLeft: 10,
    marginRight: 30,
    width: 6,
    height: 11,
    marginBottom: height * 10,
  },
  coloredArrowImg: {
    position: 'absolute',
    right: 20,
    top: 20,
    width: 10,
    height: 15,
  },
  innerInfoContainer: {
    flex: 1,
    marginLeft: 24,
    marginBottom: 20,
  },
  top: {
    alignSelf: 'flex-end',
    marginRight: 30,
    flex: 1,
  },
  middle: {
    flex: 1,
  },
  bottom: {
    flex: 3,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  complete: {
    backgroundColor: GlobalStyles.green.color,
    width: height * 40,
    height: height * 20,
    borderRadius: 10,
    marginLeft: 10,
    alignItems: 'center',
    marginTop: 5,
  },
  miniText: {
    fontFamily: GlobalStyles.home_title.fontFamily,
    color: GlobalStyles.white_1.color,
    fontSize: 12,
    lineHeight: 30,
  },
  coloredFont: {
    fontFamily: GlobalStyles.section_title.fontFamily,
    fontSize: height * 14,
    color: GlobalStyles.yellow.color,
    letterSpacing: -1,
  },
  bigFont: {
    fontFamily: GlobalStyles.home_title.fontFamily,
    fontSize: height * 20,
    color: GlobalStyles.white_2.color,
    marginTop: -height * 30,
  },
  regFont: {
    fontSize: height * 14,
    color: GlobalStyles.white_2.color,
  },
  smFont: {
    fontSize: height * 12,
    color: GlobalStyles.white_2.color,
    letterSpacing: -1,
    marginBottom: height * 12,
  },
});
export default InfoBox;
