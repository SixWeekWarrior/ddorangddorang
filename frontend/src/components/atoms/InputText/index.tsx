import * as React from 'react';
import {StyleSheet, TextInput} from 'react-native';
import GlobalStyles from '../../../styles/GlobalStyles';

export default function InputText() {
  const [text, onChangeText] = React.useState('초대코드를 입력하세요');

  return (
    <TextInput
      style={styles.input}
      onChangeText={onChangeText}
      value={text}
      placeholder="초대코드를 입력하세요"
    />
  );
}

const styles = StyleSheet.create({
  input: {
    width: '70%',
    height: 40,
    margin: 12,
    borderWidth: 0.5,
    padding: 10,
    borderRadius: 10,
    borderColor: GlobalStyles.grey_4.color,
    color: GlobalStyles.white_2.color,
  },
});
