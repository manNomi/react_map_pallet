import React, { useEffect, useRef, useCallback } from "react";
import { Marker } from "react-naver-maps";
import useBus from "../../model/useBus";
import useTestBusData from "../../../../entities/useTestBusData";
import busIcon from "../../assets/bus.svg";
import useBusData from "../../../../entities/useBusData";
const BusMarkers = () => {
  // 버스 테스트 코드
  // const [busTestData, loadingTest, errorTest] = useTestBusData();
  // 버스 좌표 상태
  const [bus, setBus, resetBus, moveBusEvent] = useBus();

  // 버스 데이터 통신
  const [busData, error] = useBusData();

  // busData가 변경되었을 때 처리 (lastNode가 다르면 업데이트)
  useEffect(() => {
    console.log(busData);
    if (busData && busData.data) {
      setBus((prevBus) => {
        // 처음으로 데이터를 불러오면 그대로 저장
        moveBusEvent(); // 버스 좌표 주기적으로 업데이트

        if (prevBus.length === 0) {
          return busData.data;
        }

        // 처음이 아닐때 데이터 저장
        return prevBus.map((busLocation, index) => {
          if (!busData.data[index]) {
            return busLocation; // 안전한 반환
          }
          // 버스의 원래 노드
          const prevLastNode = parseInt(busLocation.lastNode);
          //
          const newLastNode = parseInt(busData.data[index].lastNode);

          if (prevLastNode !== newLastNode) {
            return {
              ...busLocation,
              lat: busData.data[index].lat,
              lng: busData.data[index].lng,
              lastNode: busData.data[index].lastNode,
            };
          }
          // 변경 사항이 없으면 기존 busLocation 유지
          return busLocation;
        });
      });
    }
  }, [busData]);

  return (
    <>
      {error ? (
        <div>오류</div>
      ) : (
        bus.map((busLocation, index) => {
          // 유효성 검사: position이 없을 경우 예외 처리
          if (!busLocation || !busLocation.lat || !busLocation.lng) {
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
