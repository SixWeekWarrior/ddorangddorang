import {View, StyleSheet, Text, FlatList, Pressable} from 'react-native';
import MenuTop from '../../molecules/menuTop';
import GlobalStyles from '../../../styles/GlobalStyles';
import {useState} from 'react';
import BtnBig from '../../atoms/btnBig';

const MatchGuess = ({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}): JSX.Element => {
  const {showNotice} = route.params ? route.params : {showNotice: false};

  const [data, setData] = useState(
    new Array(50).fill(null).map((_, index) => ({
      id: index.toString(),
      name: '홍재연',
      detail: '전공 / 7반',
      selected: false,
    })),
  );
  const [selectedProfile, setSelectedProfile] = useState<string | null>(null);

  const toggleSelect = (id: string) => {
    const newData = data.map(item => {
      if (item.id === id) {
        item.selected = !item.selected;
        setSelectedProfile(item.selected ? id : null);
      } else { 
        item.selected = false;
      }
      return item;
    });
    setData(newData);
  };

  const handleSubmit = () => {
    navigation.navigate('MatchStatus', {showNotice: true});
  };

  const renderItem = ({item}: any) => (
    <View style={styles.profileContainer}>
      <Pressable
        style={[styles.profilepic, item.selected && styles.selectedProfile]}
        onPress={() => toggleSelect(item.id)}
      />
      <Text style={styles.profilename}>{item.name}</Text>
      <Text style={styles.profiledetail}>{item.detail}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <MenuTop
        menu="마니또 추측"
        text={`최근 들어 나를 도와주는\n친구가 보이나요?`}
      />
      <View style={styles.innerContainer}>
        <Text style={styles.title}>내 마니또를 추측해주세요.</Text>
        <Text style={styles.subtitle}>
          마니또 종료일까지 계속 추측을 바꿀 수 있어요 .
        </Text>
      </View>
      <View style={styles.listContainer}>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          numColumns={4}
          style={{flexGrow: 0}}
        />
      </View>
      <View style={styles.btnContainer}>
        <BtnBig
          onPress={handleSubmit}
          text="선택완료"
          disabled={!selectedProfile}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    padding: 24,
    flex: 0.5,
  },
  title: {
    color: GlobalStyles.grey_2.color,
    fontFamily: GlobalStyles.home_title.fontFamily,
    fontSize: GlobalStyles.home_title.fontSize,
  },
  subtitle: {
    color: GlobalStyles.orange.color,
    fontFamily: GlobalStyles.content.fontFamily,
    fontSize: GlobalStyles.content.fontSize,
    marginTop: -5,
  },
  listContainer: {
    flex: 3,
    alignSelf: 'center',
  },
  btnContainer: {
    flex: 0.7,
    marginBottom: 40,
  },
  profileContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 7,
  },
  profilepic: {
    width: 70,
    height: 70,
    backgroundColor: GlobalStyles.grey_4.color,
    borderRadius: 100,
  },
  selectedProfile: {
    borderColor: GlobalStyles.orange.color,
    borderWidth: 3,
  },
  profilename: {
    fontFamily: GlobalStyles.section_title.fontFamily,
    fontSize: GlobalStyles.sub_title.fontSize,
    color: GlobalStyles.grey_2.color,
  },
  profiledetail: {
    fontFamily: GlobalStyles.sub_title.fontFamily,
    fontSize: GlobalStyles.sub_title.fontSize,
    color: GlobalStyles.grey_2.color,
    marginTop: -15,
  },
});

export default MatchGuess;
