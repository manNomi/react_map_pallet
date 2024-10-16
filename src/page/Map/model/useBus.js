import { useState } from "react";
import { nodeLocation } from "../../../entities/BusLocationData";

const useBus = () => {
  const [bus, setBus] = useState([]);

  const setBusAdd = (data) => {
    setBus(data);
  };

  const resetBusData = () => {
    setBus([]);
  };

  const moveBusEvent = () => {
    const speed = 0.1; // 고정된 속도 (m/s)
    const intervalId = setInterval(() => {
      setBus((prevBus) =>
        prevBus.map((busLocation) => {
          const nextNode = nodeLocation.find(
            (node) => node.lastNode === busLocation.lastNode + 1
          );

          if (!nextNode) {
            busLocation = nodeLocation[0];
            return busLocation; // 다음 노드가 없으면 처음으로 돌아옴
          }

          const distance = getDistanceInMeters(
            nextNode.lat,
            nextNode.lng,
            busLocation.lat,
            busLocation.lng
          );

          const x = nextNode.lat - busLocation.lat;
          const y = nextNode.lng - busLocation.lng;

          // 거리와 속도를 기반으로 이동해야 하는 시간 (초 단위) 계산
          const timeToNextNode = distance / speed; // s
          const frameRate = 10; // 10ms마다 업데이트
          const step = frameRate / (timeToNextNode * 1000); // 이동 비율 계산

          // 새로운 위치 계산
          const xLocation = busLocation.lat + x * step;
          const yLocation = busLocation.lng + y * step;

          let newNode = busLocation.lastNode;

          // 임계값 이하일 경우 다음 노드로 이동
          if (distance < 5) {
            newNode = nextNode.lastNode;
            // console.log("현재노드 바뀜", newNode);
          }
          return {
            lastNode: newNode,
            lat: xLocation,
            lng: yLocation,
          };
        })
      );
    }, 100); // 10ms마다 위치를 업데이트합니다.
    return () => clearInterval(intervalId); // 컴포넌트가 언마운트될 때 타이머를 정리합니다.
  };

  return [bus, setBusAdd, resetBusData, moveBusEvent];
};

// Haversine 공식으로 두 지점 간의 거리 계산 (미터 단위)
function getDistanceInMeters(lat1, lng1, lat2, lng2) {
  const R = 6371000; // 지구 반지름 (미터)
  const toRadians = (degree) => (degree * Math.PI) / 180;

  const dLat = toRadians(lat2 - lat1);
  const dLng = toRadians(lng2 - lng1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; // 두 지점 간의 거리 (미터)
}

export default useBus;
