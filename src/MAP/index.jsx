import React, { useEffect, useState } from "react";
import GoogleMapComponent from "./google";
import NaverMapComponent from "./naver";
import KakaoMapComponent from "./kakao";
import OpenLayersComponent from "./OLMap";

const MapContainer = ({
  mapType,
  google,
  naver,
  kakao,
  openLayer,
  children,
}) => {
  const [syncState, setSyncState] = useState({
    center: { lat: 37.5665, lng: 126.978 }, // 기본 중심 좌표
    zoom: 15, // 기본 줌 레벨
  });

  // 지도 스타일 상수
  const baseStyle = {
    position: "absolute",
    width: "100%",
    height: "100vh",
  };

  const maps = [
    { type: "google", component: GoogleMapComponent, api: google },
    { type: "naver", component: NaverMapComponent, api: naver },
    { type: "kakao", component: KakaoMapComponent, api: kakao },
  ];

  const renderMap = (type, Component, apiKey) => {
    if (type !== "openLayer" && (!apiKey || !Component)) return null;

    return (
      <div
        style={{
          ...baseStyle,
          zIndex: mapType === type ? 0 : 1,
          opacity: mapType === type ? 0.5 : 0.5,
          pointerEvents: mapType === type ? "auto" : "none",
        }}>
        <Component
          api_key={apiKey}
          syncState={syncState}
          setSyncState={setSyncState}
        />
      </div>
    );
  };

  const renderMarkers = () =>
    React.Children.map(children, (child) => {
      if (!React.isValidElement(child)) return null;

      const { mapType: childMapType } = child.props;
      const apiKey = maps.find(({ type }) => type === childMapType)?.api;

      // OpenLayers의 경우 API 키 없이 렌더링 허용
      if (!apiKey && childMapType !== "openLayer") {
        console.warn(`API key for ${childMapType} map is not provided.`);
        return null;
      }

      return React.cloneElement(child, { syncState });
    });

  return (
    <div style={{ position: "relative", width: "100%", height: "100vh" }}>
      {/* 지도 렌더링 */}
      {maps.map(({ type, component, api }) => renderMap(type, component, api))}
      {openLayer && (
        <OpenLayersComponent
          syncState={syncState}
          setSyncState={setSyncState}
          style={{
            ...baseStyle,
            zIndex: mapType === "openLayer" ? 0 : 1,
            pointerEvents: mapType === "openLayer" ? "auto" : "none",
            opacity: mapType === "openLayer" ? 1 : 0,
          }}
        />
      )}

      {/* 마커 렌더링 */}
      {renderMarkers()}
    </div>
  );
};

export default MapContainer;
