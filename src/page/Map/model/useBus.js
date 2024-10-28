import { useCallback, useState } from "react";
import { nodeLocation } from "../../../entities/Bus/BusLocationData";

const useBus = () => {
  const [bus, setBus] = useState([]);

  const setBusAdd = (data) => {
    setBus(data);
  };

  const resetBusData = () => {
    setBus([]);
  };
  const moveBusEvent = () => {
    const speed = 10; // 고정된 속도 (m/s)
    const intervalId = setInterval(() => {
      setBus((prevBus) =>
        prevBus.map((busLocation) => {
          const currentNode = nodeLocation.find(
            (node) => node.lastNode === parseInt(busLocation.lastNode)
          );
          const nextNode = nodeLocation.find(
            (node) => node.lastNode === parseInt(busLocation.lastNode) + 1
          );

          // 마지막 노드가 없으면 다시 처음으로 돌아옴
          if (!nextNode) {
            return {
              ...busLocation,
              lastNode: nodeLocation[0].lastNode, // 첫 번째 노드로 돌아가기
              lat: nodeLocation[0].lat,
              lng: nodeLocation[0].lng,
            };
          }

          // 현재 위치와 다음 노드 사이의 거리 계산
          const distance = getDistanceInMeters(
            nextNode.lat,
            nextNode.lng,
            busLocation.lat,
            busLocation.lng
          );

          // 새로운 위치 초기화
          let xLocation = busLocation.lat;
          let yLocation = busLocation.lng;
          let newNode = busLocation.lastNode;

          // 임계값 이하일 경우 해당 위치에서 멈추고 다음 노드로 이동하지 않음
          if (distance < 5) {
            // 노드에 도착했으므로 새로운 노드로 업데이트
            return {
              ...busLocation,
              lat: busLocation.lat,
              lng: busLocation.lng,
              lastNode: nextNode.lastNode, // 현재 노드를 정확히 업데이트
            };
          }

          // 이동해야 할 경우 처리
          const x = nextNode.lat - busLocation.lat;
          const y = nextNode.lng - busLocation.lng;

          // 이동해야 하는 시간(초 단위) 계산
          const timeToNextNode = distance / speed; // 초 단위
          const frameRate = 100; // 100ms마다 업데이트
          const step = frameRate / (timeToNextNode * 1000); // 이동 비율 계산

          // 새로운 위치 계산
          xLocation = busLocation.lat + x * step;
          yLocation = busLocation.lng + y * step;

          return {
            ...busLocation,
            lat: xLocation,
            lng: yLocation,
            lastNode: busLocation.lastNode, // 노드를 변경하지 않음 (도착 시에만 변경)
          };
        })
      );
    }, 100); // 100ms마다 위치를 업데이트합니다.

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
