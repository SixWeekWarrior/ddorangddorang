import {useEffect, useState} from 'react';
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Text,
  Alert,
} from 'react-native';
import GlobalStyles, {height} from '../../../styles/GlobalStyles';
import blockImg from '../../../assets/blockImg.png';
import logoImg from '../../../assets/logoImg.png';
import TitleAtom from '../../atoms/titleAtom';
import googleLoginImg from '../../../assets/googleLoginImg.png';
import {useMemo, useRef, useCallback} from 'react';
import BottomSheet, {BottomSheetBackdrop} from '@gorhom/bottom-sheet';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import BtnBig from '../../atoms/btnBig';
import {userApi} from '../../../apis';
import {tokenUtil} from '../../../utils';
import {useSetRecoilState} from 'recoil';
import {userAtom} from '../../../modules';
import {NotificationInfo} from '../../../types/notification';
import {BackHandler} from 'react-native';

export const Onboarding = ({navigation}: {navigation: any}) => {
  const setUserInfo = useSetRecoilState(userAtom.UserInfoState);
  const [userState, setUserState] = useState<number | null>(-1);

  const backPressed = () => {
    Alert.alert('', '앱을 종료하시겠습니까?', [
      {
        text: '취소',
        onPress: () => null,
        style: 'cancel',
      },
      {text: '확인', onPress: () => BackHandler.exitApp()},
    ]);
    return true;
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backPressed,
    );

    return () => {
      backHandler.remove();
    };
  }, []);

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
  const snapPoints = useMemo(() => ['25%', '25%'], []);
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

  const getUserInfo = async () => {
    try {
      const data = await userApi.getUser();
      if (data !== null) {
        console.log('사용자 정보:', data);
        setUserInfo(data);
        await getState();
      }
    } catch (error) {
      console.error('getUserInfo 에러:', error);
    }
  };

  const getState = async () => {
    try {
      const data = await userApi.getUserState();
      setUserState(data);
    } catch (error) {
      console.error('getUserState 에러:', error);
    }
  };

  useEffect(() => {
    if (userState) {
      switch (userState) {
        case 1:
          console.log('case1 - 아무것도 안한 사람');
          navigation.navigate('Enter');
          break;
        case 2:
          console.log('case2 - 시작을 대기 중 && 방장');
          navigation.navigate('BeforeStart');
          break;
        case 3:
        case 5:
          console.log('case3 - 수락됨 && 시작을 대기 중인 참가자');
          navigation.navigate('EnterWait');
          break;
        case 4:
          console.log('case4 - 게임 진행 중');
          navigation.navigate('NavBar');
          break;
        // case 5:
        //   // TODO 자신이 뺴고 게임이 시작된 상황임을 알리는 API 및 VIEW로 변경 되어야함
        //   console.log('case 5- 수락 요청을 보내고 수락 되길 바라는 참가자');
        //   navigation.navigate('Enter');
        //   break;
        default:
          console.log('에러 상황 : userState - null');
      }
    }
  }, [userState]);

  const successLogin = async () => {
    try {
      await getUserInfo();
      const notificationData: NotificationInfo = {
        message: {
          topic: 'news',
          notification: {
            title: 'Breaking News',
            body: 'New news story available.',
          },
          data: {
            story_id: 'story_12345',
          },
        },
      };

      await userApi.postNotification(notificationData);
    } catch (error) {
      console.log(error);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const loginInfo = await GoogleSignin.signIn();
      if (loginInfo.idToken) {
        console.log(loginInfo.idToken);
        userApi
          .postLogin(loginInfo.idToken)
          .then(data => {
            data.success
              ? tokenUtil
                  .setToken(data.data.accessToken, data.data.refreshToken)
                  .then(() => successLogin())
              : tokenUtil
                  .setIdToken(loginInfo.idToken as string)
                  .then(navigation.navigate('ProfilePicAdd'));
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
          menu={'시작하기'}
          text={'로그인하고 지금 바로 또랑또랑을 시작해보세요!'}
          menuColor={GlobalStyles.green.color}
          textColor={GlobalStyles.grey_3.color}
        />
      </View>
      <View style={styles.imgContainer}>
        <TouchableOpacity onPress={handleGoogleSignIn}>
          <Image source={googleLoginImg} style={styles.googleLoginImg} />
        </TouchableOpacity>
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
        index={1}
        snapPoints={snapPoints}
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
    alignItems: 'center',
  },
  titleContainer: {
    width: height * 280,
  },
  imgContainer: {
    justifyContent: 'center',
    marginTop: '-5%',
  },
  menu: {
    fontFamily: GlobalStyles.section_title.fontFamily,
    fontSize: height * 14,
    color: GlobalStyles.green.color,
    textAlign: 'right',
  },
  text: {
    fontFamily: GlobalStyles.content.fontFamily,
    fontSize: height * 10,
    color: GlobalStyles.grey_3.color,
    textAlign: 'right',
  },
  googleLoginImg: {
    width: height * 200,
    objectFit: 'contain',
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
