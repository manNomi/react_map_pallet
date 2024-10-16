import React, { useEffect } from "react";
import { Marker } from "react-naver-maps";
import useBus from "../../model/useBus";
import useTestBusData from "../../../../entities/useTestBusData";
import busIcon from "../../assets/bus.svg";
import useBusData from "../../../../entities/useBusData";
const BusMarkers = () => {
  // 버스 좌표 상태
  const [bus, setBus, resetBus, moveBusEvent] = useBus();
  const [busTestData, loadingTest, errorTest] = useTestBusData();

  // 버스 데이터 통신
  const [busData, error] = useBusData();

  useEffect(() => {
    if (busData && busData.data) {
      setBus(busData.data);
    }
  }, [busData]);

  useEffect(() => {
    console.log(busData);
  }, [bus]);

  // useEffect(() => {
  //   moveBusEvent(); // 데이터가 설정된 후에 움직임 시작
  // }, [bus]);
  return (
    <>
      {/* {loadingTest ? (
        <div>로딩중</div>
      ) : */}
      {error ? (
        <div>오류</div>
      ) : (
        bus.map((busLocation, index) => {
          // 유효성 검사: position이 없을 경우 예외 처리
          if (!busLocation || !busLocation.lat || !busLocation.lng) {
            console.log(`Invalid bus location at index ${index}`, busLocation);
            return null; // 유효하지 않은 경우 렌더링하지 않음
          }
          return (
            <Marker
              key={index}
              position={
                new window.naver.maps.LatLng(busLocation.lat, busLocation.lng)
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
