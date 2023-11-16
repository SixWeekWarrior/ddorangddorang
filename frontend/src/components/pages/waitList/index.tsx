import {View, StyleSheet, Text, Pressable, Alert} from 'react-native';
import MenuTop from '../../molecules/menuTop';
import GlobalStyles, {height} from '../../../styles/GlobalStyles';
import BtnBig from '../../atoms/btnBig';
import {useEffect, useState} from 'react';
import {roomApi} from '../../../apis';
import {UserProfile} from '../../../types/user';
import {Profile} from '../../atoms/profile';
import {tokenUtil} from '../../../utils';
import {NativeEventSource, EventSourcePolyfill} from 'event-source-polyfill';

export const WaitList = ({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}): JSX.Element => {
  const {minMember, maxMember, memberCount} = route.params;
  const [isAllChecked, setisAllChecked] = useState<boolean>(false);
  const [selectedList, setSelectedList] = useState<number[]>([]);
  const [waitingList, setWaitingList] = useState<UserProfile[]>([]);
  const EventSource = EventSourcePolyfill || NativeEventSource;
  const API_URL = 'https://k9a210.p.ssafy.io/api/v1';

  // sse 적용 코드
  const connectSSE = async () => {
    let eventSource;
    try {
      console.log('SSE - 시작');
      const token = await tokenUtil.getAccessToken();
      eventSource = new EventSource(API_URL + '/rooms/notification/subscribe', {
        headers: {
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache',
          Connection: 'keep-alive',
          'X-Accel-Buffering': 'no',
          Authorization: 'Bearer ' + token,
        },
        heartbeatTimeout: 120000,
        withCredentials: true,
      });
      eventSource.onopen = () => {
        console.log('SSE-연결 성공');
      };
      eventSource.onmessage = async event => {
        const res = await event.data;
        const waittingUser = JSON.parse(res);
        console.log('SSE - 응답', waittingUser);
        // setWaitingList(prevList => [...prevList, userData]);
      };
      eventSource.onerror = (error: any) => {
        console.log('SSE- Error', error);
      };
    } catch (error) {
      console.error('SSE - 에러', error);
    }
  };

  // const disconnectSSE = () => {
  //   if (es) {
  //     console.log('버튼 클릭 - SSE 종료');
  //     es.close();
  //   }
  // };

  // sse 적용 전 코드
  useEffect(() => {
    const getRoomWaiting = () => {
      try {
        roomApi.getRoomWaiting().then(data => {
          setWaitingList(data.data);
          // connectSSE();
        });
      } catch (error) {
        console.log(error);
      }
    };
    getRoomWaiting();
  }, []);

  useEffect(() => {
    console.log('승인에 선택된 사람 id', selectedList);
  }, [selectedList]);

  const postRoomResponse = async () => {
    try {
      const data = selectedList.map((item: number) => ({userId: item}));
      await roomApi.postRoomResponse(data);
    } catch (error) {
      console.log(error);
    }
  };

  const onApprove = async () => {
    if (selectedList.length > maxMember - memberCount) {
      Alert.alert(
        `최대 선택할 수 있는 인원 ${
          maxMember - memberCount
        }명을 초과하였습니다.`,
      );
    } else {
      await postRoomResponse();
      // disconnectSSE();
      navigation.navigate('BeforeStart');
    }
  };

  return (
    <View style={styles.container}>
      <MenuTop
        menu="대기목록"
        text={'대기 중인 친구입니다.\n승인할 친구를 추가하세요.'}
      />
      <View style={styles.firstView}>
        <Text style={styles.titleText}>
          {waitingList.length}명이 대기중입니다.
        </Text>
        <Text style={styles.miniText}>
          최소
          <Text style={styles.numberText}>
            {minMember - memberCount < 0 ? 0 : minMember - memberCount}
          </Text>
          명 최대
          <Text style={styles.numberText}>{maxMember - memberCount}</Text>명을
          선택해주세요
        </Text>
      </View>
      <View style={styles.secondView}>
        <Pressable onPress={() => setisAllChecked(pre => !pre)}>
          <Text style={styles.selectText}>
            {!isAllChecked ? '전체 선택' : '전체 선택 해제'}
          </Text>
        </Pressable>
        <Text style={styles.selectText}>
          선택 인원 : {selectedList.length}명
        </Text>
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
            toggle={false}
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
    flexDirection: 'row',
    flex: 0.5,
    paddingHorizontal: 30,
    alignItems: 'flex-start',
  },
});

export default WaitList;

function alert(arg0: string) {
  throw new Error('Function not implemented.');
}
