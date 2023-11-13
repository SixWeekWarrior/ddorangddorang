import {View, StyleSheet, Text, FlatList} from 'react-native';
import MenuTop from '../../molecules/menuTop';
import GlobalStyles from '../../../styles/GlobalStyles';
import {useEffect, useState} from 'react';
import {roomApi} from '../../../apis';

export const MyGroup = (): JSX.Element => {
  type RoomInfo = {
    duration: number;
    minMember: number;
    maxMember: number;
    roomKey: number;
    memberCount: number;
  };

  const [roomInfo, setRoomInfo] = useState<RoomInfo>({
    duration: 0,
    minMember: 0,
    maxMember: 0,
    roomKey: 0,
    memberCount: 0,
  });

  useEffect(() => {
    roomApi
      .getRoomInfo()
      .then(data => {
        setRoomInfo({
          ...roomInfo,
          duration: data.data.duration,
          minMember: data.data.minMember,
          maxMember: data.data.maxMember,
          roomKey: data.data.roomKey,
          memberCount: data.data.memberCount,
        });
      })
      .catch(error => {
        console.log('error', error);
      });
  }, []);

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
        <Text style={styles.titleText}>
          {roomInfo.memberCount}명과 함께하고 있어요.
        </Text>
        <Text style={styles.miniText}>2023년 12월 11일 종료</Text>
      </View>
      <View style={styles.listContainer}></View>
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
