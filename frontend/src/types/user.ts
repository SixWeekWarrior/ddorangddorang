export type UserInfo = {
  name: string;
  generation: number;
  isMajor: boolean;
  gender: boolean;
  campus: number;
  classes: number;
  floor: number;
  like: string;
  hate: string;
  mbti: string;
  worry: string;
  mood: string;
  color: string;
};

export type UserMoreInfo = {
  mbti: string;
  likes: string;
  hate: string;
  worry: string;
};

export type UserSsafyInfo = {
  profileImage: string;
  classes: number;
  floor: number;
};

export type UserProfile = {
  userId: number;
  name: string;
  profileImage: string;
  isMajor: boolean;
  generation: number;
  classes: number;
};
