// BusStop.js
import Style from "./style";

const BusStop = ({
  stopName,
  location,
  remainingTime,
  busId,
  closeEvent,
  changePage,
  stopData,
  setOptionEvent,
}) => {
  changePage(`/home/${stopData.lastNode}`);

  return (
    <Style.Container>
      <Style.Header>
        <span>{stopName}</span>
        <span>{location}</span>
        <Style.Marker onClick={closeEvent}>✖</Style.Marker>
      </Style.Header>
      <Style.Info>
        <div>
          <Style.Label>남은시간</Style.Label>
          <Style.Value>{remainingTime}분</Style.Value>
        </div>
        <div>
          <Style.Label>버스 정류장 id</Style.Label>
          <Style.Value>{busId}</Style.Value>
        </div>
      </Style.Info>
      <Style.ChatBox>
        <Style.Chat
          onClick={() => {
            changePage("/chat/" + stopName);
          }}>
          <Style.ChatOut>
            <Style.ChatIcon></Style.ChatIcon>
            <Style.ChatText>채팅</Style.ChatText>
          </Style.ChatOut>
        </Style.Chat>
      </Style.ChatBox>
    </Style.Container>
  );
};

export default BusStop;
