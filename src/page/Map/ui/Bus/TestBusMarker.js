import React, { useEffect } from "react";
import { Marker } from "react-naver-maps";
import busIcon from "../../assets/bus.svg";
import useTestBus from "../../model/useTestBus";
import useTestBusData from "../../../../entities/Bus/useTestBusData";

const TestBusMarkers = () => {
  const [bus, setBus, resetBusData, moveBusEvent] = useTestBus();
  const [busData, loading, error] = useTestBusData();

  // busData가 초기화될 때만 설정
  useEffect(() => {
    if (busData) {
      setBus(busData);
      console.log(busData);
    }
  }, [busData]);

  useEffect(() => {
    console.log(bus);
  }, [bus]);

  // 컴포넌트가 마운트될 때 한 번만 moveBusEvent 실행
  useEffect(() => {
    const stopMoving = moveBusEvent(); // 이동 이벤트 시작
    return () => stopMoving(); // 컴포넌트 언마운트 시 이동 정지
  }, [moveBusEvent]); // moveBusEvent를 의존성에 추가

  // 로딩 및 에러 처리
  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>오류 발생: {error.message}</div>;

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

export default TestBusMarkers;
