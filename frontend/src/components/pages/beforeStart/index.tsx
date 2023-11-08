import {View, StyleSheet, Text, ScrollView} from 'react-native';
import GlobalStyles, {height} from '../../../styles/GlobalStyles';
import MenuTop from '../../molecules/menuTop';
import GroupSummary from '../../atoms/groupSummary';
import BtnReg from '../../atoms/btnReg';
import CodeForm from '../../atoms/codeForm';
import BottomSheet, {BottomSheetBackdrop} from '@gorhom/bottom-sheet';
import {useCallback, useRef, useMemo, useState, useEffect} from 'react';
import {roomApi} from '../../../apis';

export const BeforeStart = ({navigation}: {navigation: any}) => {
  type RoomInfo = {
    duration: number;
    minMember: number;
    maxMember: number;
    roomKey: number;
  };
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [selectedCount, setSelectedCount] = useState<number>(0);
  const [isbtnActive, setIsBtnActive] = useState<boolean>(false);
  const snapPoints = useMemo(() => ['40%', '40%', '40%'], []);
  const [roomInfo, setRoomInfo] = useState<RoomInfo>({
    duration: 0,
    minMember: 0,
    maxMember: 0,
    roomKey: 0,
  });

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={1}
        appearsOnIndex={2}
      />
    ),
    [],
  );

  useEffect(() => {
    roomApi
      .getRoomInfo()
      .then(data => {
        console.log('여기 테스트!!!', data);
        setRoomInfo({
          ...roomInfo,
          duration: data.duration,
          minMember: data.minMember,
          maxMember: data.maxMember,
          roomKey: data.roomKey,
        });
      })
      .catch(error => {
        console.log('error', error);
      });
  }, []);

  useEffect(() => {
    setIsBtnActive(
      roomInfo.minMember <= selectedCount &&
        selectedCount <= roomInfo.maxMember,
    );
  }, [roomInfo.maxMember, roomInfo.minMember, selectedCount]);

  return (
    <ScrollView style={styles.container}>
      <MenuTop
        menu="그룹 정보"
        text={`어서 친구들을 초대하고 \n 마니또를 즐겨요!`}
      />
      <View style={styles.sumContainer}>
        <GroupSummary
          period={roomInfo.duration}
          min={roomInfo.minMember}
          max={roomInfo.maxMember}
          selectedCount={selectedCount}
        />
        <Text style={styles.code}>초대코드</Text>
        <CodeForm code={roomInfo.roomKey} />
      </View>
      <View style={styles.btnContainer}>
        <BtnReg
          onPress={() => {
            navigation.navigate('WaitList', {
              minMember: roomInfo.minMember,
              maxMember: roomInfo.maxMember,
              selectedCount: selectedCount,
              setSelectedCount: setSelectedCount,
            });
          }}
          text="대기 목록"
          color={GlobalStyles.black.color}
          disabled={false}
        />
        <BtnReg
          onPress={() => {
            navigation.navigate('NavBar');
          }}
          text="시작"
          color={GlobalStyles.green.color}
          disabled={isbtnActive}
        />
      </View>
      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        index={0}
        backdropComponent={renderBackdrop}
        enablePanDownToClose={true}>
        <View style={styles.contentContainer}>
          <Text style={styles.textSm}>아래의 초대코드를 복사해서</Text>
          <Text style={styles.textSm}>친구들에게 공유해보세요 🥳</Text>
          <CodeForm code={roomInfo.roomKey} />
        </View>
      </BottomSheet>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GlobalStyles.white_2.color,
  },
  code: {
    fontFamily: GlobalStyles.section_title.fontFamily,
    fontSize: GlobalStyles.section_title.fontSize,
    color: GlobalStyles.black.color,
    alignSelf: 'flex-start',
    marginLeft: 50,
  },

  contentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    top: 50,
  },

  congratsImg: {
    flex: 1,
    width: '70%',
    objectFit: 'scale-down',
  },
  sumContainer: {
    flex: 4,
    marginBottom: 50,
  },
  btnContainer: {
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'center',
    marginBottom: height * 40,
    justifyContent: 'space-between',
  },
  noticeContainer: {
    position: 'absolute',
    flex: 2,
    marginTop: 110,
  },
  textContainer: {
    flexDirection: 'row',
    marginTop: -25,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  name: {
    fontFamily: GlobalStyles.section_title.fontFamily,
    fontSize: 25,
    color: GlobalStyles.green.color,
    marginBottom: -6,
    marginRight: 4,
  },
  text: {
    fontFamily: GlobalStyles.section_title.fontFamily,
    fontSize: GlobalStyles.section_title.fontSize,
    color: GlobalStyles.black.color,
  },
  textBig: {
    fontFamily: GlobalStyles.section_title.fontFamily,
    fontSize: 22,
    color: GlobalStyles.black.color,
  },
  textSm: {
    fontFamily: GlobalStyles.sub_title.fontFamily,
    fontSize: height * 12,
    color: GlobalStyles.grey_3.color,
    marginTop: -20,
  },
});

export default BeforeStart;
