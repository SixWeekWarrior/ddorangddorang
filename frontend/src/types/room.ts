export type RoomInfo = {
  isOpen: boolean;
  minMember: number;
  maxMember: number;
  duration: number;
};

export type RoomEndInfo = {
  endDate: RoomEndDate;
  daysLeft: number;
  currentDays: number;
};

export type RoomEndDate = {
  year: number;
  month: number;
  date: number;
};
