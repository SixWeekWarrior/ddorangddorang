import {StyleSheet} from 'react-native';
import GlobalStyles from '../../../styles/GlobalStyles';
import SelectDropdown from 'react-native-select-dropdown';

export const InfoSelectInput = ({
  placeholder,
  data,
  setValue,
}: {
  placeholder: string;
  data: string[];
  setValue: (value: string) => void;
}) => {
  return (
    <SelectDropdown
      data={data}
      buttonStyle={styles.buttonStyle}
      defaultButtonText={placeholder}
      onSelect={(selectedItem: string) => setValue(selectedItem)}
      rowTextStyle={styles.dropdownRowTxtStyle}
      buttonTextStyle={styles.buttonTextStyle}
    />
  );
};

const styles = StyleSheet.create({
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
