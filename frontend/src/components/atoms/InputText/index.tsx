import React, {useState} from 'react';
import {StyleSheet, TextInput} from 'react-native';
import GlobalStyles from '../../../styles/GlobalStyles';

export default function InputText() {
  const [text, onChangeText] = useState('');

  return (
    <TextInput
      style={styles.inputText}
      onChangeText={onChangeText}
      value={text}
      placeholder="초대코드를 입력하세요."
    />
  );
}

const styles = StyleSheet.create({
  inputText: {
    width: '70%',
    height: 40,
    marginRight: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    borderColor: GlobalStyles.grey_4.color,
    color: GlobalStyles.grey_3.color,
  },
});
