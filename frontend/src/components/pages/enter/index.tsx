import {Text, View, Image, StyleSheet} from 'react-native';
import GlobalStyles, {height, width} from '../../../styles/GlobalStyles';
import blockImg from '../../../assets/blockImg.png';
import BtnMid from '../../atoms/btnMid';
import {LogBox} from 'react-native';
import BottomSheet, {BottomSheetBackdrop} from '@gorhom/bottom-sheet';
import InputTextwithBtn from '../../molecules/inputTextwithBtn';
import {useCallback, useRef, useMemo} from 'react';
import congratsImg from '../../../assets/congratsImg.png';
import token from '../../../utils/token';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

export const Enter = ({navigation}: {navigation: any}): JSX.Element => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['50%', '20%', '50%'], []);
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
          <Text style={styles.name}>홍재연</Text>
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
          navigation={navigation}
          btnText="입장"
          destination="EnterWait"
        />
      </View>
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
      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        bottomInset={46}
        detached={true}
        index={0}
        backdropComponent={renderBackdrop}
        enablePanDownToClose={true}
        style={styles.sheetContainer}>
        {congrats()}
      </BottomSheet>
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
  sheetContainer: {
    marginHorizontal: 20,
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
  logout: {
    fontFamily: GlobalStyles.section_title.fontFamily,
    marginLeft: width * 260,
    marginTop: height * 20,
    fontSize: width * 10,
    color: GlobalStyles.grey_3.color,
  },
});

export default Enter;
