import {View, StyleSheet, Image, Text, TouchableOpacity} from 'react-native';
import {UserProfile} from '../../../types/user';
import GlobalStyles, {height} from '../../../styles/GlobalStyles';
import {useEffect, useState} from 'react';

type ProfileProps = {
  selectedList: number[];
  setSelectedList: (value: number[]) => void;
  isAllChecked: boolean;
};

type Profile = ProfileProps & UserProfile;

export const Profile = ({
  userId,
  name,
  classes,
  profileImage,
  generation,
  isMajor,
  selectedList,
  setSelectedList,
  isAllChecked,
}: Profile) => {
  const [isSelected, setIsSelected] = useState<boolean>(false);

  useEffect(() => {
    if (isAllChecked) {
      !selectedList.includes(userId) &&
        setSelectedList([userId, ...selectedList]);
    } else {
      const newSelectedList = selectedList.filter((data: number) => {
        return data !== userId;
      });
      setSelectedList(newSelectedList);
    }
    setIsSelected(isAllChecked);
  }, [isAllChecked]);

  return (
    <View style={styles.profileContainer}>
      <TouchableOpacity
        onPress={() => {
          if (isSelected) {
            // 삭제
            const newSelectedList = selectedList.filter((data: number) => {
              return data !== userId;
            });
            setSelectedList(newSelectedList);
          } else {
            // 추가
            setSelectedList([userId, ...selectedList]);
          }
          setIsSelected(prev => !prev);
        }}>
        <Image
          source={{uri: profileImage}}
          style={[styles.profilepic, isSelected && styles.selectedProfile]}
        />
      </TouchableOpacity>
      <Text style={styles.profilename}>{name}</Text>
      <Text style={styles.profiledetail}>
        {isMajor ? '전공' : '비전공'} | {classes}반
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  profileContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 7,
  },

  profilepic: {
    width: 60,
    height: 60,
    borderRadius: 100,
  },
  profilename: {
    fontFamily: GlobalStyles.section_title.fontFamily,
    fontSize: height * 12,
    color: GlobalStyles.grey_2.color,
    marginTop: -8,
  },
  profiledetail: {
    fontFamily: GlobalStyles.sub_title.fontFamily,
    fontSize: height * 10,
    color: GlobalStyles.grey_2.color,
    marginTop: -20,
  },

  selectedProfile: {
    borderColor: GlobalStyles.orange.color,
    borderWidth: 3,
  },
});

export default Profile;
