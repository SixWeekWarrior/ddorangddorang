import {View, StyleSheet, Text} from 'react-native';
import MenuTop from '../../molecules/menuTop';
import GlobalStyles from '../../../styles/GlobalStyles';
import {useEffect, useState} from 'react';
import BtnBig from '../../atoms/btnBig';
import {UserProfile} from '../../../types/user';
import {Profile} from '../../atoms/profile';
import {roomApi} from '../../../apis';

const MatchGuess = ({navigation}: {navigation: any}): JSX.Element => {
  const [isAllChecked, setisAllChecked] = useState<boolean>(false);
  const [selectedList, setSelectedList] = useState<number[]>([]);
  const [guessList, setGuessList] = useState<UserProfile[]>([]);

  useEffect(() => {
    const getAllMembers = () => {
      try {
        // roomApi.getRoomWaiting().then(data => {
        //   setGuessList(data.data);
        // });
      } catch (error) {
        console.log(error);
      }
    };
    getAllMembers();
  }, []);

  useEffect(() => {
    console.log('지목된 사람 id', selectedList);
  }, [selectedList]);

  const handleSubmit = () => {
    try {
      const data = selectedList.map((item: number) => ({userId: item}));
      roomApi
        .postRoomResponse(data)
        .then(() => navigation.navigate('MatchStatus', {showNotice: true}));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <MenuTop
        menu="마니또 추측"
        text={'최근 들어 나를 도와주는\n친구가 보이나요?'}
      />
      <View style={styles.innerContainer}>
        <Text style={styles.title}>내 마니또를 추측해주세요.</Text>
        <Text style={styles.subtitle}>
          마니또 종료일까지 계속 추측을 바꿀 수 있어요 .
        </Text>
      </View>
      <View style={styles.listContainer}>
        {guessList.map((item: UserProfile) => (
          <Profile
            key={item.userId}
            name={item.name}
            generation={item.generation}
            userId={item.userId}
            classes={item.classes}
            isMajor={item.isMajor}
            isAllChecked={isAllChecked}
            profileImage={item.profileImage}
            selectedList={selectedList}
            setSelectedList={setSelectedList}
            toggle={true}
          />
        ))}
      </View>
      <View style={styles.btnContainer}>
        <BtnBig
          onPress={handleSubmit}
          text="선택완료"
          disabled={!selectedList}
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
