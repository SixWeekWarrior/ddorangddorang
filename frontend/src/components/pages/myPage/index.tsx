import {View, StyleSheet} from 'react-native';
import MenuTop from '../../atoms/menuTop';
import GlobalStyles from '../../../styles/GlobalStyles';

export const MyPage = (): JSX.Element => {
  return (
    <View style={styles.container}>
      <MenuTop
        menu="마이페이지"
        text={`오늘의 기분과 옷 색깔을 설정하고, \n추가정보를 입력해보세요!`}
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

export default MyPage;
