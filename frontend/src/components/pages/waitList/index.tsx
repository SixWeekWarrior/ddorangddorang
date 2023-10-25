import {View, StyleSheet} from 'react-native';
import MenuTop from '../../atoms/menuTop';
import GlobalStyles from '../../../styles/GlobalStyles';

export const WaitList = (): JSX.Element => {
  return (
    <View style={styles.container}>
      <MenuTop
        menu="대기목록"
        text="승인 대기 중인 사용자 목록입니다. 승인할 사용자를 추가해주세요."
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

export default WaitList;
