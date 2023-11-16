import {Text, View, Image, StyleSheet} from 'react-native';
import GlobalStyles, {height} from '../../../styles/GlobalStyles';
import blockImg from '../../../assets/blockImg.png';
import token from '../../../utils/token';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

export const EnterWait = ({navigation}: any): JSX.Element => {
  return (
    <View style={styles.container}>
      <Image source={blockImg} style={styles.blockImg} />
      <Text style={styles.content}>시작을 기다리고 있어요.</Text>
      <Text style={styles.content}>게임이 곧 시작 될 거에요 😄</Text>
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
  logout: {
    fontFamily: GlobalStyles.section_title.fontFamily,
    marginTop: height * 40,
    fontSize: height * 13,
    color: GlobalStyles.blue.color,
    alignSelf: 'center',
  },
});

export default EnterWait;
