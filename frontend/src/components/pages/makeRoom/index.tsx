import {Text, View, Image, StyleSheet} from 'react-native';
import GlobalStyles from '../../../styles/GlobalStyles';
import BlockImg from '../../../assets/blockImg.png';
import BtnMid from '../../atoms/btnMid';
import InputTextwithBtn from '../../molecules/InputTextwithBtn';

export const MakeRoom = (): JSX.Element => {
  return (
    <View style={styles.container}>
      <Image source={BlockImg} style={styles.BlockImg} />
      <Text style={styles.Content}>진행 중인 마니또가 없어요.</Text>
      <Text style={styles.Content}>
        방 생성이나 초대 코드로 입장할 수 있어요.
      </Text>
      <BtnMid text="방 생성하기" onPress={() => console.log('make room')} />
      <InputTextwithBtn />
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
    marginBottom: 30,
    alignSelf: 'center',
  },
  Content: {
    color: GlobalStyles.black.color,
    fontFamily: GlobalStyles.content.fontFamily,
    fontSize: GlobalStyles.content.fontSize,
    textAlign: 'center',
  },
});

export default MakeRoom;
