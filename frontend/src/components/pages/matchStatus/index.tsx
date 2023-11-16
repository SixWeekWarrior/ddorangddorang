import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import MenuTop from '../../molecules/menuTop';
import GlobalStyles from '../../../styles/GlobalStyles';
import BottomSheet, {BottomSheetBackdrop} from '@gorhom/bottom-sheet';
import {useCallback, useRef, useMemo, useEffect, useState} from 'react';
import {useIsFocused} from '@react-navigation/native';
import {guessApi} from '../../../apis';
import {GuessInfo} from '../../../types/user';
import GuessRow from '../../atoms/guessRow';

const MatchStatus = ({navigation, route}: any): JSX.Element => {
  const showNotice = route.params ? route.params.showNotice : false;
  const manitoName = route.params ? route.params.manitoName : '';
  const profileImage = route.params ? route.params.profileImage : '';

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
  const isFocused = useIsFocused();
  const [guessList, setGuessList] = useState<GuessInfo[]>([]);

  const getGuessInfo = () => {
    try {
      guessApi.getGuessAll().then(data => {
        const guessData = data.data;
        setGuessList(guessData);
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
      <Image source={{uri: profileImage}} style={styles.profilePic} />
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
        {guessList.map((item: GuessInfo, index: number) => (
          <GuessRow
            me={item.me}
            guessUser={item.guessUser}
            manito={item.manito}
            isFirst={index === 0}
            key={index}
            showNotice={showNotice}
            navigation={navigation}
          />
        ))}
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
