import * as React from 'react';
import {View, StyleSheet} from 'react-native';
import InputText from '../../atoms/InputText';
import BtnSm from '../../atoms/btnSm';

export default function InputTextwithBtn() {
  return (
    <View style={styles.container}>
      <InputText />
      <BtnSm text="입력" onPress={() => console.log('초대코드로 방 입장')} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'center',
    width: 300,
    alignSelf: 'center',
  },
});
