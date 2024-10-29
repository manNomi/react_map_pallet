import { UserChatBubble, ChatUser, Container } from "./Style";

const AnotherChat = (props) => {
  const nickname = props.message.split(":")[0]; // 닉네임 부분
  const content = props.message.split(":").slice(1).join(":"); // 내용 부분
  return (
    <Container>
      <ChatUser>{nickname}</ChatUser>
      <UserChatBubble>{content}</UserChatBubble>
    </Container>
  );
};
export default AnotherChat;
