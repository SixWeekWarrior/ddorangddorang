import {View, StyleSheet, Text, FlatList} from 'react-native';
import MenuTop from '../../atoms/menuTop';
import GlobalStyles from '../../../styles/GlobalStyles';
import {useState} from 'react';

export const MyGroup = (): JSX.Element => {
  const [data, setData] = useState(
    new Array(50).fill(null).map((_, index) => ({
      id: index.toString(),
      name: '홍재연',
      detail: '전공 / 7반',
      selected: false,
    })),
  );

  const renderItem = ({item}: any) => (
    <View style={styles.profileContainer}>
      <View style={styles.profilepic}></View>
      <Text style={styles.profilename}>{item.name}</Text>
      <Text style={styles.profiledetail}>{item.detail}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <MenuTop
        menu="내 그룹 정보"
        text={`현재  그룹에서 활동하고 있는\n친구들을 볼 수 있어요!`}
      />
      <View style={styles.noticeContainer}>
        <Text style={styles.titleText}>50명과 함께하고 있어요.</Text>
        <Text style={styles.miniText}>2023년 12월 11일 종료</Text>
      </View>
      <View style={styles.listContainer}>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          // contentContainerStyle={styles.listContainer}
          numColumns={4}
          style={{flexGrow: 0}}
        />
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
  noticeContainer: {
    flex: 1,
  },
  listContainer: {
    flex: 4,
    alignSelf: 'center',
  },
  emptyContainer: {
    flex: 0.5,
  },
  profileContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 7,
  },
  profilepic: {
    width: 70,
    height: 70,
    backgroundColor: GlobalStyles.grey_4.color,
    borderRadius: 100,
  },
  profilename: {
    fontFamily: GlobalStyles.section_title.fontFamily,
    fontSize: GlobalStyles.sub_title.fontSize,
    color: GlobalStyles.grey_2.color,
  },
  profiledetail: {
    fontFamily: GlobalStyles.sub_title.fontFamily,
    fontSize: GlobalStyles.sub_title.fontSize,
    color: GlobalStyles.grey_2.color,
    marginTop: -15,
  },
  titleText: {
    fontFamily: GlobalStyles.home_title.fontFamily,
    fontSize: GlobalStyles.home_title.fontSize,
    color: GlobalStyles.grey_2.color,
    marginLeft: 30,
    marginTop: 20,
  },
  miniText: {
    fontFamily: GlobalStyles.section_title.fontFamily,
    fontSize: GlobalStyles.sub_title.fontSize,
    color: GlobalStyles.orange.color,
    marginLeft: 30,
    marginTop: -20,
  },
  numberText: {
    fontFamily: GlobalStyles.section_title.fontFamily,
    fontSize: GlobalStyles.section_title.fontSize,
    color: GlobalStyles.orange.color,
  },
});

export default MyGroup;
