import {StyleSheet, Text, View} from 'react-native';
import GlobalStyles from '../../../styles/GlobalStyles';

type rangeFormProps = {
  min: number;
  max: number;
  cur: number;
};

export const rangeForm = ({min, max, cur}: rangeFormProps) => {
  const isCurLessThanMin = cur < min;
  const curNumStyle = {
    fontFamily: GlobalStyles.section_title.fontFamily,
    color: isCurLessThanMin
      ? GlobalStyles.grey_2.color
      : GlobalStyles.green.color,
    fontSize: 35,
  };

  return (
    <View style={style.container}>
      <View style={style.end}>
        <Text style={style.endText}>최소</Text>
        <Text style={style.endNum}>{min}</Text>
      </View>
      <View style={style.horizonLine} />
      <Text style={curNumStyle}>{cur}</Text>
      <View style={style.horizonLine} />
      <View style={style.end}>
        <Text style={style.endText}>최대</Text>
        <Text style={style.endNum}>{max}</Text>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 10,
  },
  horizonLine: {
    width: '20%',
    height: '1%',
    alignSelf: 'center',
    backgroundColor: GlobalStyles.grey_2.color,
    marginHorizontal: 10,
  },
  end: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '7%',
  },
  endText: {
    position: 'absolute',
    fontFamily: GlobalStyles.sub_title.fontFamily,
    fontSize: GlobalStyles.sub_title.fontSize,
    color: GlobalStyles.black.color,
    top: -5,
  },
  endNum: {
    fontFamily: GlobalStyles.section_title.fontFamily,
    fontSize: GlobalStyles.section_title.fontSize,
    color: GlobalStyles.black.color,
  },
  curNum: {
    fontFamily: GlobalStyles.section_title.fontFamily,
    color: GlobalStyles.green.color,
    fontSize: 35,
  },
});

export default rangeForm;
