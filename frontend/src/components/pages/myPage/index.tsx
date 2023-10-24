import {View, StyleSheet} from 'react-native';
// import GlobalStyles from '../../../styles/GlobalStyles';
import MenuTop from '../../atoms/menuTop';

export const MyPage = (): JSX.Element => {
  return (
    <View style={styles.Container}>
      <MenuTop
        menu="마이페이지"
        text={`오늘의 기분과 옷 색깔을 설정하고, \n추가정보를 입력해보세요!`}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    flex: 1,
  },
});

export default MyPage;
