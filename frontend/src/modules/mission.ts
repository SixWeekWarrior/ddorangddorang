import {atom} from 'recoil';
import {MissionInfo, PerformsInfo, TodayMissionInfo} from '../types/mission';

const KEY = 'MISSION';

const MissionInfoState = atom<MissionInfo>({
  key: `${KEY}/info`,
  default: {
    missionId: 0,
    title: '',
    content: '',
    isComplete: true,
    missionType: 0,
  },
});

const MissionPerformsInfoState = atom<PerformsInfo>({
  key: `${KEY}/performsinfo`,
  default: {
    missionPerformsInfoRes: [],
    dayCount: 0,
    missionCompleteCount: 0,
  },
});

const TodayMissionInfoState = atom<TodayMissionInfo>({
  key: `${KEY}/todayinfo`,
  default: {
    missionId: 0,
    title: '',
    content: '',
    isComplete: true,
    missionType: 0,
  },
});

const mission = {
  MissionInfoState,
  MissionPerformsInfoState,
  TodayMissionInfoState,
};

export default mission;
