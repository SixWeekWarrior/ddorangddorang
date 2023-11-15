import {Text, View, Image, StyleSheet} from 'react-native';
import GlobalStyles, {height} from '../../../styles/GlobalStyles';
import blockImg from '../../../assets/blockImg.png';
import BtnMid from '../../atoms/btnMid';
import {LogBox} from 'react-native';
import BottomSheet, {BottomSheetBackdrop} from '@gorhom/bottom-sheet';
import InputTextwithBtn from '../../molecules/inputTextwithBtn';
import {useCallback, useRef, useMemo, useState} from 'react';
import congratsImg from '../../../assets/congratsImg.png';
import token from '../../../utils/token';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {useRecoilValue} from 'recoil';
import user from '../../../modules/user';
import {roomApi} from '../../../apis';

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

export const Enter = ({navigation, route}: any): JSX.Element => {
  const {params} = route;
  const userInfo = useRecoilValue(user.UserInfoState);
  const [accessCode, setAccessCode] = useState<number>(0);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['50%', '20%', '50%'], []);

  const postRoomJoin = () => {
    try {
      roomApi
        .postRoomJoin(accessCode)
        .then(() => navigation.navigate('EnterWait'));
    } catch (error) {
      console.log(error);
    }
  };

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
      <Image source={congratsImg} style={styles.congratsImg} />
      <View style={styles.noticeContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.name}>{userInfo.name}</Text>
          <Text style={styles.text}>님</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.text}>
            가입을 <Text style={styles.textBig}>축하</Text>드려요!
          </Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Image source={blockImg} style={styles.blockImg} />
      <Text style={styles.content}>진행 중인 마니또가 없어요.</Text>
      <Text style={styles.content}>
        방 생성이나 초대 코드로 입장할 수 있어요.
      </Text>
      <View style={styles.innerContainer}>
        <BtnMid
          text="그룹 만들기"
          onPress={() => {
            navigation.navigate('MakeRoom');
          }}
        />
        <InputTextwithBtn
          btnText="입장"
          onChange={setAccessCode}
          onPress={() => postRoomJoin()}
        />
      </View>
      <View style={styles.textRowContainer}>
        <Text
          style={styles.myInfo}
          onPress={async () => {
            navigation.navigate('MyPage', 'enter');
          }}>
          내 정보 수정
        </Text>
        <Text
          style={styles.logout}
          onPress={async () => {
            await token.removeToken();
            await GoogleSignin.revokeAccess();
            await GoogleSignin.signOut();
            navigation.navigate('Onboarding', {destination: 'Onboarding'});
          }}>
          로그아웃
        </Text>
      </View>
      {params === 'signup' ? (
        <BottomSheet
          ref={bottomSheetRef}
          snapPoints={snapPoints}
          index={0}
          backdropComponent={renderBackdrop}
          enablePanDownToClose={true}>
          {congrats()}
        </BottomSheet>
      ) : (
        ''
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: GlobalStyles.white_2.color,
  },
  blockImg: {
    height: 130,
    marginBottom: 30,
    alignSelf: 'center',
    objectFit: 'scale-down',
  },
  content: {
    color: GlobalStyles.black.color,
    fontFamily: GlobalStyles.content.fontFamily,
    fontSize: GlobalStyles.content.fontSize,
    textAlign: 'center',
  },
  innerContainer: {
    alignSelf: 'center',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  congratsImg: {
    position: 'absolute',
    flex: 1,
    width: '70%',
    objectFit: 'scale-down',
  },
  noticeContainer: {
    position: 'absolute',
    flex: 1,
    marginTop: 110,
  },
  textContainer: {
    flexDirection: 'row',
    marginTop: -25,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  textRowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  noticeShare: {
    flex: 1,
    alignItems: 'center',
  },
  noticeCode: {
    flex: 1,
    alignItems: 'center',
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
  myInfo: {
    fontFamily: GlobalStyles.section_title.fontFamily,
    marginLeft: height * 8,
    marginTop: height * 20,
    fontSize: height * 12,
    color: GlobalStyles.green.color,
  },
  logout: {
    fontFamily: GlobalStyles.section_title.fontFamily,
    // marginLeft: height * 260
    marginLeft: height * -12,
    marginTop: height * 20,
    fontSize: height * 12,
    color: GlobalStyles.grey_3.color,
  },
});

export default Enter;
