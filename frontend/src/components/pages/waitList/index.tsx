import {View, StyleSheet} from 'react-native';
// import GlobalStyles from '../../../styles/GlobalStyles';
import MenuTop from '../../atoms/menuTop';

export const WaitList = (): JSX.Element => {
  return (
    <View style={styles.Container}>
      <MenuTop
        menu="대기목록"
        text="승인 대기 중인 사용자 목록입니다. 승인할 사용자를 추가해주세요."
      />
    </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    flex: 1,
  },
});

export default WaitList;
