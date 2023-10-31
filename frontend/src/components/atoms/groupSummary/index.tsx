import {View, Text, StyleSheet} from 'react-native';
import GlobalStyles from '../../../styles/GlobalStyles';
import RangeForm from '../rangeForm';

type GroupSummaryProps = {
  period: number;
  min: number;
  max: number;
  selectedCount: any;
};
export const GroupSummary = ({
  period,
  min,
  max,
  selectedCount,
}: GroupSummaryProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.textLeft}>
        <Text style={styles.titleBig}>현재 인원</Text>
        <Text style={styles.titleSmall}>(명)</Text>
      </View>
      {parseInt(selectedCount, 10) < Number(min) ? (
        <View style={styles.warning}>
          <Text style={styles.warningText}>최소 인원을 확인해주세요!</Text>
        </View>
      ) : (
        <></>
      )}

      <View style={styles.textCenter}>
        <RangeForm min={min} max={max} cur={selectedCount} />
      </View>
      <View style={styles.textLeft}>
        <Text style={styles.titleBig}>미션 기간</Text>
        <Text style={styles.titleSmall}>(일)</Text>
      </View>
      <View style={styles.textCenter}>
        <RangeForm min={7} max={30} cur={period} />
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
  textLeft: {
    marginTop: 30,
    flexDirection: 'row',
    alignSelf: 'flex-start',
    marginLeft: 50,
  },
  textCenter: {
    alignSelf: 'center',
  },
  titleBig: {
    fontFamily: GlobalStyles.section_title.fontFamily,
    fontSize: GlobalStyles.section_title.fontSize,
    color: GlobalStyles.black.color,
    marginRight: 2,
  },
  titleSmall: {
    fontFamily: GlobalStyles.sub_title.fontFamily,
    fontSize: GlobalStyles.sub_title.fontSize,
    color: GlobalStyles.black.color,
    marginTop: 10,
  },
  contentBig: {
    fontFamily: GlobalStyles.section_title.fontFamily,
    fontSize: 25,
    color: GlobalStyles.black.color,
  },
  content: {
    fontFamily: GlobalStyles.section_title.fontFamily,
    alignSelf: 'center',
    fontSize: 18,
    color: GlobalStyles.black.color,
  },
  warning: {
    position: 'absolute',
    marginTop: 30,
  },
  warningText: {
    fontFamily: GlobalStyles.section_title.fontFamily,
    fontSize: 15,
    color: GlobalStyles.orange.color,
  },
});

export default GroupSummary;
