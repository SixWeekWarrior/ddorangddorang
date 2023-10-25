import React from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import GlobalStyles from '../../../styles/GlobalStyles';
import yellowEyeImg from '../../../assets/yellowEyeImg.png';
import greenEyeImg from '../../../assets/greenEyeImg.png';
import arrowRightImg from '../../../assets/arrowRightImg.png';

export const Home = ({navigation}): JSX.Element => {
  return (
    <View style={style.container}>
      {/* <Button
        title="go to mypage"
        onPress={() => {
          console.log('go to mypage');
          navigation.navigate('MyPage');
        }}
      /> */}
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
              }}>{`오늘 나의 \n마니또는?`}</Text>
            <Text style={style.miniFont}>입은 옷 색깔</Text>
            <Text style={style.bigFont}>빨간색</Text>
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
                marginTop: 16,
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
            <Text style={{...style.numberFont, color: GlobalStyles.blue.color}}>
              7
            </Text>
          </View>
        </View>
      </View>

      <Pressable
        style={style.containerMid}
        onPress={() => {
          navigation.navigate('미션');
        }}>
        <Text
          style={{
            ...style.titleFont,
            color: GlobalStyles.green.color,
            marginLeft: 15,
            marginTop: 10,
            marginBottom: 5,
          }}>
          오늘의 미션
        </Text>
        <Text style={style.midFont}>좋아하는 음식 알아내기</Text>
      </Pressable>

      <View style={style.containerBottom}>
        <View style={style.bottomLeft}>
          <Pressable
            style={style.bottomTop}
            onPress={() => {
              navigation.navigate('미션');
            }}>
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
              1일차
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
              console.log('내 그룹 보기 페이지 이동');
            }}>
            <Text
              style={{
                ...style.midBoldFont,
                marginLeft: 15,
                marginTop: -2,
              }}>
              내 그룹 보기
            </Text>
            <Image source={arrowRightImg} style={{marginTop: 12}} />
          </Pressable>
        </View>
        <View style={style.bottomMiddle}></View>
        <Image source={greenEyeImg} style={style.bottomRight}></Image>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    backgroundColor: GlobalStyles.white_2.color,
    flex: 1,
    color: GlobalStyles.white_1.color,
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
    backgroundColor: GlobalStyles.white_2.color,
    borderWidth: 0.5,
    borderStyle: 'solid',
    borderRadius: 20,
    borderColor: GlobalStyles.grey_3.color,
    flex: 0.4,
    marginLeft: 24,
    marginRight: 24,
  },

  topLeft: {
    flex: 1.1,
  },
  topTop: {
    backgroundColor: GlobalStyles.pink.color,
    borderRadius: 20,
    marginTop: 24,
    marginLeft: 24,
  },

  topBottom: {
    flex: 1,
    borderRadius: 20,
    marginTop: 24,
    marginBottom: 24,
    marginLeft: 24,
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
  },
  innerTop: {
    flex: 1,
    backgroundColor: GlobalStyles.blue.color,
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
  },
  innerBottom: {
    flex: 1.2,
    backgroundColor: GlobalStyles.white_1.color,
    borderBottomEndRadius: 20,
    borderBottomStartRadius: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomLeft: {
    flex: 1.1,
  },
  bottomMiddle: {
    flex: 0.3,
  },
  bottomRight: {
    flex: 1,
    borderRadius: 20,
    height: 230,
    marginTop: 24,
    marginRight: 24,
    marginBottom: 24,
  },

  bottomTop: {
    backgroundColor: GlobalStyles.white_2.color,
    flex: 4,
    marginTop: 24,
    marginLeft: 24,
    borderWidth: 0.5,
    borderStyle: 'solid',
    borderRadius: 20,
    borderColor: GlobalStyles.grey_3.color,
  },

  bottomBottom: {
    backgroundColor: GlobalStyles.grey_1.color,
    flexDirection: 'row',
    flex: 1,
    borderRadius: 20,
    marginTop: 24,
    marginLeft: 24,
    marginBottom: 60,
    justifyContent: 'space-between',
    paddingRight: 15,
  },
  circle: {
    backgroundColor: GlobalStyles.orange.color,
    width: 70,
    height: 70,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 35,
  },
  titleFont: {
    fontFamily: GlobalStyles.home_title.fontFamily,
    fontSize: GlobalStyles.home_title.fontSize,
    letterSpacing: -1,
  },
  miniFont: {
    fontFamily: 'NotoSansKR-Black',
    fontSize: 10,
    color: GlobalStyles.grey_4.color,
    marginLeft: 15,
    marginTop: 10,
  },
  tiniFont: {
    fontFamily: 'NotoSansKR-Light',
    fontSize: 9,
    color: GlobalStyles.white_2.color,
  },
  midFont: {
    fontFamily: 'NotoSansKR-Medium',
    letterSpacing: -1,
    marginLeft: 15,
    marginTop: -20,
  },
  midBoldFont: {
    fontFamily: 'NotoSansKR-Bold',
    color: GlobalStyles.white_2.color,
  },
  bigFont: {
    fontFamily: 'NotoSansKR-Bold',
    fontSize: 23,
    color: GlobalStyles.white_2.color,
    marginTop: -25,
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
