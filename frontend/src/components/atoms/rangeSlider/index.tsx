import React, {useState} from 'react';

import {StyleSheet, View, Text} from 'react-native';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
// import CustomMarker from './CustomMarker';
import CustomLabel from './customLabel';
import GlobalStyles from '../../../styles/GlobalStyles';

export default function RangeSlider() {
  const [sliderOneChanging, setSliderOneChanging] = useState(false);
  const [multiSliderChanging, setMultiSliderChanging] = useState(false);
  const [sliderOneValue, setSliderOneValue] = useState([15]);
  const [nonCollidingMultiSliderValue, setNonCollidingMultiSliderValue] =
    useState([30, 70]);

  const sliderOneValuesChangeStart = () => setSliderOneChanging(true);
  const sliderOneValuesChange = (values: number[]) => setSliderOneValue(values);
  const sliderOneValuesChangeFinish = () => {
    setSliderOneChanging(false);
  };
  const nonCollidingMultiSliderValuesChangeStart = () =>
    setMultiSliderChanging(true);
  const nonCollidingMultiSliderValuesChange = (values: number[]) => {
    setNonCollidingMultiSliderValue(values);
  };
  const nonCollidingMultiSliderValuesChangeFinish = () =>
    setMultiSliderChanging(false);

  return (
    <View style={styles.container}>
      <View style={styles.textLeft}>
        <Text style={styles.titleBig}>인원</Text>
        <Text style={styles.titleSmall}>(명)</Text>
      </View>
      <View style={styles.textCenter}>
        <Text style={styles.content}>최소 </Text>
        <Text
          style={[
            styles.contentBig,
            multiSliderChanging && {
              color: GlobalStyles.blue.color,
            },
          ]}>
          {nonCollidingMultiSliderValue[0]}
        </Text>
        <Text style={styles.content}>명</Text>
        <Text style={styles.content}> ~ </Text>
        <Text style={styles.content}>최대 </Text>
        <Text
          style={[
            styles.contentBig,
            multiSliderChanging && {
              color: GlobalStyles.blue.color,
            },
          ]}>
          {nonCollidingMultiSliderValue[1]}
        </Text>
        <Text style={styles.content}>명</Text>
      </View>
      <View style={styles.slider}>
        <MultiSlider
          values={[
            nonCollidingMultiSliderValue[0],
            nonCollidingMultiSliderValue[1],
          ]}
          sliderLength={250}
          onValuesChangeStart={nonCollidingMultiSliderValuesChangeStart}
          onValuesChange={nonCollidingMultiSliderValuesChange}
          onValuesChangeFinish={nonCollidingMultiSliderValuesChangeFinish}
          min={6}
          max={100}
          step={1}
          allowOverlap={false}
          snapped
          minMarkerOverlapDistance={40}
          // customMarker={CustomMarker}
          customLabel={CustomLabel}
        />
      </View>
      <View style={styles.textLeft}>
        <Text style={styles.titleBig}>기간</Text>
        <Text style={styles.titleSmall}>(일)</Text>
      </View>
      <View style={styles.textCenter}>
        <Text
          style={[
            styles.contentBig,
            sliderOneChanging && {color: GlobalStyles.blue.color},
          ]}>
          {sliderOneValue}
        </Text>
        <Text style={styles.content}>일</Text>
      </View>
      <View style={styles.slider}>
        <MultiSlider
          values={sliderOneValue}
          min={7}
          max={30}
          step={1}
          snapped
          sliderLength={250}
          onValuesChangeStart={sliderOneValuesChangeStart}
          onValuesChange={sliderOneValuesChange}
          onValuesChangeFinish={sliderOneValuesChangeFinish}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  textLeft: {
    marginLeft: 50,
    marginTop: 30,
    flexDirection: 'row',
    alignSelf: 'flex-start',
  },
  textCenter: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  slider: {
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
  sliders: {
    margin: 20,
    width: 280,
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
});
