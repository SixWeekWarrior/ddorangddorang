import {StyleSheet, Text, View} from 'react-native';
import GlobalStyles from '../../../styles/GlobalStyles';
import {LogBox} from 'react-native';

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);
type rangeFormProps = {
  min: number;
  max: number;
  cur: any;
};

const HorizonLine = () => {
  return <View style={style.horizonLine}></View>;
};

const RangeForm = ({min, max, cur}: rangeFormProps) => {
  const curNumColor =
    parseInt(cur, 10) < Number(min)
      ? GlobalStyles.grey_3.color
      : GlobalStyles.green.color;

  return (
    <View style={style.container}>
      <View style={style.end}>
        <Text style={style.endText}>최소</Text>
        <Text style={style.endNum}>{min}</Text>
      </View>
      <HorizonLine />
      <Text style={[style.curNum, {color: curNumColor}]}>{cur}</Text>
      <HorizonLine />
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

export default RangeForm;
