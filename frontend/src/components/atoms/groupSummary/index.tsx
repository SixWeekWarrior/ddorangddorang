import {View, Text, StyleSheet} from 'react-native';
import GlobalStyles from '../../../styles/GlobalStyles';

type GroupSummaryProps = {
  period: number;
  min: number;
  max: number;
  selectedCount: number;
};
export const GroupSummary = ({
  period,
  min,
  max,
  selectedCount,
}: GroupSummaryProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>최소인원</Text>
        <Text style={styles.content}>{min}명</Text>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>최대인원</Text>
        <Text style={styles.content}>{max}명</Text>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>현재인원</Text>
        <Text style={styles.content}>{selectedCount}명</Text>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>기간</Text>
        <Text style={styles.content}>{period}일</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    flexDirection: 'row',
    width: '35%',
    justifyContent: 'space-between',
  },
  title: {
    fontFamily: GlobalStyles.section_title.fontFamily,
    fontSize: GlobalStyles.section_title.fontSize,
    color: GlobalStyles.black.color,
  },
  content: {
    fontFamily: GlobalStyles.section_title.fontFamily,
    fontSize: GlobalStyles.section_title.fontSize,
    color: GlobalStyles.black.color,
  },
});

export default GroupSummary;
