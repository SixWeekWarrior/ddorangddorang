import {View, StyleSheet, ScrollView} from 'react-native';
import GlobalStyles from '../../../styles/GlobalStyles';
import MenuTop from '../../molecules/menuTop';
import InfoBox from '../../organisms/infoBox';
import MissionList from '../../molecules/missionList';
// import {useIsFocused} from '@react-navigation/native';
// import {useEffect} from 'react';

export const Misson = ({navigation}: {navigation: any}): JSX.Element => {
  // const isFocused = useIsFocused();
  // useEffect(() => {}, [isFocused]);

  return (
    <ScrollView style={styles.container}>
      <MenuTop
        menu="미션"
        text={'오늘의 미션을 완수하고\n미션 도장을 찍어봐요!'}
      />
      <View style={styles.topContainer}>
        <InfoBox navigation={navigation} destination="MissionToday" />
      </View>
      <View style={styles.midContainer}>
        <InfoBox navigation={navigation} destination="BasicInfo" />
      </View>
      <View style={styles.bottomContainer}>
        <MissionList />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GlobalStyles.white_2.color,
  },
  topContainer: {
    flex: 1,
    marginTop: 24,
  },
  midContainer: {
    flex: 1.5,
    marginVertical: 24,
  },
  bottomContainer: {
    flex: 1,
  },
});

export default Misson;
