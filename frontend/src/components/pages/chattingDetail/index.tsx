import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
// import GlobalStyles from '../../../styles/GlobalStyles';
import MenuTop from '../../molecules/menuTop';
import {useRecoilValue} from 'recoil';
import {chattingAtom} from '../../../modules';
import {useEffect, useRef, useState} from 'react';
import {noteApi} from '../../../apis';
import {useIsFocused} from '@react-navigation/native';
import {Text} from 'react-native-paper';
import GlobalStyles, {height} from '../../../styles/GlobalStyles';

type ChattingUnit = {
  isSentByMe: boolean;
  content: string;
};

const ChattingUnit = ({
  isSentByMe = true,
  content,
}: {
  isSentByMe?: boolean;
  content: string;
}) => {
  const currentChatting = useRecoilValue(chattingAtom.CurrentChattingState);

  return (
    <View
      style={{
        flex: 0.1,
        justifyContent: 'center',
        alignSelf: isSentByMe ? 'flex-end' : 'flex-start',
      }}>
      <View style={{flexDirection: 'row', justifyContent: 'center'}}>
        {/* <Text
          style={{
            padding: height * 10,
            fontFamily: GlobalStyles.nomal.fontFamily,
            color: GlobalStyles.green.color,
          }}>
          {!isSentByMe && currentChatting}
        </Text> */}
        <Text
          style={{
            padding: height * 10,
            backgroundColor: isSentByMe
              ? GlobalStyles.yellow.color
              : GlobalStyles.white_1.color,
            borderRadius: 10,
          }}>
          {content}
        </Text>
      </View>
    </View>
  );
};

export const ChattingDeatil = (): JSX.Element => {
  const currentChatting = useRecoilValue(chattingAtom.CurrentChattingState);
  const isFocused = useIsFocused();
  const [chattingList, setChattingList] = useState([]);
  const [inputChatting, setinputChatting] = useState('');
  const [testList, setTestList] = useState<ChattingUnit[]>([
    {isSentByMe: true, content: '박우현 죽을래?'},
    {isSentByMe: false, content: '미안..'},
    {isSentByMe: true, content: '너 호오노오오온나'},
    {isSentByMe: false, content: '내가 잘못했어'},
  ]);

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
          setChattingList(data.data);
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

  const scrollViewRef = useRef<ScrollView>(null);

  const scrollToBottom = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({animated: true});
    }
  };

  useEffect(() => {
    // 컴포넌트가 마운트되면 스크롤 뷰를 제일 아래로 이동
    scrollToBottom();
  }, [isFocused, chattingList]); // 빈 배열을 넣어 한 번만 실행되도록 설정

  return (
    <View style={styles.container}>
      <MenuTop
        menu={`${currentChatting}와 채팅`}
        text={`${currentChatting}와 채팅을 하며\n서로를 알아봐요!`}
      />
      <ScrollView style={styles.innerContainer} ref={scrollViewRef}>
        {testList.map((item: ChattingUnit, index) => (
          <ChattingUnit
            key={index}
            isSentByMe={item.isSentByMe}
            content={item.content}
          />
        ))}
      </ScrollView>
      <View style={{flex: 0.1, flexDirection: 'row'}}>
        <TextInput
          style={{
            width: '80%',
            backgroundColor: GlobalStyles.white_1.color,
            borderRadius: 12,
            paddingLeft: height * 20,
            color: GlobalStyles.grey_2.color,
          }}
          value={inputChatting}
          onChangeText={text => setinputChatting(text)}
        />
        <TouchableOpacity
          style={{
            backgroundColor: GlobalStyles.green.color,
            borderRadius: 12,
            padding: height * 10,
            marginLeft: height * 10,
            justifyContent: 'center',
          }}
          onPress={() => {
            console.log(inputChatting);
            setTestList([
              ...testList,
              {isSentByMe: true, content: inputChatting},
            ]);
            setinputChatting('');
            scrollToBottom();
          }}>
          <Text
            style={{
              color: GlobalStyles.white_2.color,
              fontFamily: GlobalStyles.nomal.fontFamily,
            }}>
            보내기
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 0.8,
    padding: height * 30,
    backgroundColor: GlobalStyles.white_2.color,
  },
  send: {
    margin: height * 20,
    backgroundColor: GlobalStyles.yellow.color,
  },
});

export default ChattingDeatil;
