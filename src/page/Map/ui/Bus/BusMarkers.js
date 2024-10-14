import React, { useEffect } from "react";
import { Marker } from "react-naver-maps";
import useBus from "../../model/useBus";
import useBusData from "../../../../entities/useBusData";
import busIcon from "../../assets/bus.svg";
const BusMarkers = () => {
  const [bus, setBus, resetBus, moveBusEvent] = useBus();
  const [busData, loading, error] = useBusData();
  useEffect(() => {
    if (busData && busData.length > 0) {
      setBus(busData);
      moveBusEvent(); // 데이터가 설정된 후에 움직임 시작
    }
  }, [busData]);

  return (
    <>
      {loading ? (
        <div>로딩중</div>
      ) : error ? (
        <div>오류</div>
      ) : (
        bus.map((busLocation, index) => {
          // 유효성 검사: position이 없을 경우 예외 처리
          if (!busLocation || !busLocation.position) {
            console.warn(`Invalid bus location at index ${index}`, busLocation);
            return null; // 유효하지 않은 경우 렌더링하지 않음
          }

          return (
            <Marker
              key={index}
              position={
                new window.naver.maps.LatLng(
                  busLocation.position.lat,
                  busLocation.position.lng
                )
              }
              icon={{
                content: `<img src="${busIcon}" width="20" height="20" />`,
              }}
            />
          );
        })
      )}
    </>
  );
};

export default BusMarkers;
