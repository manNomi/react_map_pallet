import { Write, UserImg, WriteInput, Container, WriteBtn } from "./style.js";
import { useEffect, useState, useRef } from "react";

const CommentInput = ({ onSendMessage }) => {
  const [message, setMessage] = useState("");
  const inputRef = useRef(null);

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message);
      setMessage("");
      inputRef.current.value = "";
    }
  };
  return (
    <Container>
      <UserImg />
      <Write>
        <WriteInput
          ref={inputRef}
          type="text"
          placeholder="메시지 입력..."
          onChange={(e) => setMessage(e.target.value)}
        />
        <WriteBtn onClick={handleSend}>전송</WriteBtn>
      </Write>
    </Container>
  );
};

export default CommentInput;
