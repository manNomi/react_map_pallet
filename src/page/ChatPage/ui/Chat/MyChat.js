import { ChatBubble, Container } from "./Style";

const MyChat = (props) => {
  console.log(props.message);
  return (
    <Container>
      <ChatBubble id="message">{props.message}</ChatBubble>
    </Container>
  );
};
export default MyChat;
