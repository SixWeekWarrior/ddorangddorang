import {StyleSheet, View} from 'react-native';
import MenuTop from '../../molecules/menuTop';

export const AddInfo = ({navigation}: {navigation: any}): JSX.Element => {
  return (
    <View style={styles.container}>
      <MenuTop
        menu="추가정보 입력"
        text="가입 이전 필요한 추가정보를 입력해주세요."></MenuTop>
    </View>
    // <Text style>SSAFY 정보</Text>
    // <Text>추가 정보</Text>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default AddInfo;
