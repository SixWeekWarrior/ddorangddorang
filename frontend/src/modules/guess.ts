import {atom} from 'recoil';
import {GuessInfo} from '../types/guess';

const KEY = 'GUESS';

export const GuessInfoState = atom<GuessInfo>({
  key: `${KEY}/guessinfo`,
  default: {
    id: 0,
    participantId: 0,
    manito: 0,
    isCorrect: true,
    deletedAt: '',
  },
});
