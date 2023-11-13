export type MissionInfo = {
  missionId: number;
  title: string;
  content: string;
  isComplete: boolean;
  missionType: number;
};

export type PerfomrsInfo = {
  missionPerformsInfoRes: MissionInfo[];
  dayCount: number;
  missionCompleteCount: number;
};

export type TodayMissionInfo = {
  missionId: number,
  title: string,
  content: string,
  isComplete: boolean,
  missionType: number,
}