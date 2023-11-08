import {StyleSheet, Text, View} from 'react-native';
import MenuTop from '../../molecules/menuTop';
import GlobalStyles from '../../../styles/GlobalStyles';
import BtnBig from '../../atoms/btnBig';
import InfoAtom from '../../atoms/infoAtom';

export const ReviseInfo = ({navigation, route}: any): JSX.Element => {
  const {destination} = route.params;

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
          <View style={[styles.flexColumn, {height: '50%', rowGap: 5}]}>
            <InfoAtom title="기분" content="약간 흐림" />
            <InfoAtom title="입은 옷" content="빨간색" />
          </View>
        );
      case 'InfoSsafy':
        return (
          <View style={[styles.flexColumn, {height: '50%', rowGap: 5}]}>
            <InfoAtom title="지역" content="서울" />
            <InfoAtom title="전공" content="비전공" />
            <InfoAtom title="반" content="2" />
            <InfoAtom title="층" content="8" />
          </View>
        );
      case 'InfoEtc':
        return (
          <View style={[styles.flexColumn, {rowGap: 5}]}>
            <InfoAtom title="MBTI" content="INFJ" />
            <InfoAtom title="요즘 고민" content="체력을 기르고 싶다!" />
            <InfoAtom title="좋아하는 것" content="하리보 젤리" />
            <InfoAtom title="싫어하는 것" content="차가운 음료" />
          </View>
        );
      default:
        return <Text>좋아하는 음식 알아내기</Text>;
    }
  };

  return (
    <View style={styles.container}>
      <MenuTop menu="추가 정보 수정" text={`내 정보를 수정해봐요.`} />
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
