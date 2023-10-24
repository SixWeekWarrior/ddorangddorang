import {Text, View, Image, StyleSheet} from 'react-native';
import GlobalStyles from '../../../styles/GlobalStyles';
import BlockImg from '../../../assets/blockImg.png';
import BtnMid from '../../atoms/btnMid';
import InputTextwithBtn from '../../molecules/InputTextwithBtn';

export const Enter = (): JSX.Element => {
  return (
    <View style={styles.container}>
      <Image source={BlockImg} style={styles.BlockImg} />
      <Text style={styles.Content}>진행 중인 마니또가 없어요.</Text>
      <Text style={styles.Content}>
        방 생성이나 초대 코드로 입장할 수 있어요.
      </Text>
      <View style={styles.innerContainer}>
        <BtnMid text="방 생성하기" onPress={() => console.log('make room')} />
        <InputTextwithBtn />
      </View>
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
  innerContainer: {
    alignSelf: 'center',
  },
});

export default Enter;
