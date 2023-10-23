import {Text, View, Image, StyleSheet} from 'react-native';
import GlobalStyles from '../../../styles/GlobalStyles';
import BlockImg from '../../../assets/blockImg.png';
import LogoImg from '../../../assets/logoImg.png';
import BtnBig from '../../atoms/btnBig';

export const Onboarding = (): JSX.Element => {
  return (
    <View style={styles.container}>
      <Image source={BlockImg} style={styles.BlockImg} />
      <Image source={LogoImg} style={styles.LogoImg} />
      <Text style={styles.Title}>모두가 함께하는 마니또 게임</Text>
      <Text style={styles.Content}>
        싸피 최초 모바일 마니또 게임 또랑또랑에 참여해보세요!
      </Text>
      <Text style={styles.Content}>
        온오프라인 미션도 수행하고, 마니또에게 쪽지도 보내면서
      </Text>
      <Text style={styles.Content}>
        싸피에서의 잊지 못할 추억을 만들어봐요 :)
      </Text>
      <BtnBig text="시작하기" onPress={() => console.log('go to Home')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  BlockImg: {
    width: 260,
    height: 213,
    marginTop: 153,
    alignSelf: 'center',
  },
  LogoImg: {
    width: 150,
    height: 45,
    alignSelf: 'center',
    marginTop: 40,
    marginBottom: 7,
  },
  Title: {
    color: GlobalStyles.black.color,
    fontFamily: GlobalStyles.section_title.fontFamily,
    fontSize: GlobalStyles.section_title.fontSize,
    textAlign: 'center',
  },
  Content: {
    color: GlobalStyles.grey_2.color,
    fontFamily: GlobalStyles.sub_title.fontFamily,
    fontSize: GlobalStyles.sub_title.fontSize,
    textAlign: 'center',
    marginTop: -20,
  },
});

export default Onboarding;
