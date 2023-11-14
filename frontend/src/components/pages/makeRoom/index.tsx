import {View, StyleSheet} from 'react-native';
import GlobalStyles from '../../../styles/GlobalStyles';
import MenuTop from '../../molecules/menuTop';
import RangeSlider from '../../atoms/rangeSlider';
import BtnBig from '../../atoms/btnBig';
import {useEffect, useState} from 'react';
import {roomApi} from '../../../apis';
import {RoomInfo} from '../../../types/room';
import BeforeStart from '../beforeStart';

export const MakeRoom = ({navigation}: {navigation: any}): JSX.Element => {
  const [multiSliderValue, setMultiSliderValue] = useState([30, 70]);
  const [sliderValue, setSliderValue] = useState(15);
  const [tmpRoomInfo, setTmpRoomInfo] = useState<RoomInfo>({
    isOpen: true,
    maxMember: 0,
    minMember: 0,
    duration: 0,
  });

  const handleMultiSliderChange = (values: number[]) => {
    setMultiSliderValue(values);
  };

  const handleSliderChange = (values: number) => {
    setSliderValue(values);
  };

  useEffect(() => {
    setTmpRoomInfo(prevTmpRoomInfo => ({
      ...prevTmpRoomInfo,
      minMember: multiSliderValue[0],
      maxMember: multiSliderValue[1],
      duration: sliderValue,
    }));
  }, [multiSliderValue, sliderValue]);

  const handleSubmit = async () => {
    try {
      await roomApi.postRoom(tmpRoomInfo);
      navigation.navigate(BeforeStart);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <MenuTop
        menu="그룹 만들기"
        text={'그룹을 만들고\n친구들을 초대하세요!'}
      />
      <RangeSlider
        multiSliderValueProp={multiSliderValue}
        sliderValueProp={sliderValue}
        onMultiSliderChange={handleMultiSliderChange}
        onSliderChange={handleSliderChange}
      />
      <BtnBig onPress={handleSubmit} text="그룹 만들기" />
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
