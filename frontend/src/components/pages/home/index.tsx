import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import GlobalStyles, {height} from '../../../styles/GlobalStyles';
import yellowEyeImg from '../../../assets/yellowEyeImg.png';
import greenEyeImg from '../../../assets/greenEyeImg.png';
import arrowRightImg from '../../../assets/whiteArrowRightImg.png';
import InfoBox from '../../organisms/infoBox';
import Modal from 'react-native-modal';
import CloseImg from '../../../assets/closeImg.png';
import {useState, useEffect} from 'react';
import {useRecoilState} from 'recoil';
import user from '../../../modules/user';
import {userApi} from '../../../apis';
import {useIsFocused} from '@react-navigation/native';

export const Home = ({navigation}: {navigation: any}): JSX.Element => {
  const [homeInfo, setHomeInfo] = useRecoilState(user.HomeInfoState);

  const isFocused = useIsFocused();

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const homeData = await userApi.getHomeInfo();
        setHomeInfo(homeData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchHomeData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocused]);

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
        <View>
          <Text
            // eslint-disable-next-line react-native/no-inline-styles
            style={{
              fontFamily: GlobalStyles.boldest.fontFamily,
              fontSize: height * 20,
              color: GlobalStyles.green.color,
              alignSelf: 'center',
            }}>
            아직 볼 수 없어요 😥
          </Text>
          <Text
            // eslint-disable-next-line react-native/no-inline-styles
            style={{
              fontFamily: GlobalStyles.nomal.fontFamily,
              fontSize: height * 14,
              justifyContent: 'center',
              textAlign: 'center',
              color: GlobalStyles.black.color,
            }}>
            {'종료 3일 전부터 확인 가능합니다.'}
          </Text>
        </View>
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
              // eslint-disable-next-line react-native/no-inline-styles
              style={{
                ...style.titleFont,
                color: GlobalStyles.yellow.color,
                marginLeft: 15,
                justifyContent: 'center',
              }}>
              {'오늘 나의 \n마니또는?'}
            </Text>
            <View>
              {homeInfo.color === null && homeInfo.mood === null ? (
                <Text style={style.bigFont}>
                  {'데이터가 아직\n입력되지 않았어요.'}
                </Text>
              ) : homeInfo.color === null ? (
                <>
                  <Text style={style.bigFont}>
                    옷 | {'데이터가 아직\n입력되지 않았어요.'}
                  </Text>
                  <Text style={style.bigFont}>기분 | {homeInfo.mood}</Text>
                </>
              ) : homeInfo.mood === null ? (
                <>
                  <Text style={style.bigFont}>옷 | {homeInfo.color}</Text>
                  <Text style={style.bigFont}>
                    기분 | {'데이터가 아직\n입력되지 않았어요.'}
                  </Text>
                </>
              ) : (
                <>
                  <Text style={style.bigFont}>옷 | {homeInfo.color}</Text>
                  <Text style={style.bigFont}>기분 | {homeInfo.mood}</Text>
                </>
              )}
            </View>
          </Pressable>
          <Image source={yellowEyeImg} style={style.topBottom} />
        </View>
        <View style={style.topMiddle} />
        <View style={style.topRight}>
          <View style={style.innerTop}>
            <Text
              // eslint-disable-next-line react-native/no-inline-styles
              style={{
                ...style.titleFont,
                color: GlobalStyles.white_1.color,
                textAlign: 'center',
              }}>
              종료까지
            </Text>
            <Text
              // eslint-disable-next-line react-native/no-inline-styles
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
              {homeInfo.dday ? homeInfo.dday : '?'}
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
            onPress={() => {
              navigation.navigate('미션');
            }}>
            <Text
              // eslint-disable-next-line react-native/no-inline-styles
              style={{
                ...style.titleFont,
                color: GlobalStyles.pink.color,
                marginLeft: 15,
              }}>
              미션 현황
            </Text>
            <Text
              // eslint-disable-next-line react-native/no-inline-styles
              style={{
                ...style.miniFont,
                fontWeight: 700,
                color: GlobalStyles.grey_2.color,
                marginTop: -15,
                marginLeft: 15,
              }}>
              {homeInfo.dayCount ? homeInfo.dayCount : '?'}일차
            </Text>
            <View style={style.alignCenter}>
              {homeInfo.isMissionDone === true ? (
                <View style={style.circle}>
                  <Text style={style.midBoldFont}>완료</Text>
                </View>
              ) : (
                <View
                  style={{
                    ...style.circle,
                    backgroundColor: GlobalStyles.grey_2.color,
                  }}>
                  <Text style={style.midBoldFont}>미완료</Text>
                </View>
              )}
            </View>
          </Pressable>

          <Pressable
            style={style.bottomBottom}
            onPress={() => {
              homeInfo.dday !== null && homeInfo.dday >= 3
                ? navigation.navigate('MatchStatus')
                : toggleModal();
            }}>
            <Text
              // eslint-disable-next-line react-native/no-inline-styles
              style={{
                ...style.midBoldFont,
                marginLeft: 15,
              }}>
              마니또 맞추기
            </Text>
            <Image
              source={arrowRightImg}
              // eslint-disable-next-line react-native/no-inline-styles
              style={{
                width: 6,
                height: 11,
                marginLeft: 8,
                objectFit: 'scale-down',
                alignSelf: 'center',
              }}
            />
          </Pressable>
        </View>
        <View style={style.bottomMiddle} />
        <Image source={greenEyeImg} style={style.bottomRight} />
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
    marginTop: height * 24,
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
    marginTop: height * 40,
    marginLeft: height * 24,
    height: height * 160,
  },

  topBottom: {
    resizeMode: 'contain',
    borderRadius: 20,
    marginLeft: height * 24,
    marginTop: height * 20,
    width: height * 145,
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
    width: height * 145,
    height: height * 213,
    marginTop: height * 20,
    marginRight: height * 24,
    resizeMode: 'contain',
  },

  bottomTop: {
    backgroundColor: GlobalStyles.white_2.color,
    flex: 4,
    marginTop: height * 20,
    marginLeft: height * 24,
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
    marginTop: height * 24,
    marginLeft: height * 24,
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
    width: height * 70,
    height: height * 70,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: height * 10,
  },
  alignCenter: {
    width: '100%',
    alignItems: 'center',
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
    marginTop: -15,
    marginLeft: 15,
  },
  numberFont: {
    fontFamily: 'NotoSansKR-Black',
    color: GlobalStyles.black.color,
    fontSize: 30,
    letterSpacing: 3,
  },
});

export default Home;
