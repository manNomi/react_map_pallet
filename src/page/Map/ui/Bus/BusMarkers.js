import React, { useEffect, useState, useRef, useCallback } from "react";
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

  const [isBusDataUpdated, setIsBusDataUpdated] = useState(false);

  useEffect(() => {
    setIsBusDataUpdated(false); // 수정!!

    if (busData && busData.data) {
      const text = [];
      const text_bus = [];
      const another = [];

      // busData.data.forEach((busDb, index) => {
      //   text.push(busDb.lastNode);
      //   text_bus.push(bus[index].lastNode);
      //   if (busDb.lastNode !== bus[index].lastNode) {
      //     another.push(index);
      //   }
      // });
      console.log("통신버스", text);
      console.log("현재", text_bus);
      console.log("다름", another);
      setBus((prevBus) => {
        // 처음으로 데이터를 불러오면 그대로 저장
        if (prevBus.length === 0) {
          setIsBusDataUpdated(true); // 데이터 업데이트 완료 표시
          return busData.data;
        }
        // 데이터가 업데이트되었는지 확인 후 true로 설정
        let isUpdated = false;
        const updatedBus = prevBus.map((busLocation, index) => {
          if (!busData.data[index]) {
            return busLocation; // 안전한 반환
          }
          const prevLastNode = parseInt(busLocation.lastNode);
          const newLastNode = parseInt(busData.data[index].lastNode);
          if (prevLastNode !== newLastNode) {
            isUpdated = true;
            return {
              ...busLocation,
              lat: busData.data[index].lat,
              lng: busData.data[index].lng,
              lastNode: busData.data[index].lastNode,
            };
          }
          return busLocation;
        });
        if (isUpdated) {
          setIsBusDataUpdated(true); // 데이터 업데이트 완료 표시
        }
        return updatedBus;
      });
    }
  }, [busData]);

  useEffect(() => {
    if (isBusDataUpdated) {
      moveBusEvent(); // 버스 좌표 주기적으로 업데이트
      setIsBusDataUpdated(false); // 상태 초기화 (필요에 따라)
    }
  }, [isBusDataUpdated]);

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
