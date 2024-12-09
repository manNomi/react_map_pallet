import React, { useEffect, useRef } from "react";

const KakaoMapComponent = ({ api_key, syncState, setSyncState }) => {
  const kakaoMapRef = useRef(null);

  useEffect(() => {
    const existingScript = document.querySelector(
      `script[src="https://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=${api_key}"]`
    );

    if (!existingScript) {
      const script = document.createElement("script");
      script.src = `https://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=${api_key}`;
      script.async = true;

      script.onload = () => {
        window.kakao.maps.load(initMap);
      };

      document.body.appendChild(script);

      return () => {
        document.body.removeChild(script);
      };
    } else if (window.kakao && window.kakao.maps) {
      window.kakao.maps.load(initMap);
    }
  }, [api_key]);

  const initMap = () => {
    const container = document.getElementById("kakao-map");
    const options = {
      center: new window.kakao.maps.LatLng(
        syncState.center.lat,
        syncState.center.lng
      ),
      level: zoomToLevel(syncState.zoom),
    };

    const map = new window.kakao.maps.Map(container, options);
    kakaoMapRef.current = map;

    const handleCenterChange = () => {
      const center = kakaoMapRef.current.getCenter();
      console.log(center);
      setSyncState((prev) => ({
        ...prev,
        center: { lat: center.getLat(), lng: center.getLng() },
      }));
    };

    const handleZoomChange = () => {
      const level = map.getLevel();
      setSyncState((prev) => ({ ...prev, zoom: levelToZoom(level) }));
    };

    window.kakao.maps.event.addListener(
      map,
      "bounds_changed",
      handleCenterChange
    );
    window.kakao.maps.event.addListener(map, "zoom_changed", handleZoomChange);

    return () => {
      window.kakao.maps.event.removeListener(
        map,
        "center_changed",
        handleCenterChange
      );
      window.kakao.maps.event.removeListener(
        map,
        "zoom_changed",
        handleZoomChange
      );
    };
  };

  const zoomToLevel = (zoom) => 20 - zoom;
  const levelToZoom = (level) => 20 - level;

  useEffect(() => {
    if (kakaoMapRef.current) {
      const map = kakaoMapRef.current;
      map.setCenter(
        new window.kakao.maps.LatLng(syncState.center.lat, syncState.center.lng)
      );
      map.setLevel(zoomToLevel(syncState.zoom));
    }
  }, [syncState]);

  return <div id="kakao-map" style={{ width: "100%", height: "100vh" }} />;
};

export default KakaoMapComponent;
