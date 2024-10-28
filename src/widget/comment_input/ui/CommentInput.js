import { Write, UserImg, WriteInput, Container, WriteBtn } from "./style.js";

const CommentInput = () => {
  return (
    <Container>
      <UserImg />
      <Write>
        <WriteInput type="text" placeholder="댓글 추가 ..." />
        <WriteBtn>전송</WriteBtn>
      </Write>
    </Container>
  );
};

export default CommentInput;
