export type MissionInfo = {
  missionId: number;
};

export type MissionPerformInfo = {
  missionPerformId: number;
};

export type TodayMissionInfo = {
  missionId: number,
  title: string,
  content: string,
  isComplete: boolean,
  missionType: number,
  dayCount: number,
  missionCompleteCount: number,
}