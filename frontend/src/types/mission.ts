export type MissionIdInfo = {
  missionId: number;
};

export type MissionPerformIdInfo = {
  missionPerformId: number;
};

export type MissionInfo = {
  missionId: number;
  title: string;
  content: string;
  isComplete: boolean;
  missionType: number;
  dayCount: number;
  missionCompleteCount: number;
};
