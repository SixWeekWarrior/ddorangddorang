import {View, StyleSheet} from 'react-native';
import GlobalStyles from '../../../styles/GlobalStyles';

export const Misson = (): JSX.Element => {
  return <View style={styles.container}></View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: GlobalStyles.white_2.color,
  },
});

export default Misson;
