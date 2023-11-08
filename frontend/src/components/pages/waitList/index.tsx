import {View, StyleSheet, Text, Pressable, FlatList} from 'react-native';
import MenuTop from '../../molecules/menuTop';
import GlobalStyles, {height} from '../../../styles/GlobalStyles';
import BtnBig from '../../atoms/btnBig';
import {useState} from 'react';

export const WaitList = ({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}): JSX.Element => {
  const {minMember, maxMember, selectedCount, setSelectedCount} = route.params;
  const [isAllChecked, setisAllChecked] = useState<boolean>(false);

  const [data, setData] = useState(
    new Array(50).fill(null).map((_, index) => ({
      id: index.toString(),
      name: '홍재연',
      detail: '전공 / 7반',
      selected: false,
    })),
  );

  // 전체 선택 함수
  const selectAll = () => {
    const newData = data.map(item => {
      item.selected = true;
      return item;
    });
    setisAllChecked(pre => !pre);
    setSelectedCount(newData.length);
    setData(newData);
  };

  // 전체 선택 해제 함수
  const unselectAll = () => {
    const newData = data.map(item => {
      item.selected = false;
      return item;
    });
    setisAllChecked(pre => !pre);
    setSelectedCount(0);
    setData(newData);
  };

  const onApprove = () => {
    if (selectedCount < minMember) {
      alert(`최소 선택인원은 ${minMember}명입니다.`);
    } else if (selectedCount > maxMember) {
      alert(`최대 선택인원 ${maxMember}명을 초과하였습니다.`);
    } else {
      navigation.navigate('BeforeStart');
    }
  };

  const toggleSelect = (id: string) => {
    const newData = data.map(item => {
      if (item.id === id) {
        item.selected = !item.selected;
      }
      return item;
    });

    const newlySelectedCount = newData.filter(item => item.selected).length;
    setSelectedCount(newlySelectedCount);
    setData(newData);
  };

  const renderItem = ({item}: any) => (
    <View style={styles.profileContainer}>
      <Pressable
        style={[styles.profilepic, item.selected && styles.selectedProfile]}
        onPress={() => toggleSelect(item.id)}
      />
      <Text style={styles.profilename}>{item.name}</Text>
      <Text style={styles.profiledetail}>{item.detail}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <MenuTop
        menu="대기목록"
        text={`대기 중인 친구입니다.\n승인할 찬구를 추가하세요.`}
      />
      <View style={styles.firstView}>
        <Text style={styles.titleText}>50명이 대기중입니다.</Text>
        <Text style={styles.miniText}>
          최소 <Text style={styles.numberText}>{minMember}</Text>명 최대{' '}
          <Text style={styles.numberText}>{maxMember}</Text>명을 선택해주세요
        </Text>
      </View>
      <View style={styles.secondView}>
        <Pressable onPress={isAllChecked ? selectAll : unselectAll}>
          <Text style={styles.selectText}>
            {isAllChecked ? '전체 선택' : '전체 선택 해제'}
          </Text>
        </Pressable>
        <Text style={styles.selectText}>선택 인원 : {selectedCount}명</Text>
      </View>
      <View style={styles.thirdView}>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          numColumns={4}
        />
      </View>
      <BtnBig onPress={onApprove} text="승인하기" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GlobalStyles.white_2.color,
  },

  listContainer: {
    flex: 4,
    alignSelf: 'center',
  },
  btnContainer: {
    flex: 2,
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
  selectedProfile: {
    borderColor: GlobalStyles.orange.color,
    borderWidth: 3,
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
    fontSize: height * 16,
    color: GlobalStyles.grey_2.color,
    marginLeft: 30,
    marginTop: 20,
  },
  selectedText: {
    fontFamily: GlobalStyles.home_title.fontFamily,
    fontSize: GlobalStyles.home_title.fontSize,
    color: GlobalStyles.grey_2.color,
    alignSelf: 'flex-end',
    marginRight: 40,
    marginTop: 20,
  },
  miniText: {
    fontFamily: GlobalStyles.sub_title.fontFamily,
    fontSize: height * 12,
    color: GlobalStyles.orange.color,
    marginLeft: 30,
    marginTop: -20,
  },
  numberText: {
    fontFamily: GlobalStyles.section_title.fontFamily,
    fontSize: height * 15,
    color: GlobalStyles.orange.color,
  },
  selectText: {
    fontFamily: GlobalStyles.section_title.fontFamily,
    color: GlobalStyles.blue.color,
    fontSize: height * 13,
  },
  selectBtn: {
    width: 100,
    height: 100,
    color: GlobalStyles.blue.color,
  },

  firstView: {
    flex: 0.2,
  },

  secondView: {
    flex: 0.1,
    width: '80%',
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },

  thirdView: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default WaitList;
