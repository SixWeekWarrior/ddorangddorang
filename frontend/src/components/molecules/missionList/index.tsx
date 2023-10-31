import {useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import GlobalStyles from '../../../styles/GlobalStyles';
import MissionTab from '../../atoms/missionTab';

const MissionList = () => {
  const [data] = useState(
    new Array(5).fill(null).map((_, index) => ({
      id: index.toString(),
      day: `${index + 1}일차`,
      content: '인사하기',
      done: true,
    })),
  );

  const renderItem = ({item}: any) => (
    <MissionTab day={item.day} content={item.content} done={item.done} />
  );

  return (
    <View style={styles.listContainer}>
      <FlatList
        data={data}
        renderItem={renderItem}
        horizontal={true}
        keyExtractor={item => item.id}
        style={{flexGrow: 0}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    alignSelf: 'center',
    flex: 0.8,
  },
  profileContainer: {
    flexDirection: 'row',
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
