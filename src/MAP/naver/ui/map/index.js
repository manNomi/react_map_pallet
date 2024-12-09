import React, { useEffect, useRef } from "react";
import {
  NaverMap,
  Container as MapDiv,
  NavermapsProvider,
} from "react-naver-maps";

let naverMapInstance = null; // Naver Map 인스턴스를 저장
let mapResolver = null; // Naver Map 초기화 대기를 위한 Resolver

export const getNaverMapInstance = () =>
  new Promise((resolve) => {
    if (naverMapInstance) {
      resolve(naverMapInstance); // 이미 초기화된 경우 즉시 반환
    } else {
      mapResolver = resolve; // 초기화가 완료되면 resolve 호출
    }
  });

const NaverMapDiv = ({ api_key, center, zoom, setSyncState }) => {
  const mapRef = useRef(null); // Map 컨테이너 참조

  const handleMapInit = (naverMap) => {
    naverMapInstance = naverMap; // Naver Map 인스턴스를 전역 변수에 저장
    if (mapResolver) {
      mapResolver(naverMap); // 초기화 대기 중인 Promise resolve
      mapResolver = null;
    }
  };

  const handleCenterChanged = (newCenter) => {
    setSyncState((prevState) => ({
      ...prevState,
      center: { lat: newCenter.lat(), lng: newCenter.lng() },
    }));
  };

  const handleZoomChanged = (newZoom) => {
    setSyncState((prevState) => ({
      ...prevState,
      zoom: newZoom,
    }));
  };

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.setCenter(center);
      mapRef.current.setZoom(zoom);
    }
  }, [center, zoom]);

  return (
    <NavermapsProvider ncpClientId={api_key}>
      <MapDiv style={{ width: "100%", height: "100%" }}>
        <NaverMap
          ref={mapRef}
          center={center}
          zoom={zoom}
          onInit={handleMapInit}
          onCenterChanged={(center) => handleCenterChanged(center)}
          onZoomChanged={(zoom) => handleZoomChanged(zoom)}
        />
      </MapDiv>
    </NavermapsProvider>
  );
};

export default NaverMapDiv;
