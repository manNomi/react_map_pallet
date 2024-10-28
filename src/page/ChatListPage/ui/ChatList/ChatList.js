import {
  ChatListContainer,
  ChatItem,
  ChatContent,
  NameAndTime,
  ChatName,
  Time,
  LastMessage,
} from "./style";

const ChatList = (props) => {
  return (
    <ChatListContainer>
      {/* 예시 채팅방 */}
      <ChatItem>
        <ChatContent>
          <NameAndTime>
            <ChatName>채팅방 이름</ChatName>
            <Time>오후 3:45</Time>
          </NameAndTime>
          <LastMessage>마지막 메시지 내용을 여기에 표시합니다.</LastMessage>
        </ChatContent>
      </ChatItem>
      {/* 여러 개의 ChatItem을 반복 */}
    </ChatListContainer>
  );
};
export default ChatList;
