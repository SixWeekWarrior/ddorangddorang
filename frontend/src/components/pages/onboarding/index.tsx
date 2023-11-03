import {useEffect} from 'react';
import {View, Image, StyleSheet, TouchableOpacity, Text} from 'react-native';
import GlobalStyles from '../../../styles/GlobalStyles';
import blockImg from '../../../assets/blockImg.png';
import logoImg from '../../../assets/logoImg.png';
import BtnBig from '../../atoms/btnBig';
import googleLoginImg from '../../../assets/googleLoginImg.png';
import {useMemo, useRef, useCallback} from 'react';
import BottomSheet, {BottomSheetBackdrop} from '@gorhom/bottom-sheet';
import {JSX} from 'react/jsx-runtime';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';

export const Onboarding = ({navigation}: {navigation: any}): JSX.Element => {
  useEffect(() => {
    // Google Sign-In 초기화
    GoogleSignin.configure({
      // webClientId: WEB_CLIENT_ID,
      offlineAccess: true,
      scopes: ['profile', 'email'],
    });
  }, []);

  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['25%', '20%', '30%'], []);
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

  const handleGoogleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log('Signed in with Google:', userInfo.user);
    } catch (error: any) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // 사용자가 로그인을 취소했을 때 처리
        console.log('Google Sign-In cancelled');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('Google Sign-In is in progress');
      } else {
        console.error('Error in Google Sign-In:', error);
      }
    }
  };

  const goLogin = () => (
    <View style={styles.contentContainer}>
      <TouchableOpacity onPress={handleGoogleSignIn}>
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
        backdropComponent={renderBackdrop}
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
    // paddingBottom: 1,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
