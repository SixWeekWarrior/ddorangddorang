import {View, StyleSheet, Image, Text} from 'react-native';
import GlobalStyles from '../../../styles/GlobalStyles';
import congratsImg from '../../../assets/congrats.png';
import CodeForm from '../../atoms/codeForm';

export const MakeComplete = (): JSX.Element => {
  return (
    <View style={styles.container}>
      <Image source={congratsImg} style={styles.congratsImg} />
      <View style={styles.notice}>
        <View style={styles.textContainer}>
          <Text style={styles.name}>홍재연</Text>
          <Text style={styles.text}>방장님</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.text}>
            방 생성을 <Text style={styles.textBig}>완료</Text>했어요.
          </Text>
        </View>
      </View>
      <View style={styles.noticeContainer}>
        <View style={styles.noticeCode}>
          <Text style={styles.textSm}>아래의 초대코드를 복사해서</Text>
          <Text style={styles.textSm}>친구들에게 공유해보세요!</Text>
          <CodeForm code="초대코드" />
          <Text style={styles.textXs}>
            초대코드는 홈 방입장 탭에서도 확인가능합니다.
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 160,
    backgroundColor: GlobalStyles.white_2.color,
  },
  congratsImg: {
    marginLeft: -20,
  },
  notice: {
    position: 'absolute',
    flex: 2,
    marginTop: 110,
  },
  textContainer: {
    flexDirection: 'row',
    marginTop: -32,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  noticeContainer: {
    flex: 1,
    position: 'relative',
    marginTop: 30,
  },
  noticeCode: {
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
  textSm: {
    fontFamily: GlobalStyles.sub_title.fontFamily,
    fontSize: GlobalStyles.sub_title.fontSize,
    color: GlobalStyles.grey_3.color,
    marginTop: -20,
  },
  textXs: {
    fontFamily: GlobalStyles.sub_title.fontFamily,
    fontSize: 10,
    color: GlobalStyles.grey_3.color,
  },
});

export default MakeComplete;
