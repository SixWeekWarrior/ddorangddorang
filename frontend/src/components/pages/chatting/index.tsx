import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import MenuTop from '../../molecules/menuTop';
import {useEffect, useRef, useState} from 'react';
import {noteApi} from '../../../apis';
import {useIsFocused} from '@react-navigation/native';
import {Note} from '../../../types/note';
import GlobalStyles, {height} from '../../../styles/GlobalStyles';
import {useSetRecoilState} from 'recoil';
import {chattingAtom} from '../../../modules';

const ChattingEle = ({
  from,
  content,
  navigation,
}: {
  from: '마니또' | '마니띠';
  content: string;
  navigation: any;
}) => {
  const setCurrentChatting = useSetRecoilState(
    chattingAtom.CurrentChattingState,
  );
  return (
    <TouchableOpacity
      onPress={() => {
        setCurrentChatting(from);
        navigation.navigate('ChattingDeatil');
      }}>
      <View
        style={{
          flexDirection: 'row',
          padding: height * 20,
          borderBottomWidth: 1,
          borderBottomColor: GlobalStyles.grey_4.color,
        }}>
        <Text
          style={{
            color: GlobalStyles.grey_1.color,
            marginRight: height * 10,
          }}>
          {from}
        </Text>

        <Text
          style={{
            color: GlobalStyles.grey_3.color,
            marginRight: height * 10,
          }}>
          {content}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export const Chatting = ({navigation}: {navigation: any}): JSX.Element => {
  const isFocused = useIsFocused();
  const [noteList, setNoteList] = useState<Note[]>([]);
  const [count, setCount] = useState(0);
  let [delay, setDelay] = useState(5000); // 5초

  function useInterval(callback: any, delay: any) {
    const savedCallback = useRef<any>();

    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);

    useEffect(() => {
      function tick() {
        if (savedCallback.current) {
          savedCallback.current();
        }
      }

      if (delay !== null) {
        let id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }, [delay]);
  }

  useEffect(() => {
    const getNotes = () => {
      console.log('API 요청을 실행합니다.', count);
      try {
        noteApi.getNotes().then(data => {
          setNoteList(data.data);
        });
      } catch (error) {
        console.log(error);
      }
    };
    // getNotes();
  }, [isFocused, count]);

  useInterval(() => {
    setCount(pre => pre + 1);
  }, delay);

  return (
    <View style={styles.container}>
      <MenuTop menu="채팅" text={`나의 마니또, 마니띠와\n대화를 해보세요.`} />
      <View style={styles.innerContainer}>
        <Text
          style={{
            color: GlobalStyles.grey_1.color,
            fontFamily: GlobalStyles.boldest.fontFamily,
            fontSize: height * 12,
          }}>
          채팅목록
        </Text>
        <View>
          <ChattingEle
            from="마니또"
            content="안녕하세요 반가워요"
            navigation={navigation}></ChattingEle>
          <ChattingEle
            from="마니띠"
            content="이효식인가요? 누군지 궁금해요"
            navigation={navigation}></ChattingEle>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    padding: height * 30,
    backgroundColor: GlobalStyles.white_2.color,
  },
});

export default Chatting;
