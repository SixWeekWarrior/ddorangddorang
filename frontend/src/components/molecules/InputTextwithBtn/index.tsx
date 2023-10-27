import {View, StyleSheet} from 'react-native';
import InputText from '../../atoms/inputText';
import BtnSm from '../../atoms/btnSm';

export default function InputTextwithBtn({
  navigation,
}: {
  navigation: any;
}): JSX.Element {
  return (
    <View style={styles.container}>
      <InputText />
      <BtnSm
        text="입장"
        onPress={() => {
          navigation.navigate('EnterWait');
        }}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: 260,
    height: 40,
    marginTop: 13,
  },
});
