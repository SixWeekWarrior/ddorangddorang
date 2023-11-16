import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import MenuTop from '../../molecules/menuTop';
import GlobalStyles from '../../../styles/GlobalStyles';
import greenArrowRightImg from '../../../assets/greenArrowRightImg.png';
import BottomSheet, {BottomSheetBackdrop} from '@gorhom/bottom-sheet';
import {useCallback, useRef, useMemo, useEffect, useState} from 'react';
import userImg from '../../../assets/userImg.png';
import {useIsFocused} from '@react-navigation/native';
import {guessApi} from '../../../apis';
import {GuessInfo} from '../../../types/user';
import GuessRow from '../../atoms/guessRow';

const MatchStatus = ({navigation, route}: any): JSX.Element => {
  const showNotice = route.params ? route.params.showNotice : false;
  const manitoName = route.params ? route.params.manitoName : '';
  const profilePic = route.params ? route.params.profilePic : userImg;
  const handleGuess = () => {
    navigation.navigate('MatchGuess', {showNotice});
  };
  const isFocused = useIsFocused();
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['35%', '35%', '35%'], []);
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
  const [guessAllList, setGuessAllList] = useState<GuessInfo[]>([]);

  const getGuessInfo = () => {
    try {
      guessApi.getGuessAll().then(data => {
        const guessData = data.data;
        setGuessAllList(guessData);
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getGuessInfo();
  }, [isFocused]);

  const noticeBottom = () => (
    <View style={styles.contentContainer}>
      <Image source={profilePic} style={styles.profilePic} />
      <View style={styles.textRows}>
        <View style={styles.textContainer}>
          <Text style={styles.name}>{manitoName}</Text>
          <Text style={styles.text}>님으로</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.text}>예상 마니또를 변경했어요.</Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <MenuTop
        menu="진행 현황"
        text={'매일 아침 9시 갱신됩니다.\n내 마니또가 나를 맞췄나요?'}
      />
      <View style={styles.innerContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>본인 / 친구</Text>
          <Text style={styles.title}>예상 마니또</Text>
          <Text style={styles.title}>실제 마니또</Text>
        </View>
        <View style={styles.highlightRow}>
          <GuessRow />
        </View>
        <TouchableWithoutFeedback onPress={handleGuess}>
          <View style={styles.noticeRow}>
            <Text style={styles.notice}>내 마니또 예측하기</Text>
            <Image source={greenArrowRightImg} style={styles.arrow} />
          </View>
        </TouchableWithoutFeedback>
        {/* {row()}
        {row()}
        {row()}
        {row()}
        {row()}
        {row()} */}
      </View>
      {showNotice ? (
        <BottomSheet
          ref={bottomSheetRef}
          snapPoints={snapPoints}
          index={0}
          backdropComponent={renderBackdrop}
          enablePanDownToClose={true}>
          {noticeBottom()}
        </BottomSheet>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    padding: 24,
  },
  titleContainer: {
    flexDirection: 'row',
    paddingHorizontal: '4%',
    justifyContent: 'space-between',
  },
  title: {
    fontFamily: GlobalStyles.home_title.fontFamily,
    fontSize: GlobalStyles.content.fontSize,
    color: GlobalStyles.black.color,
  },
  noticeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingHorizontal: 10,
    marginVertical: -15,
  },
  highlightRow: {
    borderColor: GlobalStyles.green.color,
    borderWidth: 0.5,
    borderRadius: 20,
  },
  profilePic: {
    width: 60,
    height: 60,
    borderRadius: 100,
    backgroundColor: GlobalStyles.grey_4.color,
  },
  arrow: {
    width: 8,
    resizeMode: 'contain',
    marginLeft: 5,
  },
  notice: {
    fontFamily: GlobalStyles.section_title.fontFamily,
    fontSize: GlobalStyles.content.fontSize,
    color: GlobalStyles.green.color,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  textRows: {
    rowGap: -20,
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
  sheetContainer: {
    marginHorizontal: 20,
  },
});

export default MatchStatus;
