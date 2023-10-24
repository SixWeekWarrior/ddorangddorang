import {Text, View, Image, StyleSheet} from 'react-native';
import GlobalStyles from '../../../styles/GlobalStyles';
import BlockImg from '../../../assets/blockImg.png';

export const EnterWait = (): JSX.Element => {
  return (
    <View style={styles.container}>
      <Image source={BlockImg} style={styles.BlockImg} />
      <Text style={styles.Content}>시작을 기다리고 있어요.</Text>
      <Text style={styles.Content}>게임이 시작되면 알림을 드릴게요!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  BlockImg: {
    height: 130,
    marginBottom: 30,
    alignSelf: 'center',
    objectFit: 'scale-down',
  },
  Content: {
    color: GlobalStyles.black.color,
    fontFamily: GlobalStyles.content.fontFamily,
    fontSize: GlobalStyles.content.fontSize,
    textAlign: 'center',
  },
});

export default EnterWait;
