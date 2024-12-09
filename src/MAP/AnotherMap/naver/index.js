import React, { useEffect, useRef } from "react";
import {
  NaverMap,
  Container as MapDiv,
  NavermapsProvider,
} from "react-naver-maps";

const NaverMapDiv = ({ apiKey, center, zoom, setSyncState }) => {
  useEffect(() => {
    console.log(center);
  }, [center, zoom]);
  const naverMapRef = useRef(null);

  useEffect(() => {
    if (naverMapRef.current) {
      naverMapRef.current.setZoom(zoom);
      naverMapRef.current.setCenter(center);
    }
  }, [naverMapRef, center, zoom]);
  // 중심 변경 핸들러
  const handleCenterChanged = (value) => {
    setSyncState((prevState) => ({
      ...prevState,
      center: { lat: value.lat(), lng: value.lng() },
    }));
  };

  // 줌 변경 핸들러
  const handleZoomChanged = (value) => {
    setSyncState((prevState) => ({
      ...prevState,
      zoom: value,
    }));
  };

  return (
    <NavermapsProvider ncpClientId={apiKey}>
      <MapDiv style={{ width: "100%", height: "100%" }}>
        <NaverMap
          ref={naverMapRef}
          center={center}
          zoom={zoom}
          onCenterChanged={handleCenterChanged}
          onZoomChanged={handleZoomChanged}
        />
      </MapDiv>
    </NavermapsProvider>
  );
};

export default NaverMapDiv;
