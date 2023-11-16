import {View, Text, StyleSheet} from 'react-native';
import GlobalStyles from '../../../styles/GlobalStyles';

export const GuessRow = () => {
  return (
    <View style={styles.row}>
      <View style={styles.person}>
        <View style={styles.profilePic} />
        <Text style={styles.nameText}>이효식</Text>
        <Text style={styles.profileText}>전공 / 7반</Text>
      </View>
      <View style={styles.line} />
      <View style={styles.person}>
        <View style={styles.profilePic} />
        <Text style={styles.nameText}>홍재연</Text>
        <Text style={styles.profileText}>전공 / 7반</Text>
      </View>
      <View style={styles.line} />
      <View style={styles.blank}>
        <View style={styles.profilePic}>
          <Text style={styles.questionMark}>?</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
  },
  person: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  blank: {
    alignSelf: 'center',
  },
  questionMark: {
    fontSize: 25,
    fontFamily: GlobalStyles.home_title.fontFamily,
    color: GlobalStyles.white_2.color,
    textAlign: 'center',
  },
  line: {
    width: '15%',
    borderBottomWidth: 3,
    borderBottomColor: GlobalStyles.grey_2.color,
    alignSelf: 'center',
    marginHorizontal: 10,
  },
  profilePic: {
    width: 60,
    height: 60,
    borderRadius: 100,
    backgroundColor: GlobalStyles.grey_4.color,
  },
  nameText: {
    fontFamily: GlobalStyles.home_title.fontFamily,
    fontSize: GlobalStyles.content.fontSize,
    color: GlobalStyles.grey_1.color,
    marginBottom: -18,
    marginTop: -7,
  },
  profileText: {
    fontFamily: GlobalStyles.sub_title.fontFamily,
    fontSize: GlobalStyles.sub_title.fontSize,
    color: GlobalStyles.grey_2.color,
  },
});

export default GuessRow;
