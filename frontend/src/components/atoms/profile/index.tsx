import {View, StyleSheet, Image, Text, TouchableOpacity} from 'react-native';
import {UserProfile} from '../../../types/user';
import GlobalStyles, {height} from '../../../styles/GlobalStyles';
import {useEffect, useState} from 'react';

type ProfileProps = {
  selectedList: number[];
  setSelectedList: (value: number[]) => void;
  isAllChecked: boolean;
  toggle?: boolean;
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
  toggle,
}: Profile) => {
  const [isSelected, setIsSelected] = useState<boolean>(
    selectedList.includes(userId),
  );

  const handleProfilePress = () => {
    if (toggle) {
      toggleProfile();
    } else {
      defaultProfileToggle();
    }
  };

  const toggleProfile = () => {
    setIsSelected(!isSelected);
    setSelectedList(prevSelectedList => {
      if (isSelected) {
        // 이미 선택된 경우, 선택 해제
        return prevSelectedList.filter((data: number) => data !== userId);
      } else {
        // 선택되지 않은 경우, 다른 선택 해제 후 현재 선택
        return [userId];
      }
    });
  };

  const defaultProfileToggle = () => {
    if (isSelected) {
      // 이미 선택된 경우, 선택 해제
      setSelectedList(selectedList.filter((data: number) => data !== userId));
    } else {
      // 선택되지 않은 경우, 다른 선택 해제 후 현재 선택
      setSelectedList([userId]);
    }
    setIsSelected(!isSelected);
  };

  useEffect(() => {
    setIsSelected(isAllChecked);
  }, [isAllChecked]);

  return (
    <View style={styles.profileContainer}>
      <TouchableOpacity onPress={handleProfilePress}>
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
    borderWidth: 0.5,
    borderColor: GlobalStyles.grey_4.color,
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
