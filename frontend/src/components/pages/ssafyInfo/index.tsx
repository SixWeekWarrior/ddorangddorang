import {View, StyleSheet} from 'react-native';
import GlobalStyles from '../../../styles/GlobalStyles';

export const SsafyInfo = () => {
  return <View style={styles.container}></View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GlobalStyles.white_2.color,
  },
});

export default SsafyInfo;
