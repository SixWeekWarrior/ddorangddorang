import {Image, StyleSheet, Text, View} from 'react-native';
import BorderedBox from '../../atoms/borderedBox';
import BlockImg from '../../../assets/blockImg.png';
import TitleAtom from '../../atoms/titleAtom';
import GlobalStyles from '../../../styles/GlobalStyles';
import InputInfoMolecules from '../inputInfoMolecules';
import {useNavigation} from '@react-navigation/native';

type AddInfoMoleculesProps = {
  menu: string;
  text: string;
};

export const AddInfoMolecules = ({menu, text}: AddInfoMoleculesProps) => {
  const navigation = useNavigation();
  const renderContent = (menu: string) => {
    switch (menu) {
      case '기본 정보':
        return (
          <View style={styles.contentContainer}>
            <InputInfoMolecules
              title="MBTI"
              placeholder="MBTI를 입력해주세요"
              type="text"
            />
            <InputInfoMolecules
              title="요즘 고민"
              placeholder="고민을 입력해주세요"
              type="text"
            />
            <InputInfoMolecules
              title="좋아하는 것"
              placeholder="좋아하는 것을 입력해주세요"
              type="text"
            />
            <InputInfoMolecules
              title="싫어하는 것"
              placeholder="싫어하는 것을 입력해주세요"
              type="text"
            />
            <Text
              style={styles.skipText}
              onPress={() => navigation.navigate('Enter')}>
              건너뛰기
            </Text>
          </View>
        );
      case '추가 정보':
        return <View style={styles.test}></View>;
      default:
        return null;
    }
  };
  const renderTitle = () => {
    return (
      <View style={styles.container}>
        <Image source={BlockImg} style={styles.blockImg} />
        <View style={styles.title}>
          <TitleAtom
            menu={menu}
            text={text}
            menuColor={GlobalStyles.green.color}
            textColor={GlobalStyles.grey_3.color}
          />
        </View>
        <View style={styles.content}>{renderContent(menu)}</View>
      </View>
    );
  };

  return (
    <BorderedBox renderContent={renderTitle} /> // Remove the parentheses when passing the function
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  blockImg: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: '20%',
  },
  title: {
    flex: 1,
    marginLeft: '10%',
    marginTop: 10,
  },
  content: {
    flex: 3,
  },
  skipText: {
    fontFamily: GlobalStyles.section_title.fontFamily,
    fontSize: 16,
    color: GlobalStyles.grey_3.color,
    marginTop: 10,
    alignSelf: 'flex-end',
    width: '100%',
  },
  contentContainer: {
    flex: 1,
    alignSelf: 'center',
    rowGap: 15,
  },
  test: {},
});
export default AddInfoMolecules;
