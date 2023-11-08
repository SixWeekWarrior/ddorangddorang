import {StyleSheet, Text, View} from 'react-native';
import GlobalStyles from '../../../styles/GlobalStyles';
import {RadioButton} from 'react-native-paper';
import {useState} from 'react';

const InfoRadioInput = ({
  title,
  data,
  setValue,
}: {
  title: string;
  data: Array<string>;
  setValue: (value: string) => void;
}) => {
  const [checked, setChecked] = useState('first');
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.border}>|</Text>
      <View style={styles.radioRowStyle}>
        <View style={styles.radioInnerContainer}>
          <Text style={styles.radioText}>전공</Text>
          <RadioButton
            color="#34A853"
            value={data[0]}
            status={checked === data[0] ? 'checked' : 'unchecked'}
            onPress={() => {
              setChecked(data[0]);
              setValue(data[0]);
            }}
          />
        </View>
        <View style={styles.radioInnerContainer}>
          <Text style={styles.radioText}>비전공</Text>
          <RadioButton
            color="#34A853"
            value={data[1]}
            status={checked === data[1] ? 'checked' : 'unchecked'}
            onPress={() => {
              setChecked(data[1]);
              setValue(data[1]);
            }}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
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
  radioRowStyle: {
    width: 180,
    height: 40,
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
    paddingTop: 8,
  },
});

export default InfoRadioInput;
