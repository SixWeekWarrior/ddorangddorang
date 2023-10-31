import {StyleSheet, View, Image, Text} from 'react-native';
import MenuTop from '../../atoms/menuTop';
import pinkEyeImg from '../../../assets/pinkEyeImg.png';
import yellowEyeImg from '../../../assets/yellowEyeImg.png';
import GlobalStyles from '../../../styles/GlobalStyles';
import BtnBig from '../../atoms/btnBig';

export const MissionToday = ({navigation: {navigate}}): JSX.Element => {
  return (
    <View style={style.container}>
      <MenuTop
        menu="오늘의 미션"
        text={`오늘의 미션을 완수하고\n미션 도장을 찍어봐요!`}
      />
      <Image source={pinkEyeImg} style={style.pinkEyeImg} />
      <View style={style.innerContainer}>
        <Text style={style.titleText}>미션 소개</Text>
        <Text style={style.missionText}>좋아하는 음식 알아내기</Text>
        <Text style={style.contentText}>
          {`좋아하는 음식을 알아내는 것은\n빠르게 친해질 수 있는 방법 중 하나이죠!\n오늘도 미션 도장을 찍어봐요!`}
        </Text>
      </View>
      <Image source={yellowEyeImg} style={style.yellowEyeImg} />
      <BtnBig
        text="미션 수행하기"
        onPress={() => navigate('GoMission')}></BtnBig>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  pinkEyeImg: {
    top: -100,
    left: '62%',
    width: 90,
    objectFit: 'scale-down',
  },
  yellowEyeImg: {
    top: -310,
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
});
export default MissionToday;
