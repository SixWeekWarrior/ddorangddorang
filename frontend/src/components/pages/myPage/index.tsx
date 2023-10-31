import {View, StyleSheet} from 'react-native';
import MenuTop from '../../atoms/menuTop';
import GlobalStyles from '../../../styles/GlobalStyles';
import InfoBox from '../../organisms/infoBox';

export const MyPage = ({navigation}: {navigation: any}): JSX.Element => {
  return (
    <View style={styles.container}>
      <MenuTop
        menu="마이페이지"
        text={`오늘의 기분과 옷 색깔을 설정하고, \n추가정보를 입력해보세요!`}
      />
      <View style={styles.topContainer}>
        <InfoBox navigation={navigation} destination="InfoToday" />
      </View>
      <View style={styles.midContainer}>
        <InfoBox navigation={navigation} destination="InfoSsafy" />
      </View>
      <View style={styles.bottomContainer}>
        <InfoBox navigation={navigation} destination="InfoEtc" />
      </View>
      <View style={styles.emptyContainer}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GlobalStyles.white_2.color,
  },
  topContainer: {
    flex: 0.5,
    marginVertical: 20,
  },
  midContainer: {
    flex: 0.5,
  },
  bottomContainer: {
    flex: 0.7,
    marginVertical: 20,
  },
  emptyContainer: {
    flex: 0.3,
  },
});

export default MyPage;
