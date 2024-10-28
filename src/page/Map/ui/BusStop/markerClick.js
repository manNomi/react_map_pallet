import BusStop from "./BusStop";
import ReactDOM from "react-dom/client";

const handleMarkerClick = (stopData, map, changePage) => {
  const coord = new window.naver.maps.LatLng(
    stopData.busPoint.lat,
    stopData.busPoint.lng
  );
  console.log("클릭된 좌표:", coord);

  // 기존 InfoWindow 삭제 (기존 오버레이가 있다면)
  if (map.infoWindow) {
    map.infoWindow.setMap(null);
  }
  // React 컴포넌트를 HTML로 렌더링
  const container = document.createElement("div");
  const root = ReactDOM.createRoot(container); // createRoot 사용
  root.render(
    <BusStop
      stopName={stopData.busStop}
      location={stopData.location}
      remainingTime={5}
      busId={stopData.busId}
      busPoint={stopData.busPoint}
      changePage={changePage}
      closeEvent={() => {
        if (map.infoWindow) {
          map.infoWindow.setMap(null);
        }
      }}
    />
  );

  const infoWindow = new window.naver.maps.InfoWindow({
    position: coord,
    content: container, // 렌더링된 HTML을 content로 전달
  });
  // InfoWindow를 지도에 추가
  infoWindow.open(map);
  map.infoWindow = infoWindow; // 지도 객체에 저장해 관리
};

export default handleMarkerClick;
