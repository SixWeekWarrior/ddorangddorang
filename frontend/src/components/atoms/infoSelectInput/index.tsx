import {StyleSheet, Text, View} from 'react-native';
import GlobalStyles from '../../../styles/GlobalStyles';
import SelectDropdown from 'react-native-select-dropdown';

export const InfoSelectInput = ({
  title,
  placeholder,
  data,
  setValue,
}: {
  title: string;
  placeholder: string;
  data: any[];
  setValue: (value: any) => void;
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.border}>|</Text>
      <SelectDropdown
        data={data}
        buttonStyle={styles.buttonStyle}
        defaultButtonText={placeholder}
        onSelect={(value: string) => setValue(value)}
        rowTextStyle={styles.dropdownRowTxtStyle}
        buttonTextStyle={styles.buttonTextStyle}
      />
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
  buttonStyle: {
    width: '50%',
    borderRadius: 30,
    backgroundColor: GlobalStyles.white_1.color,
  },
  dropdownRowTxtStyle: {
    color: GlobalStyles.black.color,
  },
  buttonTextStyle: {
    fontSize: GlobalStyles.content.fontSize,
    color: GlobalStyles.grey_3.color,
  },
});

export default InfoSelectInput;
