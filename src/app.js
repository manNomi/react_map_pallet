import React, { useState } from "react";
import MapContainer from "./MAP";
import GoogleMarker from "./MAP/google/ui/marker";
import NaverMarker from "./MAP/naver/ui/marker";
import KakaoMarker from "./MAP/kakao/ui/marker";
import OLMarker from "./MAP/OLMap/ui/marker";

const App = () => {
  const [mapType, setMapType] = useState("google");

  const handleMarkerClick = (message) => {
    alert(message);
  };

  // 환경 변수 가져오기
  const naverClientId = process.env.REACT_APP_NAVER_CLIENT_ID;
  const kakaoClientId = process.env.REACT_APP_KAKAO_CLIENT_ID;
  const googleClientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      {/* 지도 타입 전환 버튼 */}
      <div style={{ position: "absolute", zIndex: 1000, top: 10, left: 10 }}>
        <button onClick={() => setMapType("google")}>Google Map</button>
        <button onClick={() => setMapType("naver")}>Naver Map</button>
        <button onClick={() => setMapType("kakao")}>Kakao Map</button>
        <button onClick={() => setMapType("openLayer")}>OpenLayer Map</button>
      </div>

      {/* MapContainer 및 마커 */}
      <MapContainer
        mapType={mapType}
        google={googleClientId}
        naver={naverClientId}
        kakao={kakaoClientId}
        openLayer={true}>
        {/* Google Marker */}
        <GoogleMarker
          position={{ lat: 37.5665, lng: 126.978 }}
          onClick={() => handleMarkerClick("Google Marker 클릭!")}>
          <div
            style={{
              backgroundColor: "blue",
              borderRadius: "50%",
              width: "50px",
              height: "50px",
            }}>
            G
          </div>
        </GoogleMarker>

        {/* Naver Marker */}
        <NaverMarker
          position={{ lat: 37.5665, lng: 126.978 }}
          onClick={() => handleMarkerClick("Naver Marker 클릭!")}>
          <div
            style={{
              backgroundColor: "green",
              borderRadius: "50%",
              width: "50px",
              height: "50px",
            }}>
            N
          </div>
        </NaverMarker>

        {/* Kakao Marker */}
        <KakaoMarker
          position={{ lat: 37.5665, lng: 126.978 }}
          onClick={() => handleMarkerClick("Kakao Marker 클릭!")}>
          <div
            style={{
              backgroundColor: "yellow",
              borderRadius: "50%",
              width: "50px",
              height: "50px",
            }}>
            K
          </div>
        </KakaoMarker>

        {/* OpenLayers Marker */}
        <OLMarker
          position={{ lat: 37.5665, lng: 126.978 }}
          onClick={() => handleMarkerClick("OL Marker 클릭!")}>
          <div
            style={{
              backgroundColor: "red",
              borderRadius: "50%",
              width: "50px",
              height: "50px",
            }}>
            OL
          </div>
        </OLMarker>
      </MapContainer>
    </div>
  );
};

export default App;
