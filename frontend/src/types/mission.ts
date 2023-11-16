export type MissionInfo = {
  missionId: number;
  title: string;
  content: string;
  isComplete: boolean;
  missionType: number;
  dayCount: number;
};

export type PerformsInfo = {
  missionPerformsInfoRes: MissionInfo[];
  dayCount: number;
  missionCompleteCount: number;
};
