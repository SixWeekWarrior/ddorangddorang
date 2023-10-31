import {View, StyleSheet} from 'react-native';
import InputText from '../../atoms/inputText';
import BtnSm from '../../atoms/btnSm';

type InputTextwithBtnProps = {
  navigation: any;
  btnText: string;
  destination: string;
};
export const InputTextwithBtn = ({
  navigation,
  btnText,
  destination,
}: InputTextwithBtnProps): JSX.Element => {
  return (
    <View style={styles.container}>
      <InputText />
      <BtnSm
        text={btnText}
        onPress={() => {
          navigation.navigate(destination);
        }}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: 260,
    height: 40,
    marginTop: 13,
  },
});

export default InputTextwithBtn;
