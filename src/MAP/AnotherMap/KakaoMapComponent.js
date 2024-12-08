import React, { useEffect, useRef } from "react";

const KakaoMapComponent = ({ api_key, syncState, setSyncState }) => {
  const kakaoMapRef = useRef(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=${api_key}`;
    script.async = true;

    script.onload = () => {
      window.kakao.maps.load(() => {
        const container = document.getElementById("kakao-map");
        const options = {
          center: new window.kakao.maps.LatLng(
            syncState.center.lat,
            syncState.center.lng
          ),
          level: 19 - syncState.zoom,
        };

        const map = new window.kakao.maps.Map(container, options);
        kakaoMapRef.current = map;

        window.kakao.maps.event.addListener(map, "center_changed", () => {
          const center = map.getCenter();
          setSyncState((prev) => ({
            ...prev,
            center: { lat: center.getLat(), lng: center.getLng() },
          }));
        });

        window.kakao.maps.event.addListener(map, "zoom_changed", () => {
          const level = map.getLevel();
          setSyncState((prev) => ({ ...prev, zoom: 19 - level }));
        });
      });
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [api_key]);

  return <div id="kakao-map" style={{ width: "100%", height: "100vh" }} />;
};

export default KakaoMapComponent;
