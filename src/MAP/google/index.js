import React, { useEffect, useRef, useState } from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";

let googleMapInstance = null; // 전역 변수로 Google Map 인스턴스 저장
let mapResolver = null; // Google Map 초기화 대기를 위한 Resolver

const GoogleMapComponent = ({ api_key, syncState, setSyncState }) => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: api_key,
  });

  const mapRef = useRef(null); // Google Map 인스턴스를 저장
  const [isListenersAttached, setAttach] = useState(false); // 이벤트 리스너가 부착되었는지 여부

  const roundCoord = (value, precision = 6) => {
    return parseFloat(value.toFixed(precision));
  };

  // 지도 중심 및 줌 변경
  // useEffect(() => {
  //   if (mapRef.current) {
  //     const map = mapRef.current;

  //     if (syncState.center) {
  //       const newCenter = new window.google.maps.LatLng(
  //         syncState.center.lat,
  //         syncState.center.lng
  //       );
  //       map.setCenter(newCenter);
  //     }
  //     if (syncState.zoom) {
  //       map.setZoom(syncState.zoom);
  //     }
  //   }
  // }, [syncState]);

  // 이벤트 리스너 등록 및 관리
  useEffect(() => {
    if (!mapRef.current || isListenersAttached) return;

    const map = mapRef.current;
    console.log(map);

    const handleCenterChanged = () => {
      const center = map.getCenter();
      setSyncState((prev) => ({
        ...prev,
        center: {
          lat: roundCoord(center.lat(), 6),
          lng: roundCoord(center.lng(), 6),
        },
      }));
    };

    const handleZoomChanged = () => {
      const zoom = map.getZoom();
      setSyncState((prev) => ({
        ...prev,
        zoom: zoom,
      }));
    };

    const centerListener = map.addListener(
      "center_changed",
      handleCenterChanged
    );
    const zoomListener = map.addListener("zoom_changed", handleZoomChanged);

    // 클린업: 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      centerListener.remove();
      zoomListener.remove();
    };
  }, [setSyncState, isListenersAttached]);

  const handleMapLoad = (map) => {
    googleMapInstance = map; // 전역 변수에 저장
    mapRef.current = map; // useRef에 저장
    setAttach(true);

    if (mapResolver) {
      mapResolver(map);
      mapResolver = null; // 초기화
    }
  };

  return (
    isLoaded && (
      <GoogleMap
        onLoad={handleMapLoad}
        center={syncState.center}
        zoom={syncState.zoom}
        mapContainerStyle={{
          position: "absolute",
          width: "100%",
          height: "100%",
        }}
      />
    )
  );
};

export const getGoogleMapInstance = async () => {
  if (googleMapInstance) {
    return googleMapInstance;
  }

  return new Promise((resolve) => {
    mapResolver = resolve;
  });
};

export default GoogleMapComponent;
