import {Image, StyleSheet, Text, View} from 'react-native';
import BorderedBox from '../../atoms/borderedBox';
import BlockImg from '../../../assets/blockImg.png';
import TitleAtom from '../../atoms/titleAtom';
import GlobalStyles from '../../../styles/GlobalStyles';
import InputInfoMolecules from '../inputInfoMolecules';
import {useNavigation} from '@react-navigation/native';
import {userApi} from '../../../apis';
import {useState} from 'react';

type AddInfoMoleculesProps = {
  menu: string;
  text: string;
  onInputChange: (title: string, value: string) => void;
  onSkip?: () => void;
};

export const AddInfoMolecules = ({
  menu,
  text,
  onInputChange,
  onSkip,
}: AddInfoMoleculesProps) => {
  const regions = ['서울', '대전', '광주', '구미', '부울경'];
  const group = Array.from({length: 20}, (_, index) => (index + 1).toString());
  const floor = Array.from({length: 20}, (_, index) => (index + 1).toString());

  const renderContent = (menu: string) => {
    switch (menu) {
      case '기본 정보':
        return (
          <View style={styles.contentContainer}>
            <InputInfoMolecules
              title="이름"
              placeholder="이름을 입력해주세요"
              type="text"
              onInputChange={(text: string) => onInputChange('name', text)}
            />
            <InputInfoMolecules
              title="지역"
              placeholder="지역을 선택하세요"
              type="select"
              data={regions}
              onInputChange={(text: string) => onInputChange('region', text)}
            />
            <InputInfoMolecules
              title="전공"
              type="radio"
              onInputChange={(text: string) => onInputChange('isMajor', text)}
            />
            <InputInfoMolecules
              title="반"
              placeholder="반을 선택하세요"
              type="select"
              data={group}
              onInputChange={(text: string) => onInputChange('group', text)}
            />
            <InputInfoMolecules
              title="층"
              placeholder="층을 선택하세요"
              type="select"
              data={floor}
              onInputChange={(text: string) => onInputChange('floor', text)}
            />
          </View>
        );
      case '추가 정보':
        return (
          <View style={styles.contentContainer}>
            <InputInfoMolecules
              title="MBTI"
              placeholder="MBTI를 입력해주세요"
              type="text"
              onInputChange={(text: string) => onInputChange('MBTI', text)}
            />
            <InputInfoMolecules
              title="요즘 고민"
              placeholder="고민을 입력해주세요"
              type="text"
              onInputChange={(text: string) =>
                onInputChange('currentConcern', text)
              }
            />
            <InputInfoMolecules
              title="좋아하는 것"
              placeholder="좋아하는 것을 입력해주세요"
              type="text"
              onInputChange={(text: string) => onInputChange('likes', text)}
            />
            <InputInfoMolecules
              title="싫어하는 것"
              placeholder="싫어하는 것을 입력해주세요"
              type="text"
              onInputChange={(text: string) => onInputChange('dislikes', text)}
            />
            <Text style={styles.skipText} onPress={onSkip}>
              건너뛰기
            </Text>
          </View>
        );

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

  return <BorderedBox renderContent={renderTitle} />;
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
