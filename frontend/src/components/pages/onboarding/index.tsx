import {View, Image, StyleSheet, TouchableOpacity, Text} from 'react-native';
import GlobalStyles from '../../../styles/GlobalStyles';
import blockImg from '../../../assets/blockImg.png';
import logoImg from '../../../assets/logoImg.png';
import BtnBig from '../../atoms/btnBig';
import googleLoginImg from '../../../assets/googleLoginImg.png';
import {useMemo, useRef} from 'react';
import BottomSheet from '@gorhom/bottom-sheet';

export const Onboarding = ({navigation}: {navigation: any}): JSX.Element => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['25%'], []);

  const goLogin = () => (
    <View style={styles.contentContainer}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Enter');
        }}>
        <Image source={googleLoginImg} style={styles.googleLoginImg} />
      </TouchableOpacity>
    </View>
  );

  const handleExpand = () => {
    if (bottomSheetRef.current) {
      bottomSheetRef.current.expand();
    }
  };

  return (
    <View style={styles.container}>
      <Image source={blockImg} style={styles.blockImg} />
      <Image source={logoImg} style={styles.logoImg} />
      <Text style={styles.title}>모두가 함께하는 마니또 게임</Text>
      <Text style={styles.content}>
        싸피 최초 모바일 마니또 게임 또랑또랑에 참여해보세요!
      </Text>
      <Text style={styles.content}>
        온오프라인 미션도 수행하고, 마니또에게 쪽지도 보내면서
      </Text>
      <Text style={styles.content}>
        싸피에서의 잊지 못할 추억을 만들어봐요 :)
      </Text>
      <BtnBig text="시작하기" onPress={handleExpand} />
      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        bottomInset={46}
        detached={true}
        index={-1}
        enablePanDownToClose={true}
        style={styles.sheetContainer}>
        {goLogin()}
      </BottomSheet>
    </View>
  );
};

Onboarding.navigationOptions = {
  tabBarVisible: false,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GlobalStyles.white_2.color,
  },
  sheetContainer: {
    paddingBottom: 20,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    bord: GlobalStyles.grey_2.color,
  },
  googleLoginImg: {
    width: 220,
    height: 50,
    objectFit: 'scale-down',
  },
  blockImg: {
    width: 260,
    height: 213,
    marginTop: 120,
    alignSelf: 'center',
  },
  logoImg: {
    width: 150,
    height: 45,
    alignSelf: 'center',
    marginTop: 30,
    marginBottom: 7,
  },
  notice: {
    color: GlobalStyles.black.color,
    fontFamily: GlobalStyles.content.fontFamily,
    fontSize: 25,
    marginBottom: 50,
  },
  title: {
    color: GlobalStyles.black.color,
    fontFamily: GlobalStyles.section_title.fontFamily,
    fontSize: GlobalStyles.section_title.fontSize,
    textAlign: 'center',
  },
  content: {
    color: GlobalStyles.grey_2.color,
    fontFamily: GlobalStyles.sub_title.fontFamily,
    fontSize: GlobalStyles.sub_title.fontSize,
    textAlign: 'center',
    marginTop: -20,
  },
});

export default Onboarding;
