import {StyleSheet} from 'react-native';
import {Dimensions} from 'react-native';

export default StyleSheet.create({
  pink: {
    color: '#FE91FE',
  },
  blue: {
    color: '#00A8FF',
  },
  black: {
    color: '#0B0505',
  },
  white_1: {
    color: '#ECECEC',
  },
  grey_2: {
    color: '#626262',
  },
  grey_1: {
    color: '#333232',
  },
  yellow: {
    color: '#FFD31A',
  },
  grey_3: {
    color: '#A8A8A8',
  },
  white_2: {
    color: '#FFFFFF',
  },
  grey_4: {
    color: '#DDDDDD',
  },
  green: {
    color: '#31B57B',
  },
  orange: {
    color: '#FE802A',
  },
  home_title: {
    fontFamily: 'NotoSansKR-Black',
    fontSize: 18,
  },
  sub_title: {
    fontFamily: 'NotoSansKR-Light',
    fontSize: 12,
  },
  section_title: {
    fontFamily: 'NotoSansKR-Bold',
    fontSize: 18,
  },
  content: {
    fontFamily: 'NotoSansKR',
    fontSize: 14,
  },
  btn: {
    fontFamily: 'NotoSansKR-Bold',
    fontSize: 16,
  },

  boldest: {
    fontFamily: 'NotoSansKR-Black',
  },

  bold: {
    fontFamily: 'NotoSansKR-Bold',
  },

  nomal: {
    fontFamily: 'NotoSansKR',
  },

  light: {
    fontFamily: 'NotoSansKR-Light',
  },
});

const basicDimensions = {
  // 디자이너가 작업하고 있는 스크린의 세로,가로
  height: 812,
  width: 375,
};

export const height = // 높이 변환 작업
  parseFloat(
    (Dimensions.get('screen').height * (1 / basicDimensions.height)).toFixed(2),
  );

export const width = // 가로 변환 작업
  parseFloat(
    (Dimensions.get('screen').width * (1 / basicDimensions.width)).toFixed(2),
  );
