import {View, StyleSheet, Text} from 'react-native';
import GlobalStyles from '../../../styles/GlobalStyles';
import MenuTop from '../../atoms/menuTop';
import GroupSummary from '../../atoms/groupSummary';
import BtnReg from '../../atoms/btnReg';
import CodeForm from '../../atoms/codeForm';

export const BeforeStart = ({navigation, route}): JSX.Element => {
  const {sliderValue, multiSliderValue, selectedCount} = route.params;
  const isStartButtonDisabled = !(
    selectedCount >= multiSliderValue[0] && selectedCount <= multiSliderValue[1]
  );

  return (
    <View style={styles.container}>
      <MenuTop
        menu="그룹 만들기"
        text={`마니또를 함께 할 그룹을 만들고\n친구들을 초대하세요!`}
      />
      <View style={styles.sumContainer}>
        <GroupSummary
          period={sliderValue}
          min={multiSliderValue[0]}
          max={multiSliderValue[1]}
          selectedCount={selectedCount}
        />
      </View>
      <View style={styles.codeContainer}>
        <Text style={styles.code}>초대코드</Text>
        <CodeForm code="WUJtQT09" />
      </View>
      <View style={styles.btnContainer}>
        <BtnReg
          onPress={() => {
            navigation.navigate('WaitList', {
              sliderValue: sliderValue,
              multiSliderValue: multiSliderValue,
            });
          }}
          text="대기 목록"
          color={GlobalStyles.black.color}
          disabled={false}
        />
        <BtnReg
          onPress={() => {
            navigation.navigate('Home');
          }}
          text="시작"
          color={GlobalStyles.green.color}
          disabled={isStartButtonDisabled}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GlobalStyles.white_2.color,
  },
  code: {
    fontFamily: GlobalStyles.sub_title.fontFamily,
    fontSize: GlobalStyles.sub_title.fontSize,
    color: GlobalStyles.grey_2.color,
    alignSelf: 'flex-start',
    marginLeft: '15%',
  },
  sumContainer: {
    flex: 4,
  },
  codeContainer: {
    flex: 2,
    alignItems: 'center',
  },
  btnContainer: {
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'center',
    width: '80%',
    justifyContent: 'space-between',
  },
});

export default BeforeStart;
