import {Text, View, Image, StyleSheet} from 'react-native';
import GlobalStyles from '../../../styles/GlobalStyles';
import blockImg from '../../../assets/blockImg.png';
import logoImg from '../../../assets/logoImg.png';
import BtnBig from '../../atoms/btnBig';

export const Onboarding = ({navigation}: {navigation: any}): JSX.Element => {
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
      <BtnBig
        text="시작하기"
        onPress={() => {
          navigation.navigate('Enter');
        }}
      />
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
