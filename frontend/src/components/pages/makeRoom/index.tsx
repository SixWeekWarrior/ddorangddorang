import {View, StyleSheet} from 'react-native';
import GlobalStyles from '../../../styles/GlobalStyles';
import MenuTop from '../../molecules/menuTop';
import RangeSlider from '../../atoms/rangeSlider';
import BtnBig from '../../atoms/btnBig';
import {useState} from 'react';
import {useRecoilState} from 'recoil';
import {roomApi} from '../../../apis';

import room from '../../../modules/room';

export const MakeRoom = ({navigation}: {navigation: any}): JSX.Element => {
  const [multiSliderValue, setMultiSliderValue] = useState([30, 70]);
  const [sliderValue, setSliderValue] = useState(15);
  const [selectedCount, setSelectedCount] = useState(0);
  const [roomInfo, setRoomInfo] = useRecoilState(room.RoomInfoState);

  const handleMultiSliderChange = (values: number[]) => {
    setMultiSliderValue(values);
  };
  const handleSliderChange = (values: number) => {
    setSliderValue(values);
  };

  const handleSubmit = async () => {
    try {
      await setRoomInfo({
        isOpen: true,
        minMember: multiSliderValue[0],
        maxMember: multiSliderValue[1],
        duration: sliderValue,
      });
      await roomApi.postRoom(roomInfo);
      navigation.navigate('BeforeStart', {
        sliderValue: sliderValue,
        multiSliderValue: multiSliderValue,
        selectedCount: selectedCount,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <MenuTop
        menu="그룹 만들기"
        text={`마니또를 함께 할 그룹을 만들고\n친구들을 초대하세요!`}
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
