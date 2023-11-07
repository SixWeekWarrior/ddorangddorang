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
import {useCallback, useRef, useMemo} from 'react';

const MatchStatus = ({navigation, route}): JSX.Element => {
  const showNotice = route.params ? route.params.showNotice : false;
  const handleGuess = () => {
    navigation.navigate('MatchGuess', {showNotice});
  };

  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['40%', '20%', '40%'], []);
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

  const noticeBottom = () => (
    <View style={styles.contentContainer}>
      <View style={styles.profilePic} />
      <View style={styles.textRows}>
        <View style={styles.textContainer}>
          <Text style={styles.name}>이효식</Text>
          <Text style={styles.text}>님으로</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.text}>예상 마니또를 변경했어요.</Text>
        </View>
      </View>
    </View>
  );

  const row = () => (
    <View style={styles.row}>
      <View style={styles.person}>
        <View style={styles.profilePic} />
        <Text style={styles.nameText}>이효식</Text>
        <Text style={styles.profileText}>전공 / 7반</Text>
      </View>
      <View style={styles.line} />
      <View style={styles.person}>
        <View style={styles.profilePic} />
        <Text style={styles.nameText}>홍재연</Text>
        <Text style={styles.profileText}>전공 / 7반</Text>
      </View>
      <View style={styles.line} />
      <View style={styles.blank}>
        <View style={styles.profilePic}>
          <Text style={styles.questionMark}>?</Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <MenuTop
        menu="진행 현황"
        text={`매일 아침 9시 갱신됩니다.\n내 마니또가 나를 맞췄나요?`}
      />
      <View style={styles.innerContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>본인 / 친구</Text>
          <Text style={styles.title}>예상 마니또</Text>
          <Text style={styles.title}>실제 마니또</Text>
        </View>
        <View style={styles.highlightRow}>{row()}</View>
        <TouchableWithoutFeedback onPress={handleGuess}>
          <View style={styles.noticeRow}>
            <Text style={styles.notice}>내 마니또 예측하기</Text>
            <Image source={greenArrowRightImg} style={styles.arrow} />
          </View>
        </TouchableWithoutFeedback>
        {row()}
        {row()}
        {row()}
        {row()}
        {row()}
        {row()}
      </View>
      {showNotice ? (
        <BottomSheet
          ref={bottomSheetRef}
          snapPoints={snapPoints}
          bottomInset={46}
          detached={true}
          index={0}
          backdropComponent={renderBackdrop}
          enablePanDownToClose={true}
          style={styles.sheetContainer}>
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
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
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
  line: {
    width: '15%',
    borderBottomWidth: 3,
    borderBottomColor: GlobalStyles.grey_2.color,
    alignSelf: 'center',
    marginHorizontal: 10,
  },
  arrow: {
    width: 8,
    resizeMode: 'contain',
    marginLeft: 5,
  },
  person: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  blank: {
    alignSelf: 'center',
  },
  questionMark: {
    fontSize: 25,
    fontFamily: GlobalStyles.home_title.fontFamily,
    color: GlobalStyles.white_2.color,
    textAlign: 'center',
  },
  profilePic: {
    width: 60,
    height: 60,
    borderRadius: 100,
    backgroundColor: GlobalStyles.grey_4.color,
  },
  nameText: {
    fontFamily: GlobalStyles.home_title.fontFamily,
    fontSize: GlobalStyles.content.fontSize,
    color: GlobalStyles.grey_1.color,
    marginBottom: -18,
    marginTop: -7,
  },
  profileText: {
    fontFamily: GlobalStyles.sub_title.fontFamily,
    fontSize: GlobalStyles.sub_title.fontSize,
    color: GlobalStyles.grey_2.color,
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
