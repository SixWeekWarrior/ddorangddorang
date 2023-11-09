import {View, StyleSheet, Text, Pressable} from 'react-native';
import {UserProfile} from '../../../types/user';
import GlobalStyles from '../../../styles/GlobalStyles';
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
      <Pressable
        style={[styles.profilepic, isSelected && styles.selectedProfile]}
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
          setIsSelected(pre => !pre);
        }}
      />
      {/* <Image source={profileImage} /> */}
      <Text style={styles.profilename}>{name}</Text>
      <Text style={styles.profiledetail}>{generation}</Text>
      <Text style={styles.profiledetail}>{isMajor}</Text>
      <Text style={styles.profiledetail}>{classes}</Text>
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
    width: 70,
    height: 70,
    backgroundColor: GlobalStyles.grey_4.color,
    borderRadius: 100,
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

  selectedProfile: {
    borderColor: GlobalStyles.orange.color,
    borderWidth: 3,
  },
});

export default Profile;
