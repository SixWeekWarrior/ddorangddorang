import { atom } from "recoil";
import { MissionInfo, MissionPerformInfo, TodayMissionInfo } from "../types/mission";

const KEY = "MISSION";

const TmpMissionInfoState = atom<MissionInfo>({
  key: `${KEY}/tmpinfo`,
  default: {
    missionId: 0,
  },
});

const MissionInfoState = atom<MissionInfo>({
  key: `${KEY}/info`,
  default: {
    missionId: 0,
  },
});

const MissionPerformInfoState = atom<MissionPerformInfo>({
  key: `${KEY}/performinfo`,
  default: {
    missionPerformId: 0,
  },
});

const MissionTodayInfoState = atom<TodayMissionInfo>({
  key: `${KEY}/todaymissioninfo`,
  default: {
    missionId: 0,
    title: '',
    content: '',
    isComplete: false,
    missionType: 0,
  }
})

const mission = { 
  TmpMissionInfoState, 
  MissionInfoState, 
  MissionPerformInfoState,
  MissionTodayInfoState };

export default mission;