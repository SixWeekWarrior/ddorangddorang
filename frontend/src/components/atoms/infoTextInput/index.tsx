import {StyleSheet, Text, View, TextInput} from 'react-native';

import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import GlobalStyles, {height} from '../../../styles/GlobalStyles';

const InfoTextInput = ({
  title,
  placeholder,
  setValue,
}: {
  title: string;
  placeholder: string;
  setValue: (value: string) => void;
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.border}>|</Text>
      <View style={styles.inputArea}>
        <KeyboardAwareScrollView>
          <TextInput
            style={styles.input}
            placeholder={placeholder}
            fontSize={height * 12}
            placeholderTextColor={GlobalStyles.grey_3.color}
            onChangeText={(value: string) => setValue(value)}
          />
        </KeyboardAwareScrollView>
      </View>
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
});
export default InfoTextInput;
