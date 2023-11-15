import {useEffect, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import GlobalStyles, {height} from '../../../styles/GlobalStyles';
import MissionTab from '../../atoms/missionTab';
import {missionApi} from '../../../apis';
import {MissionInfo} from '../../../types/mission';
import {useIsFocused} from '@react-navigation/native';

const MissionList = () => {
  const [missionList, setMissionList] = useState<MissionInfo[]>([]);
  const isFocused = useIsFocused();

  const getMissionInfo = () => {
    try {
      missionApi.getMission().then(data => {
        setMissionList(data.data.missionPerformsInfoRes);
      });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getMissionInfo();
  }, [isFocused]);

  return (
    <View style={styles.listContainer}>
      <FlatList
        data={missionList}
        renderItem={({item}) => (
          <MissionTab
            day={item.dayCount + '일차'}
            content={item.title}
            done={item.isComplete}
          />
        )}
        horizontal={true}
        keyExtractor={item => item.missionId.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    paddingHorizontal: height * 24,
  },
  text: {
    color: GlobalStyles.black.color,
    fontSize: 30,
    fontWeight: 'bold',
  },
  midBoldFont: {
    fontFamily: 'NotoSansKR-Bold',
    color: GlobalStyles.white_2.color,
    verticalAlign: 'middle',
    fontSize: 16,
  },
});

export default MissionList;
