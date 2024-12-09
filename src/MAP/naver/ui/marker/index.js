import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { getNaverMapInstance } from "../map";

const NaverMarker = ({ position, children, onClick }) => {
  const [map, setMap] = useState(null);

  useEffect(() => {
    const initMap = async () => {
      try {
        const naverMap = await getNaverMapInstance();
        if (!naverMap) {
          console.error("Naver Map instance could not be retrieved.");
          return;
        }
        setMap(naverMap);
      } catch (error) {
        console.error("Failed to initialize Naver Map:", error);
      }
    };

    initMap();
  }, []);

  useEffect(() => {
    if (!map) {
      console.log("Naver Maps API가 로드되지 않았거나 맵 인스턴스가 없습니다.");
      return;
    }

    const { naver } = window;

    if (!position || !position.lat || !position.lng) {
      console.error("Invalid position:", position);
      return;
    }

    // Marker DOM 생성
    const markerElement = document.createElement("div");
    markerElement.style.position = "absolute";
    markerElement.style.width = "50px";
    markerElement.style.height = "50px";
    markerElement.style.backgroundColor = "red"; // 디버깅을 위한 스타일
    markerElement.style.borderRadius = "50%"; // 원형 스타일

    // React 컴포넌트를 Marker DOM에 렌더링
    ReactDOM.render(
      React.cloneElement(children, {
        style: { width: "100%", height: "100%" },
      }),
      markerElement
    );

    const marker = new naver.maps.Marker({
      position: new naver.maps.LatLng(position.lat, position.lng),
      map,
      icon: {
        content: markerElement,
      },
    });

    console.log("Marker created:", marker);

    // 클릭 이벤트 추가
    if (onClick) {
      naver.maps.Event.addListener(marker, "click", () => onClick());
    }

    return () => {
      marker.setMap(null); // 지도에서 마커 제거
      ReactDOM.unmountComponentAtNode(markerElement); // React 컴포넌트 언마운트
    };
  }, [map, position, children, onClick]);

  return null;
};

NaverMarker.defaultProps = {
  mapType: "naver",
};

export default NaverMarker;
