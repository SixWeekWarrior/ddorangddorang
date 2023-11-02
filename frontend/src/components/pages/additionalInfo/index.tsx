import {StyleSheet, View} from 'react-native';
import AddInfoMolecules from '../../molecules/addInfoMolecules';

export const AdditionalInfo = ({
  navigation,
}: {
  navigation: any;
}): JSX.Element => {
  return (
    <View style={styles.container}>
      <AddInfoMolecules
        menu={'기본 정보'}
        text={`SSAFY 교육생으로서\n나의 정보를 입력해주세요.`}
        navigation={navigation}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default AdditionalInfo;
