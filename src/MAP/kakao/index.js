import React, { useEffect, useRef } from "react";

const KakaoMapDiv = ({ center, zoom, apiKey, zIndex, opacity }) => {
  const mapRef = useRef(null);

  // Zoom 변환 함수
  // const zoomToLevel = (zoom) => 20 - zoom; // 일반 Zoom → Kakao Level
  // const levelToZoom = (level) => 20 - level; // Kakao Level → 일반 Zoom

  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=${apiKey}`;
    script.async = true;

    script.onload = () => {
      window.kakao.maps.load(() => {
        const container = document.getElementById("kakao-map");
        const options = {
          center: new window.kakao.maps.LatLng(center.lat, center.lng),
          level: zoom, // 초기 Zoom → Level 변환
        };

        // Kakao Map 생성 및 참조 저장
        const map = new window.kakao.maps.Map(container, options);
        mapRef.current = map;
      });
    };

    document.body.appendChild(script);
    const container = document.getElementById("kakao-map");
    container.style.zIndex = zIndex;

    // 스크립트 및 맵 클린업
    return () => {
      document.body.removeChild(script);
      if (mapRef.current) {
        mapRef.current = null;
      }
    };
  }, []);

  // 초기 중심 좌표 및 줌 강제 동기화
  useEffect(() => {
    if (mapRef.current) {
      const map = mapRef.current;
      map.setCenter(new window.kakao.maps.LatLng(center.lat, center.lng));
      map.setLevel(zoom); // Zoom 값을 Kakao Level로 변환
    }
  }, [center, zoom]);

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        position: "relative",
      }}>
      {/* Kakao Map 컨테이너 */}
      <div
        id="kakao-map"
        style={{
          width: "100%",
          height: "100%",
          zIndex: zIndex,
          opacity: opacity,
        }}></div>
    </div>
  );
};

export default KakaoMapDiv;
