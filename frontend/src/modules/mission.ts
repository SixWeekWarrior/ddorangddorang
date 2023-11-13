import {atom} from 'recoil';
import {
  MissionIdInfo,
  MissionPerformIdInfo,
  MissionInfo,
} from '../types/mission';

const KEY = 'MISSION';

const MissionIdState = atom<MissionIdInfo>({
  key: `${KEY}/idinfo`,
  default: {
    missionId: 0,
  },
});

const MissionPerformIdState = atom<MissionPerformIdInfo>({
  key: `${KEY}/performidinfo`,
  default: {
    missionPerformId: 0,
  },
});

const MissionInfoState = atom<MissionInfo>({
  key: `${KEY}/info`,
  default: {
    missionId: 0,
    title: '',
    content: '',
    isComplete: false,
    missionType: 0,
    dayCount: 0,
    missionCompleteCount: 0,
  },
});

const mission = {
  MissionIdState,
  MissionPerformIdState,
  MissionInfoState,
};

export default mission;
