import Style from "./style";
import ChatList from "../ChatList/ChatList";

const ChatListContainer = () => {
  return (
    <Style.Container>
      <Style.Header>
        <Style.Logo>목록</Style.Logo>
        <Style.Title>511번 채팅방</Style.Title>
      </Style.Header>
      <Style.Content>
        <ChatList />
        <ChatList />
        <ChatList />
        <ChatList />
      </Style.Content>
    </Style.Container>
  );
};
export default ChatListContainer;
