import Style from "./style";
import { useParams } from "react-router-dom";
import CommentInput from "../../../../widget/comment_input";
import Chat from "../Chat/Chat";

const ChatPage = () => {
  const { id } = useParams(); // URL에서 id 파라미터를 가져옴
  console.log(id);
  return (
    <Style.Container>
      <Style.Header>
        <Style.Logo>{id}</Style.Logo>
        <Style.Title>511번 채팅방</Style.Title>
      </Style.Header>
      <Style.Content>
        <Chat />
      </Style.Content>
      <CommentInput />
    </Style.Container>
  );
};
export default ChatPage;
