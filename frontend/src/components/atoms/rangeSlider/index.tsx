import React, {useState} from 'react';

import {StyleSheet, View, Text} from 'react-native';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
// import CustomMarker from './CustomMarker';
import CustomLabel from './customLabel';
import GlobalStyles from '../../../styles/GlobalStyles';

type RangeSliderProps = {
  multiSliderValueProp: number[];
  sliderValueProp: number;
  onMultiSliderChange: (values: number[]) => void;
  onSliderChange: (value: number) => void;
};

export const RangeSlider = ({
  multiSliderValueProp,
  sliderValueProp,
  onMultiSliderChange,
  onSliderChange,
}: RangeSliderProps) => {
  const [sliderChanging, setSliderChanging] = useState(false);
  const [multiSliderChanging, setMultiSliderChanging] = useState(false);
  const [sliderValue, setSliderValue] = useState([15]);
  const [multiSliderValue, setMultiSliderValue] = useState([30, 70]);

  const sliderValuesChangeStart = () => setSliderChanging(true);
  const sliderValuesChange = (values: number[]) => {
    setSliderValue(values[0]); // Update the sliderValue state
    onSliderChange(values[0]); // Notify parent component about the change
  };
  const sliderValuesChangeFinish = () => {
    setSliderChanging(false);
  };
  const MultiSliderValuesChangeStart = () => setMultiSliderChanging(true);
  const MultiSliderValuesChange = (values: number[]) => {
    setMultiSliderValue(values); // Update the multiSliderValue state
    onMultiSliderChange(values); // Notify parent component about the change
  };
  const MultiSliderValuesChangeFinish = () => setMultiSliderChanging(false);

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
          {multiSliderValue[0]}
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
          {multiSliderValue[1]}
        </Text>
        <Text style={styles.content}>명</Text>
      </View>
      <View style={styles.slider}>
        <MultiSlider
          values={[multiSliderValue[0], multiSliderValue[1]]}
          sliderLength={250}
          onValuesChangeStart={MultiSliderValuesChangeStart}
          onValuesChange={MultiSliderValuesChange}
          onValuesChangeFinish={MultiSliderValuesChangeFinish}
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
            sliderChanging && {color: GlobalStyles.blue.color},
          ]}>
          {sliderValue}
        </Text>
        <Text style={styles.content}>일</Text>
      </View>
      <View style={styles.slider}>
        <MultiSlider
          values={sliderValue}
          min={7}
          max={30}
          step={1}
          snapped
          sliderLength={250}
          onValuesChangeStart={sliderValuesChangeStart}
          onValuesChange={sliderValuesChange}
          onValuesChangeFinish={sliderValuesChangeFinish}
        />
      </View>
    </View>
  );
};

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

export default RangeSlider;
