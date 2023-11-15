import {useEffect, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import GlobalStyles, {height} from '../../../styles/GlobalStyles';
import MissionTab from '../../atoms/missionTab';
import {missionApi} from '../../../apis';
import {MissionInfo, PerformsInfo} from '../../../types/mission';

const MissionList = () => {
  const [missionList, setMissionList] = useState<MissionInfo[]>([]);
  const [performsInfo, setPerformsInfo] = useState<PerformsInfo>({
    missionPerformsInfoRes: [],
    dayCount: 0,
    missionCompleteCount: 0,
  });

  const getMissionInfo = () => {
    try {
      missionApi.getMission().then(data => {
        setPerformsInfo(data.data);
        setMissionList(data.data.missionPerformsInfoRes);
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMissionInfo();
    console.log(performsInfo);
  }, []);

  return (
    <View style={styles.listContainer}>
      <FlatList
        data={missionList}
        renderItem={({item}) => (
          <MissionTab
            day={performsInfo.dayCount + '일차'}
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
