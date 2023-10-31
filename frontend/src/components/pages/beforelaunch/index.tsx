import {Text, View, Image, StyleSheet} from 'react-native';
import GlobalStyles from '../../../styles/GlobalStyles';
import blockImg from '../../../assets/blockImg.png';

export const BeforeLaunch = (): JSX.Element => {
  return (
    <View style={styles.container}>
      <Image source={blockImg} style={styles.blockImg} />
      <Text style={styles.content}>준비 중인 서비스입니다.</Text>
      <Text style={styles.content}>빠르게 준비해서 올게요 🤪</Text>
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
    fontSize: 15,
    textAlign: 'center',
  },
});

export default BeforeLaunch;
