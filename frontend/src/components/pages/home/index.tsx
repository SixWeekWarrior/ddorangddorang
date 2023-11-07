import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import GlobalStyles, {height, width} from '../../../styles/GlobalStyles';
import yellowEyeImg from '../../../assets/yellowEyeImg.png';
import greenEyeImg from '../../../assets/greenEyeImg.png';
import arrowRightImg from '../../../assets/whiteArrowRightImg.png';
import InfoBox from '../../organisms/infoBox';
import Modal from 'react-native-modal';
import CloseImg from '../../../assets/closeImg.png';
import {useState} from 'react';

export const Home = ({navigation}: {navigation: any}): JSX.Element => {
  const [isModalVisible, setModalVisible] = useState(false);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const modal = () => (
    <Modal isVisible={isModalVisible} onBackdropPress={toggleModal}>
      <View style={style.modalInnerContainer}>
        <TouchableWithoutFeedback onPress={toggleModal}>
          <Image source={CloseImg} style={style.closeImg} />
        </TouchableWithoutFeedback>
        <Text
          style={{
            ...style.titleFont,
            color: GlobalStyles.green.color,
            alignSelf: 'center',
          }}>
          아직 볼 수 없어요 😥
        </Text>
        <Text
          style={{
            ...style.midFont,
            alignSelf: 'center',
          }}>
          진행 현황은 3일 전부터 확인 가능합니다.
        </Text>
      </View>
    </Modal>
  );

  return (
    <ScrollView style={style.container}>
      <View style={style.containerTop}>
        <View style={style.topLeft}>
          <Pressable
            onPress={() => {
              navigation.navigate('정보');
            }}
            style={style.topTop}>
            <Text
              style={{
                ...style.titleFont,
                color: GlobalStyles.yellow.color,
                marginLeft: 15,
                justifyContent: 'center',
              }}>{`오늘 나의 \n마니또는?`}</Text>
            {/* <Text style={style.miniFont}>입은 옷</Text> */}
            <Text style={style.bigFont}>옷 | 빨간색</Text>
            {/* <Text style={style.miniFont}>기분</Text> */}
            <Text style={style.bigFont}>기분 | 약간 흐림</Text>
          </Pressable>
          <Image source={yellowEyeImg} style={style.topBottom}></Image>
        </View>
        <View style={style.topMiddle}></View>
        <View style={style.topRight}>
          <View style={style.innerTop}>
            <Text
              style={{
                ...style.titleFont,
                color: GlobalStyles.white_1.color,
                textAlign: 'center',
              }}>
              종료까지
            </Text>
            <Text
              style={{...style.tiniFont, marginTop: -17, textAlign: 'center'}}>
              종료일까지 많은 미션을 해봐요!
            </Text>
          </View>
          <View style={style.innerBottom}>
            <Text style={{...style.numberFont}}>D-</Text>
            <Text
              style={{
                ...style.numberFont,
                color: GlobalStyles.blue.color,
              }}>
              7
            </Text>
          </View>
        </View>
      </View>

      <View style={style.containerMid}>
        <InfoBox navigation={navigation} destination="MissionToday" />
      </View>

      <View style={style.containerBottom}>
        <View>
          <Pressable
            style={style.bottomTop}
            onPress={toggleModal}
            //   () => {
            //   navigation.navigate('미션');
            // }
            // }
          >
            <Text
              style={{
                ...style.titleFont,
                color: GlobalStyles.pink.color,
                marginLeft: 15,
                marginTop: 10,
              }}>
              미션 현황
            </Text>
            <Text
              style={{
                ...style.miniFont,
                fontWeight: 700,
                color: GlobalStyles.grey_2.color,
                marginTop: -15,
                marginLeft: 15,
              }}>
              5일차
            </Text>
            <Pressable
              style={style.circle}
              onPress={() => {
                console.log('미션 완료');
              }}>
              <Text style={style.midBoldFont}>완료</Text>
            </Pressable>
          </Pressable>

          <Pressable
            style={style.bottomBottom}
            onPress={() => {
              navigation.navigate('MatchStatus');
            }}>
            <Text
              style={{
                ...style.midBoldFont,
                marginLeft: 15,
              }}>
              진행 현황 보기
            </Text>
            <Image
              source={arrowRightImg}
              style={{marginTop: 20, width: 6, height: 11}}
            />
          </Pressable>
        </View>
        <View style={style.bottomMiddle}></View>
        <Image source={greenEyeImg} style={style.bottomRight}></Image>
      </View>
      <View style={style.modalContainer}>{modal()}</View>
    </ScrollView>
  );
};

