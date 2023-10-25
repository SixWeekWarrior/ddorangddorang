import {View, StyleSheet} from 'react-native';
import GlobalStyles from '../../../styles/GlobalStyles';
import MenuTop from '../../atoms/menuTop';

export const MakeRoom = (): JSX.Element => {
  return (
    <View style={styles.container}>
      <MenuTop
        menu="방 만들기"
        text={`마니또를 함께 할 그룹을 만들고\n친구들을 초대하세요!`}
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
