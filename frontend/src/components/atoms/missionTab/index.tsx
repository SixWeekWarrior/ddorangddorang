import {Pressable, StyleSheet, Text} from 'react-native';
import GlobalStyles, {height} from '../../../styles/GlobalStyles';

type MissionTabProps = {
  day: string;
  content: string;
  done: boolean;
};
const MissionTab = ({day, content, done}: MissionTabProps) => {
  return (
    <Pressable style={style.bottomTop}>
      <Text style={style.titleFont}>{day}</Text>
      <Text style={style.miniFont}>{content}</Text>
      <Pressable style={done ? style.circleDone : style.circle}>
        <Text style={style.midBoldFont}>{done ? '완료' : '미완료'}</Text>
      </Pressable>
    </Pressable>
  );
};

const style = StyleSheet.create({
  bottomTop: {
    borderWidth: 0.5,
    width: 105,
    borderStyle: 'solid',
    borderRadius: 20,
    marginRight: height * 10,
    borderColor: GlobalStyles.grey_3.color,
  },
  circleDone: {
    backgroundColor: GlobalStyles.orange.color,
    width: 60,
    height: 60,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginHorizontal: 15,
    marginBottom: 10,
  },
  circle: {
    backgroundColor: GlobalStyles.grey_2.color,
    width: 60,
    height: 60,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginHorizontal: 15,
    marginBottom: 10,
  },

  midBoldFont: {
    fontFamily: 'NotoSansKR-Bold',
    color: GlobalStyles.white_2.color,
    verticalAlign: 'middle',
    fontSize: 14,
  },
  miniFont: {
    fontFamily: GlobalStyles.home_title.fontFamily,
    color: GlobalStyles.grey_3.color,
    fontSize: 10,
    paddingHorizontal: 15,
    marginTop: -15,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: '0%',
    flexWrap: 'wrap',
  },
  titleFont: {
    fontFamily: GlobalStyles.home_title.fontFamily,
    fontSize: GlobalStyles.home_title.fontSize,
    letterSpacing: -1,
    color: GlobalStyles.grey_2.color,
    marginLeft: 15,
  },
});

export default MissionTab;
