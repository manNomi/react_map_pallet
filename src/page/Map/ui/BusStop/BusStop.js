// BusStop.js
import Style from "./style";

const BusStop = ({
  stopName,
  location,
  remainingTime,
  busId,
  closeEvent,
  changePage,
}) => {
  const navigate = changePage(); // 컴포넌트 내부에서 Hook 호출
  return (
    <Style.Container>
      <Style.Header>
        <span>{stopName}</span>
        <span>{location}</span>
      </Style.Header>
      <Style.Info>
        <div>
          <Style.Label>남은시간</Style.Label>
          <Style.Value>{remainingTime}분</Style.Value>
        </div>
        <div>
          <Style.Label>버스 id</Style.Label>
          <Style.Value>{busId}</Style.Value>
        </div>
      </Style.Info>
      <Style.ChatBox>
        <Style.Chat
          onClick={() => {
            navigate("/chat");
          }}>
          {" "}
          {/* 수정된 부분 */}
          <Style.ChatIcon></Style.ChatIcon>채팅
        </Style.Chat>
        <Style.Marker onClick={closeEvent}>✖</Style.Marker>
      </Style.ChatBox>
    </Style.Container>
  );
};

export default BusStop;
