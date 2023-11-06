import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Picker,
  RadioButton,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import GlobalStyles from '../../../styles/GlobalStyles';

type InputInfoMoleculesProps = {
  title: string;
  placeholder: string;
  type: string;
  onChangeText?: (text: string) => void;
};
export const InputInfoMolecules = ({
  title,
  placeholder,
  type,
  onChangeText,
}: InputInfoMoleculesProps) => {
  const renderInput = () => {
    switch (type) {
      case 'text':
        return (
          <KeyboardAwareScrollView>
            <TextInput
              style={styles.input}
              placeholder={placeholder}
              placeholderTextColor={GlobalStyles.grey_3.color}
              onChangeText={onChangeText}
            />
          </KeyboardAwareScrollView>
        );
      case 'select':
        return (
          <Picker style={styles.input}>{/* Add Picker options here */}</Picker>
        );
      case 'radio':
        return <RadioButton style={styles.input} />;
      default:
        return null;
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.border}>|</Text>
      <View style={styles.inputArea}>{renderInput()}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
  },
  title: {
    color: GlobalStyles.grey_2.color,
    fontFamily: GlobalStyles.home_title.fontFamily,
    fontSize: 15,
  },
  border: {
    color: GlobalStyles.yellow.color,
    fontFamily: GlobalStyles.section_title.fontFamily,
    marginHorizontal: 10,
  },
  inputArea: {
    width: 180,
    height: 45,
    backgroundColor: GlobalStyles.white_1.color,
    paddingLeft: 15,
    borderRadius: 30,
  },
  input: {
    color: GlobalStyles.grey_3.color,
    lineHeight: 10,
  },
});
export default InputInfoMolecules;
