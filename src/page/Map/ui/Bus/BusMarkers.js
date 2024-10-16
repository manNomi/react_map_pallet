import React, { useEffect, useRef, useCallback } from "react";
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

  // busData가 변경되었을 때 처리 (lastNode가 다르면 업데이트)
  useEffect(() => {
    if (busData && busData.data) {
      setBus((prevBus) => {
        if (prevBus.length === 0) {
          return busData.data; // 처음 값은 그대로 설정
        }
        return prevBus.map((busLocation, index) => {
          // bus의 lastNode와 busData의 lastNode가 다른 경우에만 업데이트
          if (busLocation.lastNode !== busData.data[index].lastNode) {
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

  // moveBusEvent는 busData 변경 시마다 실행
  useEffect(() => {
    const stopMoving = moveBusEvent(); // 버스 좌표 주기적으로 업데이트
    return () => {
      stopMoving(); // 언마운트 또는 busData 변경 시 타이머 정리
    };
  }, [busData]);

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
          console.log(busLocation.lat, busLocation.lng);
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
