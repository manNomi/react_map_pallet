import React, { useEffect } from "react";
import ReactDOM from "react-dom";

const NaverMarker = ({ position, children, onClick }) => {
  const mapId = "naver-map-id";
  useEffect(() => {
    const { naver } = window;
    if (!naver) {
      console.warn("Naver Maps API가 로드되지 않았습니다.");
      return;
    }

    const mapElement = document.getElementById(mapId);
    if (!mapElement) {
      console.warn("Map element를 찾을 수 없습니다.");
      return;
    }

    // 지도 초기화
    const mapInstance = new naver.maps.Map(mapElement, {
      center: new naver.maps.LatLng(position.lat, position.lng),
      zoom: 15,
    });

    // Marker DOM 생성
    const markerElement = document.createElement("div");
    markerElement.style.position = "absolute";
    markerElement.style.width = "50px";
    markerElement.style.height = "50px";

    // React 컴포넌트를 Marker DOM에 렌더링
    ReactDOM.render(
      React.cloneElement(children, {
        style: { width: "100%", height: "100%" },
      }),
      markerElement
    );

    const marker = new naver.maps.Marker({
      position: new naver.maps.LatLng(position.lat, position.lng),
      map: mapInstance,
      icon: {
        content: markerElement,
      },
    });

    // 클릭 이벤트 추가
    naver.maps.Event.addListener(marker, "click", () => {
      if (onClick) onClick();
    });

    // 컴포넌트 언마운트 시 마커 제거
    return () => {
      marker.setMap(null); // 지도에서 마커 제거
      ReactDOM.unmountComponentAtNode(markerElement); // React 컴포넌트 언마운트
    };
  }, [mapId, position, children, onClick]);

  return null;
};

NaverMarker.defaultProps = {
  mapType: "naver",
};

export default NaverMarker;
