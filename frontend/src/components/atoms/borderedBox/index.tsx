import {StyleSheet, View} from 'react-native';
import GlobalStyles from '../../../styles/GlobalStyles';

type BorderedBoxProps = {
  renderContent: () => void;
};
export const BorderedBox = ({renderContent}: BorderedBoxProps) => {
  return <View style={styles.container}>{renderContent()}</View>;
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    top: '10%',
    width: '90%',
    height: '70%',
    borderRadius: 20,
    borderColor: GlobalStyles.grey_3.color,
    borderWidth: 0.5,
  },
});

export default BorderedBox;
