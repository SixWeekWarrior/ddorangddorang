import {View, StyleSheet, Text, Image, ScrollView} from 'react-native';
import GlobalStyles, {height, width} from '../../../styles/GlobalStyles';
import MenuTop from '../../molecules/menuTop';
import GroupSummary from '../../atoms/groupSummary';
import BtnReg from '../../atoms/btnReg';
import CodeForm from '../../atoms/codeForm';
import {LogBox} from 'react-native';
import BottomSheet, {BottomSheetBackdrop} from '@gorhom/bottom-sheet';
import {useCallback, useRef, useMemo} from 'react';
import congratsImg from '../../../assets/congratsImg.png';

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);
type BeforeStartRouteProp = {
  params: {
    sliderValue: number;
    multiSliderValue: number[];
    selectedCount: number;
  };
};

type BeforeStartNavigationProp = {
  navigate: (screen: string, params?: object) => void;
};

type BeforeStartProps = {
  route: BeforeStartRouteProp;
  navigation: BeforeStartNavigationProp;
};

export const BeforeStart = ({navigation, route}: BeforeStartProps) => {
  const {sliderValue, multiSliderValue, selectedCount} = route.params;
  const isStartButtonDisabled = !(
    selectedCount >= multiSliderValue[0] && selectedCount <= multiSliderValue[1]
  );
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['40%', '40%', '40%'], []);
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

  const congrats = () => (
    <View style={styles.contentContainer}>
      <Text style={styles.textSm}>아래의 초대코드를 복사해서</Text>
      <Text style={styles.textSm}>친구들에게 공유해보세요 🥳</Text>
      <CodeForm code="WUJtQT09" />
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <MenuTop
        menu="그룹 정보"
        text={`방장님께서 생성한 그룹정보입니다.\n어서 친구들을 초대해보세요!`}
      />
      <View style={styles.sumContainer}>
        <GroupSummary
          period={sliderValue}
          min={multiSliderValue[0]}
          max={multiSliderValue[1]}
          selectedCount={selectedCount}
        />
        <Text style={styles.code}>초대코드</Text>
        <CodeForm code="WUJtQT09" />
      </View>
      <View style={styles.btnContainer}>
        <BtnReg
          onPress={() => {
            navigation.navigate('WaitList', {
              sliderValue: sliderValue,
              multiSliderValue: multiSliderValue,
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
          disabled={isStartButtonDisabled}
        />
      </View>
      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        index={0}
        backdropComponent={renderBackdrop}
        enablePanDownToClose={true}>
        {congrats()}
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
