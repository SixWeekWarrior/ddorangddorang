import {StyleSheet, Text, View} from 'react-native';
import MenuTop from '../../molecules/menuTop';
import GlobalStyles from '../../../styles/GlobalStyles';
import BtnBig from '../../atoms/btnBig';
import InfoAtom from '../../atoms/infoAtom';
import {useRecoilState} from 'recoil';
import user from '../../../modules/user';

export const ReviseInfo = ({navigation, route}: any): JSX.Element => {
  const {destination} = route.params;
  const [userInfo, setUserInfo] = useRecoilState(user.UserInfoState);
  const campusDict: {[key: number]: string} = {
    0: '서울',
    1: '대전',
    2: '광주',
    3: '구미',
    4: '부울경',
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
      default:
        return '';
    }
  };

  const renderDestination = () => {
    switch (destination) {
      case 'InfoToday':
        return navigation.navigate('ReviseToday');
      case 'InfoSsafy':
        return navigation.navigate('ReviseSsafy');
      case 'InfoEtc':
        return navigation.navigate('ReviseEtc');
      default:
        return '';
    }
  };

  const renderContent = () => {
    switch (destination) {
      case 'InfoToday':
        return (
          <View style={[styles.flexColumn, {height: '50%', rowGap: 10}]}>
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
          <View style={[styles.flexColumn, {height: '50%', rowGap: 10}]}>
            <InfoAtom title="지역" content={campusDict[userInfo.campus]} />
            <InfoAtom
              title="전공"
              content={userInfo.isMajor ? '전공' : '비전공'}
            />
            <InfoAtom title="반" content={userInfo.classes} />
            <InfoAtom title="층" content={userInfo.floor} />
          </View>
        );
      case 'InfoEtc':
        return (
          <View style={[styles.flexColumn, {rowGap: 10}]}>
            <InfoAtom
              title="MBTI"
              content={userInfo.mbti ? userInfo.mbti : '미설정'}
            />
            <InfoAtom
              title="요즘 고민"
              content={userInfo.worry ? userInfo.worry : '미설정'}
            />
            <InfoAtom
              title="좋아하는 것"
              content={userInfo.likes ? userInfo.likes : '미설정'}
            />
            <InfoAtom
              title="싫어하는 것"
              content={userInfo.hate ? userInfo.hate : '미설정'}
            />
          </View>
        );
      default:
        return <Text>default text</Text>;
    }
  };

  const renderMenu = () => {
    switch (destination) {
      case 'InfoToday':
        return '오늘의 정보 수정';
      case 'InfoSsafy':
        return '기본 정보 수정';
      case 'InfoEtc':
        return '추가 정보 수정';
      default:
        return '';
    }
  };

  const renderMenuText = () => {
    switch (destination) {
      case 'InfoToday':
        return `오늘의 정보를 입력하고\n나를 알려요!`;
      case 'InfoSsafy':
        return `SSAFY 교육생으로서\n나의 정보를 입력해주세요.`;
      case 'InfoEtc':
        return `나의 마니띠에게 소개할 수 있는\n추가 정보를 입력해주세요.`;
      default:
        return '';
    }
  };

  return (
    <View style={styles.container}>
      <MenuTop menu={renderMenu()} text={renderMenuText()} />
      <View style={styles.innerContainer}>
        <Text style={[styles.titleFont]}>{renderTitle()}</Text>
        {renderContent()}
      </View>
      <View style={styles.btnContainer}>
        <BtnBig text="수정하기" onPress={renderDestination} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    borderWidth: 0.5,
    flex: 1,
    marginLeft: 24,
    marginRight: 24,
    marginTop: 20,
    borderStyle: 'solid',
    borderRadius: 20,
    borderColor: GlobalStyles.grey_3.color,
  },
  btnContainer: {
    flex: 1,
  },
  text: {
    color: GlobalStyles.black.color,
  },
  flexColumn: {
    flexDirection: 'column',
    flexWrap: 'wrap',
    marginLeft: 24,
    marginTop: -5,
    columnGap: 70,
  },
  titleFont: {
    fontFamily: GlobalStyles.bold.fontFamily,
    fontSize: GlobalStyles.home_title.fontSize,
    color: GlobalStyles.green.color,
    letterSpacing: -1,
    marginLeft: 15,
    marginTop: 5,
    marginBottom: 5,
  },
});
export default ReviseInfo;
