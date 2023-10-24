import {View, StyleSheet, Image, Text} from 'react-native';
import GlobalStyles from '../../../styles/GlobalStyles';
import Congrats from '../../../assets/congrats.png';
import { startTransition } from 'react';
import CodeForm from '../../atoms/codeForm';

export const MakeComplete = (): JSX.Element => {
  return (
    <View style={styles.Container}>
      <Image source={Congrats} style={styles.Img}/>
      <View style={styles.Notice}>
        <View style={styles.TextContainer}>
          <Text style={styles.Name}>홍재연</Text>
          <Text style={styles.Text}>방장님</Text>
        </View>
        <View style={styles.TextContainer}>
          <Text style={styles.Text}>
            방 생성을 <Text style={styles.TextBig}>완료</Text>했어요.
          </Text>
        </View>
      </View>
      <View style={styles.NoticeContainer}>
      <View style={styles.NoticeCode}>
        <Text style={styles.TextSm}>아래의 초대코드를 복사해서</Text>
        <Text style={styles.TextSm}>친구들에게 공유해보세요!</Text>
        <CodeForm text="초대코드"/>
        <Text style={styles.TextXs}>초대코드는 홈> 방입장 탭에서도 확인가능합니다.</Text>
      </View></View>
    </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 160,
  },
  Img: {
    marginLeft: -20,
  },
  Notice: {
    position: 'absolute',
    flex: 2,
    marginTop: 110,
  },
  TextContainer: {
    flexDirection: 'row',
    marginTop: -32,
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  NoticeContainer: {
    flex: 1,
    position: 'relative',
    marginTop: 30,
  },
  NoticeCode: {
    alignItems: 'center'
  },
  Name: {
    fontFamily: GlobalStyles.section_title.fontFamily,
    fontSize: 25,
    color: GlobalStyles.green.color,
    marginBottom: -6,
    marginRight: 4,
  },
  Text: {
    fontFamily: GlobalStyles.section_title.fontFamily,
    fontSize: GlobalStyles.section_title.fontSize,
    color: GlobalStyles.black.color,
  },
  TextBig: {
    fontFamily: GlobalStyles.section_title.fontFamily,
    fontSize: 22,
    color: GlobalStyles.black.color,
  },
  TextSm: {
    fontFamily: GlobalStyles.sub_title.fontFamily,
    fontSize: GlobalStyles.sub_title.fontSize,
    color: GlobalStyles.grey_3.color,
    marginTop: -20,
  },
  TextXs: {
    fontFamily: GlobalStyles.sub_title.fontFamily,
    fontSize: 10,
    color: GlobalStyles.grey_3.color,
  }
});

export default MakeComplete;
