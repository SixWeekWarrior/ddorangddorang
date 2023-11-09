import {View, StyleSheet, Text, Pressable} from 'react-native';
import MenuTop from '../../molecules/menuTop';
import GlobalStyles, {height} from '../../../styles/GlobalStyles';
import BtnBig from '../../atoms/btnBig';
import {useEffect, useState} from 'react';
import {roomApi} from '../../../apis';
import {UserProfile} from '../../../types/user';
import {Profile} from '../../atoms/profile';

export const WaitList = ({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}): JSX.Element => {
  const {minMember, maxMember, selectedCount, setSelectedCount} = route.params;
  const [isAllChecked, setisAllChecked] = useState<boolean>(false);
  const [selectedList, setSelectedList] = useState<number[]>([]);
  const [waitingList, setWaitingList] = useState<UserProfile[]>([]);

  useEffect(() => {
    const getRoomWaiting = () => {
      try {
        roomApi.getRoomWaiting().then(data => {
          console.log('getRoomWaiting', data.data);
          setWaitingList(data.data);
        });
      } catch (error) {
        console.log(error);
      }
    };
    getRoomWaiting();
  }, []);

  // useEffect(() => {
  //   try {
  //     isAllChecked?
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }, [isAllChecked]);

  const onApprove = () => {
    if (selectedCount < minMember) {
      alert(`최소 선택인원은 ${minMember}명입니다.`);
    } else if (selectedCount > maxMember) {
      alert(`최대 선택인원 ${maxMember}명을 초과하였습니다.`);
    } else {
      navigation.navigate('BeforeStart');
    }
  };

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
        <Pressable onPress={() => setisAllChecked(pre => !pre)}>
          <Text style={styles.selectText}>
            {isAllChecked ? '전체 선택' : '전체 선택 해제'}
          </Text>
        </Pressable>
        <Text style={styles.selectText}>선택 인원 : {selectedCount}명</Text>
      </View>
      <View style={styles.thirdView}>
        {waitingList.map((item: UserProfile) => (
          <Profile
            key={item.userId}
            name={item.name}
            generation={item.generation}
            userId={item.userId}
            classes={item.classes}
            isMajor={item.isMajor}
            isAllChecked={isAllChecked}
            profileImage={item.profileImage}
            selectedList={selectedList}
            setSelectedList={setSelectedList}
          />
        ))}
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
