import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import GlobalStyles, {height} from '../../../styles/GlobalStyles';
import {GuessInfo} from '../../../types/user';
import greenArrowRightImg from '../../../assets/greenArrowRightImg.png';

type GuessAddProp = {
  isFirst: boolean;
  showNotice: any;
  navigation: any;
};
export const GuessRow = ({
  guessUser,
  isFirst,
  manito,
  me,
  showNotice,
  navigation,
}: GuessInfo & GuessAddProp) => {
  const handleGuess = () => {
    navigation.navigate('MatchGuess', {showNotice});
  };
  return (
    <View>
      {isFirst ? (
        <View>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>본인 / 친구</Text>
            <Text style={styles.title}>예상 마니또</Text>
            <Text style={styles.title}>실제 마니또</Text>
          </View>
          <View style={styles.highlightRow}>
            <View style={styles.person}>
              <Image
                source={{uri: me?.profileImage}}
                style={[styles.profilePic]}
              />
              <Text style={styles.nameText}>{me?.name}</Text>
              <Text style={styles.profileText}>
                {me?.isMajor ? '전공' : '비전공'} / {me?.classes}반
              </Text>
            </View>
            <View style={styles.line} />
            {guessUser?.userId === null ? (
              <View style={styles.blank}>
                <View style={styles.profilePic}>
                  <Text style={styles.questionMark}>?</Text>
                </View>
              </View>
            ) : (
              <View style={styles.person}>
                <Image
                  source={{uri: guessUser?.profileImage}}
                  style={[styles.profilePic]}
                />
                <Text style={styles.nameText}>{guessUser?.name}</Text>
                <Text style={styles.profileText}>
                  {guessUser?.isMajor ? '전공' : '비전공'} /{' '}
                  {guessUser?.classes}반
                </Text>
              </View>
            )}
            <View style={styles.line} />
            {manito?.userId === null ? (
              <View style={styles.blank}>
                <View style={styles.profilePic}>
                  <Text style={styles.questionMark}>?</Text>
                </View>
              </View>
            ) : (
              <View style={styles.person}>
                <Image
                  source={{uri: manito?.profileImage}}
                  style={[styles.profilePic]}
                />
                <Text style={styles.nameText}>{manito?.name}</Text>
                <Text style={styles.profileText}>
                  {manito?.isMajor ? '전공' : '비전공'} / {manito?.classes}반
                </Text>
              </View>
            )}
          </View>
          <TouchableWithoutFeedback onPress={handleGuess}>
            <View style={styles.noticeRow}>
              <Text style={styles.notice}>내 마니또 예측하기</Text>
              <Image source={greenArrowRightImg} style={styles.arrow} />
            </View>
          </TouchableWithoutFeedback>
        </View>
      ) : (
        <View style={styles.row}>
          <View style={styles.person}>
            <Image
              source={{uri: me?.profileImage}}
              style={[styles.profilePic]}
            />
            <Text style={styles.nameText}>{me?.name}</Text>
            <Text style={styles.profileText}>
              {me?.isMajor ? '전공' : '비전공'} / {me?.classes}반
            </Text>
          </View>
          <View style={styles.line} />
          {guessUser?.userId === null ? (
            <View style={styles.blank}>
              <View style={styles.profilePic}>
                <Text style={styles.questionMark}>?</Text>
              </View>
            </View>
          ) : (
            <View style={styles.person}>
              <Image
                source={{uri: guessUser?.profileImage}}
                style={[styles.profilePic]}
              />
              <Text style={styles.nameText}>{guessUser?.name}</Text>
              <Text style={styles.profileText}>
                {guessUser?.isMajor ? '전공' : '비전공'} / {guessUser?.classes}
                반
              </Text>
            </View>
          )}
          <View style={styles.line} />
          {manito?.userId === null ? (
            <View style={styles.blank}>
              <View style={styles.profilePic}>
                <Text style={styles.questionMark}>?</Text>
              </View>
            </View>
          ) : (
            <View style={styles.person}>
              <Image
                source={{uri: manito?.profileImage}}
                style={[styles.profilePic]}
              />
              <Text style={styles.nameText}>{manito?.name}</Text>
              <Text style={styles.profileText}>
                {manito?.isMajor ? '전공' : '비전공'} / {manito?.classes}반
              </Text>
            </View>
          )}
        </View>
      )}
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
  titleContainer: {
    flexDirection: 'row',
    paddingHorizontal: '4%',
    justifyContent: 'space-between',
  },
  title: {
    fontFamily: GlobalStyles.home_title.fontFamily,
    fontSize: GlobalStyles.content.fontSize,
    color: GlobalStyles.black.color,
  },
  notice: {
    fontFamily: GlobalStyles.section_title.fontFamily,
    fontSize: GlobalStyles.content.fontSize,
    color: GlobalStyles.green.color,
  },
  noticeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingHorizontal: 10,
    marginVertical: -15,
  },
  highlightRow: {
    flexDirection: 'row',
    borderColor: GlobalStyles.green.color,
    borderWidth: 0.5,
    borderRadius: 20,
    padding: height * 10,
  },
  profilePic: {
    width: 60,
    height: 60,
    borderRadius: 100,
    backgroundColor: GlobalStyles.grey_4.color,
  },
  arrow: {
    width: 8,
    resizeMode: 'contain',
    marginLeft: 5,
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
