import {View, StyleSheet} from 'react-native';
import InputText from '../../atoms/inputText';
import BtnSm from '../../atoms/btnSm';
import {useState} from 'react';

type InputTextwithBtnProps = {
  navigation: any;
  btnText: string;
  destination?: string;
  onPress?: () => void;
  onChange?: (text: string) => void;
};

export const InputTextwithBtn = ({
  navigation,
  btnText,
  destination,
  onPress,
  onChange,
}: InputTextwithBtnProps): JSX.Element => {
  const [enteredText, setEnteredText] = useState('');

  const handleInputChange = (text: string) => {
    setEnteredText(text);
    if (onChange) {
      onChange(text);
    }
  };

  const handlePress = () => {
    if (destination) {
      navigation.navigate(destination);
    }
    if (onPress) {
      onPress();
    }
  };

  return (
    <View style={styles.container}>
      <InputText value={enteredText} onChangeText={handleInputChange} />
      <BtnSm text={btnText} onPress={handlePress} />
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
