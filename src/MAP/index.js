import React, { useState } from "react";
import GoogleMapComponent from "./AnotherMap/GoogleMapComponent";
import NaverMapComponent from "./AnotherMap/NaverMapComponent";
import KakaoMapComponent from "./AnotherMap/KakaoMapComponent";
import OpenLayersComponent from "./AnotherMap/OpenLayersComponent";

const MapContainer = ({ mapType, google, naver, kakao }) => {
  const [syncState, setSyncState] = useState({
    center: { lat: 37.5665, lng: 126.978 }, // 중심 좌표 (서울 시청)
    zoom: 15, // 줌 레벨
  });

  // 지도 렌더링 함수
  const renderMap = (type, Component, apiKey, zIndex) => {
    // 지도 렌더링 조건: API 키가 있어야 하고 `Component`가 존재해야 함
    if (!apiKey || !Component) return null;
    return (
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          zIndex,
          opacity: mapType === type ? 1 : 0, // 배경 지도만 보이도록 설정
          pointerEvents: mapType === type ? "auto" : "none", // 배경 지도만 상호작용 가능
        }}>
        <Component
          api_key={apiKey}
          syncState={syncState}
          setSyncState={setSyncState}
        />
      </div>
    );
  };

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      {/* 배경 지도 (mapType에 따라 선택) */}
      {mapType === "google" &&
        renderMap("google", GoogleMapComponent, google, 0)}
      {mapType === "naver" && renderMap("naver", NaverMapComponent, naver, 0)}
      {mapType === "kakao" && renderMap("kakao", KakaoMapComponent, kakao, 0)}
      {mapType === "openlayers" && (
        <OpenLayersComponent
          syncState={syncState}
          setSyncState={setSyncState}
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            zIndex: 0,
            opacity: 1,
          }}
        />
      )}

      {/* 다른 지도 (투명 처리) */}
      {mapType !== "google" &&
        renderMap("google", GoogleMapComponent, google, 1)}
      {mapType !== "naver" && renderMap("naver", NaverMapComponent, naver, 1)}
      {mapType !== "kakao" && renderMap("kakao", KakaoMapComponent, kakao, 1)}
    </div>
  );
};

export default MapContainer;
