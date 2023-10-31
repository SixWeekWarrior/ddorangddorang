import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import greenArrowRightImg from '../../../assets/greenArrowRightImg.png';
import yellowArrowRightImg from '../../../assets/yellowArrowRightImg.png';
import whiteArrowRightImg from '../../../assets/whiteArrowRightImg.png';
import GlobalStyles from '../../../styles/GlobalStyles';
import InfoAtom from '../../atoms/infoAtom';

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
        <Text style={[style.smFont]}>내 그룹 보러가기</Text>
        <Image source={whiteArrowRightImg} style={style.arrowImg} />
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

  const renderTitle = () => {
    switch (destination) {
      case 'MissionToday':
        return '오늘의 미션';
      case 'BasicInfo':
        return '진행 정보';
      case 'InfoToday':
        return '오늘의 정보';
      case 'InfoSsafy':
        return 'SSAFY 정보';
      case 'InfoEtc':
        return '추가 정보';
      default:
        return '';
    }
  };

  const renderContent = () => {
    switch (destination) {
      case 'MissionToday':
        return <Text style={style.midFont}>좋아하는 음식 알아내기</Text>;
      case 'BasicInfo':
        return <InnerInfo navigation={navigation} />;
      case 'InfoToday':
        return (
          <View style={[style.flexColumn, {height: '50%'}]}>
            <InfoAtom title="기분" content="약간 흐림" dark={true} />
            <InfoAtom title="입은 옷" content="빨간색" dark={true} />
          </View>
        );
      case 'InfoSsafy':
        return (
          <View style={[style.flexColumn, {height: '50%'}]}>
            <InfoAtom title="지역" content="서울" dark={false} />
            <InfoAtom title="전공" content="비전공" dark={false} />
            <InfoAtom title="반" content="2" dark={false} />
            <InfoAtom title="층" content="8" dark={false} />
          </View>
        );
      case 'InfoEtc':
        return (
          <View style={style.flexColumn}>
            <InfoAtom title="MBTI" content="INFJ" dark={false} />
            <InfoAtom
              title="요즘 고민"
              content="체력을 기르고 싶다!"
              dark={false}
            />
            <InfoAtom title="좋아하는 것" content="하리보 젤리" dark={false} />
            <InfoAtom title="싫어하는 것" content="차가운 음료" dark={false} />
          </View>
        );
      default:
        return <Text>좋아하는 음식 알아내기</Text>;
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
      <Text style={[style.titleFont, {color: renderTitleColor()}]}>
        {renderTitle()}
      </Text>
      {renderContent()}
      {renderArrowColor()}
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
  flexColumn: {
    flexDirection: 'column',
    flexWrap: 'wrap',
    marginLeft: 24,
    marginTop: -5,
    columnGap: 70,
  },
  titleFont: {
    fontFamily: GlobalStyles.home_title.fontFamily,
    fontSize: GlobalStyles.home_title.fontSize,
    letterSpacing: -1,
    marginLeft: 15,
    marginTop: 5,
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
    width: 6,
    height: 11,
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
