import {View, StyleSheet, Text, Pressable, FlatList} from 'react-native';
import MenuTop from '../../atoms/menuTop';
import GlobalStyles from '../../../styles/GlobalStyles';
import BtnBig from '../../atoms/btnBig';
import {useState} from 'react';

export const WaitList = ({navigation, route}): JSX.Element => {
  const {sliderValue, multiSliderValue} = route.params;
  const [selectedCount, setSelectedCount] = useState(0);
  const [selectedProfiles, setSelectedProfiles] = useState([]);

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

    setSelectedCount(newData.length);
    setData(newData);
  };

  // 전체 선택 해제 함수
  const unselectAll = () => {
    const newData = data.map(item => {
      item.selected = false;
      return item;
    });

    setSelectedCount(0);
    setData(newData);
  };

  const onApprove = () => {
    if (selectedCount < multiSliderValue[0]) {
      alert(`최소 선택인원은 ${multiSliderValue[0]}명입니다.`);
    } else if (selectedCount > multiSliderValue[1]) {
      alert(`최대 선택인원 ${multiSliderValue[1]}명을 초과하였습니다.`);
    } else {
      navigation.navigate('BeforeStart', {
        sliderValue: sliderValue,
        multiSliderValue: multiSliderValue,
        selectedCount: selectedCount,
      });
    }
  };

  const toggleSelect = id => {
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

  const renderItem = ({item}) => (
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
        text="승인 대기 중인 사용자 목록입니다. 승인할 사용자를 추가해주세요."
      />
      <View style={styles.noticeContainer}>
        <Text style={styles.titleText}>50명이 대기중입니다.</Text>
        <Text style={styles.miniText}>
          최소 <Text style={styles.numberText}>{multiSliderValue[0]}</Text>명
          최대 <Text style={styles.numberText}>{multiSliderValue[1]}</Text>명을
          선택해주세요
        </Text>
      </View>
      <View style={styles.selectContainer}>
        <Pressable onPress={selectAll}>
          <Text style={styles.selectText}>전체선택</Text>
        </Pressable>
        <Pressable onPress={unselectAll}>
          <Text style={styles.selectText}>전체선택 해제</Text>
        </Pressable>
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
      <View style={styles.btnContainer}>
        <Text style={styles.selectedText}>선택 인원 : {selectedCount}명</Text>
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
  noticeContainer: {
    flex: 1,
  },
  selectContainer: {
    width: '80%',
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
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
    fontSize: GlobalStyles.home_title.fontSize,
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
  selectText: {
    fontFamily: GlobalStyles.section_title.fontFamily,
    color: GlobalStyles.blue.color,
    fontSize: 17,
  },
  selectBtn: {
    width: 100,
    height: 100,
    color: GlobalStyles.blue.color,
  },
});

export default WaitList;
