import {View, StyleSheet} from 'react-native';
// import GlobalStyles from '../../../styles/GlobalStyles';
import MenuTop from '../../molecules/menuTop';

export const Chatting = (): JSX.Element => {
  return (
    <View style={styles.container}>
      <MenuTop
        menu="채팅"
        text={'오늘의 미션을 완수하고\n미션 도장을 찍어봐요!'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Chatting;
