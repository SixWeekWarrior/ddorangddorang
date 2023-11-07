import {StyleSheet, Text, View, TextInput} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import GlobalStyles from '../../../styles/GlobalStyles';
import {RadioButton} from 'react-native-paper';
import {useState} from 'react';

type InputInfoMoleculesProps = {
  title: string;
  placeholder?: string;
  type: string;
  data?: string[];
  onInputChange?: (text: string) => void;
};

export const InputInfoMolecules = ({
  placeholder,
  type,
  data,
  onInputChange,
}: InputInfoMoleculesProps) => {
  const [isMajor, setIsMajor] = useState('true');
  const renderInput = () => {
    switch (type) {
      case 'text':
        return (
          <View style={styles.inputArea}>
            <KeyboardAwareScrollView>
              <TextInput
                style={styles.input}
                placeholder={placeholder}
                placeholderTextColor={GlobalStyles.grey_3.color}
                onChangeText={onInputChange}
              />
            </KeyboardAwareScrollView>
          </View>
        );
      case 'select':
        return <InfoSelectInput />;
      case 'radio':
        return (
          <View style={styles.radioRowStyle}>
            <View style={styles.radioInnerContainer}>
              <Text style={styles.radioText}>전공</Text>
              <RadioButton
                value="전공"
                status={isMajor === 'true' ? 'checked' : 'unchecked'}
                onPress={() => {
                  setIsMajor('true');
                  onInputChange('true');
                }}
              />
            </View>
            <View style={styles.radioInnerContainer}>
              <Text style={styles.radioText}>비전공</Text>
              <RadioButton
                value="비전공"
                status={isMajor === 'false' ? 'checked' : 'unchecked'}
                onPress={() => {
                  setIsMajor('false');
                  onInputChange('false');
                }}
              />
            </View>
          </View>
        );
      default:
        return null;
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.border}>|</Text>
      {renderInput()}
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
    width: '50%',
    backgroundColor: GlobalStyles.white_1.color,
    borderRadius: 30,
  },

  input: {
    color: GlobalStyles.grey_3.color,
    fontSize: 16,
    lineHeight: 10,
    textAlign: 'center',
  },
  radioRowStyle: {
    width: 180,
    height: 45,
    justifyContent: 'center',
    paddingLeft: '10%',
    flexDirection: 'row',
    columnGap: 10,
  },
  radioInnerContainer: {
    flexDirection: 'row',
  },
  radioText: {
    fontSize: 15,
    color: GlobalStyles.black.color,
    paddingTop: 10,
  },
});
export default InputInfoMolecules;
