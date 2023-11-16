import {atom} from 'recoil';

const KEY = 'chatting';

export const CurrentChattingState = atom<'마니또' | '마니띠'>({
  key: `${KEY}/currentChatting`,
  default: '마니띠',
});

const chatting = {CurrentChattingState};

export default chatting;
