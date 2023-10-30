import {StyleSheet, View} from 'react-native';
import MenuTop from '../../atoms/menuTop';

export const MissionToday = () => {
  return (
    <View style={style.container}>
      <MenuTop
        menu="오늘의 미션"
        text={`오늘의 미션을 완수하고\n미션 도장을 찍어봐요!`}
      />
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default MissionToday;
