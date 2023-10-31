import {Text, View, Image, StyleSheet} from 'react-native';
import GlobalStyles from '../../../styles/GlobalStyles';
import blockImg from '../../../assets/blockImg.png';
import BtnMid from '../../atoms/btnMid';
import InputTextwithBtn from '../../molecules/inputTextwithBtn';

export const Enter = ({navigation}: {navigation: any}): JSX.Element => {
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
});

export default Enter;
