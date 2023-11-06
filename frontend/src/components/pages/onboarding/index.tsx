import {useEffect} from 'react';
import {View, Image, StyleSheet, TouchableOpacity, Text} from 'react-native';
import GlobalStyles from '../../../styles/GlobalStyles';
import blockImg from '../../../assets/blockImg.png';
import logoImg from '../../../assets/logoImg.png';
import TitleAtom from '../../atoms/titleAtom';
import googleLoginImg from '../../../assets/googleLoginImg.png';
import {useMemo, useRef, useCallback} from 'react';
import BottomSheet, {BottomSheetBackdrop} from '@gorhom/bottom-sheet';
import {JSX} from 'react/jsx-runtime';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import BtnBig from '../../atoms/btnBig';
import {userApi} from '../../../apis';

export const Onboarding = ({navigation}: {navigation: any}): JSX.Element => {
  useEffect(() => {
    // Google Sign-In 초기화
    GoogleSignin.configure({
      webClientId:
        // TODO: change to env variable
        '705461399403-b63tooulpovabf2p7f1dljgemr84pj2p.apps.googleusercontent.com',
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

      console.log(userInfo.idToken);
      if (userInfo.idToken) {
        userApi
          .postLogin(userInfo.idToken)
          .then(data => {
            console.log(data);
            if (data.success) {
              navigation.navigate('Enter');
            } else {
              navigation.navigate('BasicInfo');
            }
          })
          .catch(e => {
            console.log(e);
          });
      }
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
      <View style={styles.titleContainer}>
        <TitleAtom
          menu={'로그인'}
          text={'로그인하고 지금 바로 또랑또랑을 시작해보세요!'}
          menuColor={GlobalStyles.green.color}
          textColor={GlobalStyles.grey_3.color}
        />
      </View>
      <View style={styles.loginContainer}>
        <TouchableOpacity
          // onPress={() => {
          //   navigation.navigate('AdditionalInfo'); // 이 줄 삭제하시고 여기에 로그인 로직 추가하시면 됩니다.
          // }}
          onPress={handleGoogleSignIn}>
          <Image source={googleLoginImg} style={styles.googleLoginImg} />
        </TouchableOpacity>
      </View>
      <View style={styles.signupContainer}>
        <Text style={styles.text}>회원이 아니신가요?</Text>
        <Text style={styles.menu}>회원가입</Text>
      </View>
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
        enablePanDownToClose={true}>
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
  },
  contentContainer: {
    flex: 1,
    marginLeft: '10%',
  },
  titleContainer: {
    flex: 1,
    alignSelf: 'flex-start',
  },
  loginContainer: {
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  signupContainer: {
    marginRight: '10%',
    flex: 1,
    alignSelf: 'flex-end',
    rowGap: -13,
  },
  menu: {
    fontFamily: GlobalStyles.section_title.fontFamily,
    fontSize: 18,
    color: GlobalStyles.green.color,
    textAlign: 'right',
  },
  text: {
    fontFamily: GlobalStyles.content.fontFamily,
    fontSize: 14,
    color: GlobalStyles.grey_3.color,
    textAlign: 'right',
  },
  googleLoginImg: {
    justifyContent: 'center',
    width: 270,
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
