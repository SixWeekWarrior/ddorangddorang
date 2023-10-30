import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import coloredArrowRightImg from '../../../assets/coloredArrowRightImg.png';
import arrowRightImg from '../../../assets/arrowRightImg.png';
import GlobalStyles from '../../../styles/GlobalStyles';

type InfoBoxProps = {
  navigation: any;
  destination: string;
};

const InnerInfo = ({navigation}: {navigation: any}): JSX.Element => {
  return (
    <View style={style.innerInfoContainer}>
      <View style={style.top}>
        <Text style={style.coloredFont}>종료까지 D-7</Text>
      </View>
      <View style={style.middle}>
        <Text style={style.bigFont}>8일차</Text>
        <Text style={style.regFont}>지금까지 6개 수행😀</Text>
      </View>
      <Pressable
        onPress={() => navigation.navigate('MyGroup')}
        style={style.bottom}>
        <Text style={[style.smFont, style.right]}>내 그룹 보러가기</Text>
        <Image source={arrowRightImg} style={style.arrowImg} />
      </Pressable>
    </View>
  );
};
const InfoBox = ({navigation, destination}: InfoBoxProps): JSX.Element => {
  const handlePress = () => {
    switch (destination) {
      case 'MissionToday':
        navigation.navigate('MissionToday');
        break;
      case 'InfoToday':
        navigation.navigate('InfoToday');
        break;
      case 'InfoSsafy':
        navigation.navigate('InfoSsafy');
        break;
      case 'InfoEtc':
        navigation.navigate('InfoEtc');
        break;
      default:
        break;
    }
  };

  const renderTitleOnDestination = () => {
    switch (destination) {
      case 'MissionToday':
        return '오늘의 미션';
      case 'BasicInfo':
        return '진행 정보'; // 다른 내용으로 변경해주세요.
      case 'myPage':
        return '다른 내용1'; // 다른 내용으로 변경해주세요.
      case 'ssafy':
        return '다른 내용2'; // 다른 내용으로 변경해주세요.
      case 'addInfo':
        return '다른 내용3'; // 다른 내용으로 변경해주세요.
      default:
        return '다른 주제';
    }
  };

  const renderContentOnDestination = () => {
    switch (destination) {
      case 'MissionToday':
        return <Text style={style.midFont}>좋아하는 음식 알아내기</Text>;
      case 'BasicInfo':
        return <InnerInfo navigation={navigation} />;
      case 'myPage':
        return <Text>다른 내용1</Text>; // Text component wraps the string
      case 'ssafy':
        return <Text>다른 내용2</Text>; // Text component wraps the string
      case 'addInfo':
        return <Text>다른 내용3</Text>; // Text component wraps the string
      default:
        return <Text>좋아하는 음식 알아내기</Text>; // Text component wraps the string
    }
  };

  const renderBackgroundColorOnDestination = () => {
    switch (destination) {
      case 'MissionToday':
        return GlobalStyles.white_2.color;
      case 'InfoToday':
        return GlobalStyles.white_2.color;
      case 'InfoSsafy':
        return GlobalStyles.pink.color;
      case 'InfoEtc':
        return GlobalStyles.green.color;
      default:
        return GlobalStyles.green.color;
    }
  };

  const renderTitleColorOnDestination = () => {
    switch (destination) {
      case 'MissionToday':
        return GlobalStyles.green.color;
      case 'InfoToday':
        return GlobalStyles.white_2.color;
      case 'InfoSsafy':
        return GlobalStyles.pink.color;
      case 'InfoEtc':
        return GlobalStyles.green.color;
      default:
        return GlobalStyles.white_2.color;
    }
  };

  return (
    <Pressable
      style={[
        style.container,
        {backgroundColor: renderBackgroundColorOnDestination()},
      ]}
      onPress={handlePress}>
      <Text style={[style.titleFont, {color: renderTitleColorOnDestination()}]}>
        {renderTitleOnDestination()}
      </Text>
      {renderContentOnDestination()}
      <Image source={coloredArrowRightImg} style={style.coloredArrowImg} />
    </Pressable>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 24,
    marginRight: 24,
    backgroundColor: GlobalStyles.white_2.color,
    borderWidth: 0.5,
    borderStyle: 'solid',
    borderRadius: 20,
    borderColor: GlobalStyles.grey_3.color,
  },
  titleFont: {
    fontFamily: GlobalStyles.home_title.fontFamily,
    fontSize: GlobalStyles.home_title.fontSize,
    letterSpacing: -1,
    marginLeft: 15,
    marginTop: 10,
    marginBottom: 5,
  },
  midFont: {
    color: GlobalStyles.grey_2.color,
    fontFamily: 'NotoSansKR-Medium',
    fontSize: GlobalStyles.home_title.fontSize,
    letterSpacing: -1,
    marginLeft: 15,
    marginTop: -10,
  },
  arrowImg: {
    marginLeft: 10,
    marginRight: 30,
  },
  coloredArrowImg: {
    position: 'absolute',
    right: 20,
    top: 20,
  },
  innerInfoContainer: {
    flex: 1,
    marginLeft: 24,
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
  coloredFont: {
    fontFamily: GlobalStyles.section_title.fontFamily,
    fontSize: 16,
    color: GlobalStyles.yellow.color,
    letterSpacing: -1,
  },
  bigFont: {
    fontFamily: GlobalStyles.home_title.fontFamily,
    fontSize: 25,
    color: GlobalStyles.white_2.color,
    marginTop: -20,
  },
  regFont: {
    fontSize: GlobalStyles.section_title.fontSize,
    color: GlobalStyles.white_2.color,
  },
  smFont: {
    fontSize: GlobalStyles.section_title.fontSize,
    color: GlobalStyles.white_2.color,
    letterSpacing: -1,
  },
});
export default InfoBox;