const style = StyleSheet.create({
  container: {
    backgroundColor: GlobalStyles.white_2.color,
    color: GlobalStyles.white_1.color,
    flex: 1,
  },
  containerTop: {
    backgroundColor: GlobalStyles.white_2.color,
    flexDirection: 'row',
    flex: 1,
  },

  containerBottom: {
    backgroundColor: GlobalStyles.white_2.color,
    flexDirection: 'row',
    flex: 1,
  },

  containerMid: {
    flex: 0.4,
  },
  modalContainer: {
    position: 'absolute',
  },
  modalInnerContainer: {
    backgroundColor: GlobalStyles.white_1.color,
    height: '20%',
    width: '90%',
    borderRadius: 24,
    alignSelf: 'center',
    justifyContent: 'center',
    rowGap: 20,
  },

  topLeft: {
    flex: 1.1,
  },

  topTop: {
    backgroundColor: GlobalStyles.pink.color,
    borderRadius: 20,
    justifyContent: 'center',
    marginTop: height * 35,
    marginLeft: width * 24,
    height: height * 160,
  },

  topBottom: {
    resizeMode: 'contain',
    borderRadius: 20,
    marginLeft: width * 24,
    marginTop: width * 20,
    width: width * 145,
    height: height * 53,
  },

  topMiddle: {
    flex: 0.3,
  },
  topRight: {
    flex: 1,
    marginTop: 70,
    marginLeft: 20,
    marginRight: 24,
    marginBottom: 50,
    height: height * 170,
  },
  innerTop: {
    flex: 1,
    backgroundColor: GlobalStyles.blue.color,
    borderTopStartRadius: 24,
    borderTopEndRadius: 24,
    justifyContent: 'center',
  },
  innerBottom: {
    flex: 1.2,
    backgroundColor: GlobalStyles.white_1.color,
    borderBottomEndRadius: 24,
    borderBottomStartRadius: 24,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  bottomMiddle: {
    flex: 0.3,
  },

  bottomRight: {
    flex: 1,
    borderRadius: 24,
    width: width * 145,
    height: width * 213,
    marginTop: width * 20,
    marginRight: width * 24,
    marginBottom: width * 24,
  },

  bottomTop: {
    backgroundColor: GlobalStyles.white_2.color,
    flex: 4,
    marginTop: width * 20,
    marginLeft: width * 24,
    borderWidth: 0.5,
    borderStyle: 'solid',
    borderRadius: 24,
    borderColor: GlobalStyles.grey_3.color,
    height: height * 160,
  },

  bottomBottom: {
    backgroundColor: GlobalStyles.grey_1.color,
    flexDirection: 'row',
    flex: 1,
    borderRadius: 24,
    marginTop: width * 24,
    marginLeft: width * 24,
    marginBottom: width * 24,
    justifyContent: 'space-between',
    paddingRight: 15,
  },
  closeImg: {
    position: 'absolute',
    width: 15,
    objectFit: 'scale-down',
    top: 0,
    right: 24,
  },
  circle: {
    backgroundColor: GlobalStyles.orange.color,
    width: width * 70,
    height: width * 70,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: width * 28,
    marginTop: width * 2,
  },
  titleFont: {
    fontFamily: GlobalStyles.home_title.fontFamily,
    fontSize: 20,
    letterSpacing: -1,
  },
  miniFont: {
    fontFamily: GlobalStyles.section_title.fontFamily,
    fontSize: 13,
    color: GlobalStyles.grey_4.color,
    marginLeft: 15,
    marginTop: -15,
  },
  tiniFont: {
    fontFamily: GlobalStyles.sub_title.fontFamily,
    fontSize: 9,
    color: GlobalStyles.white_2.color,
  },

  midBoldFont: {
    fontFamily: 'NotoSansKR-Bold',
    color: GlobalStyles.white_2.color,
    verticalAlign: 'middle',
    fontSize: 16,
  },
  bigFont: {
    fontFamily: 'NotoSansKR-Bold',
    fontSize: 12,
    color: GlobalStyles.white_2.color,
    marginTop: -20,
    marginLeft: 15,
  },
  numberFont: {
    fontFamily: 'NotoSansKR-Black',
    color: GlobalStyles.black.color,
    fontSize: 30,
    letterSpacing: 5,
  },
});

export default Home;
