import {View, StyleSheet} from 'react-native';
import GlobalStyles from '../../../styles/GlobalStyles';
import MenuTop from '../../molecules/menuTop';
import RangeSlider from '../../atoms/rangeSlider';
import BtnBig from '../../atoms/btnBig';
import {useState} from 'react';

export const MakeRoom = ({navigation: {navigate}}): JSX.Element => {
  const [multiSliderValue, setMultiSliderValue] = useState([10, 70]);
  const [sliderValue, setSliderValue] = useState(15);
  const selectedCount = useState(0);
  const handleMultiSliderChange = (values: number[]) => {
    setMultiSliderValue(values);
  };

  const handleSliderChange = (values: number) => {
    setSliderValue(values);
  };
  return (
    <View style={styles.container}>
      <MenuTop
        menu="그룹 만들기"
        text={`그룹을 만들고\n친구들을 초대하세요!`}
      />
      <RangeSlider
        multiSliderValueProp={multiSliderValue}
        sliderValueProp={sliderValue}
        onMultiSliderChange={handleMultiSliderChange}
        onSliderChange={handleSliderChange}
      />
      <BtnBig
        onPress={() => {
          navigate('BeforeStart', {
            sliderValue: sliderValue,
            multiSliderValue: multiSliderValue,
            selectedCount: selectedCount,
          });
        }}
        text="그룹 만들기"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GlobalStyles.white_2.color,
  },
});

export default MakeRoom;
