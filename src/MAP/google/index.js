import React, { useRef, useEffect } from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import { compose } from "ol/transform";
let googleMapInstance = null;
let mapResolver = null; // 전역 변수로 추가
const GoogleMapComponent = ({ api_key, syncState, setSyncState }) => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: api_key,
  });

  const roundCoord = (value, precision = 6) => {
    return parseFloat(value.toFixed(precision));
  };

  useEffect(() => {
    if (!googleMapInstance) return;

    const map = googleMapInstance;

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

    // 이벤트 리스너 등록
    const centerChangedListener = map.addListener(
      "center_changed",
      handleCenterChanged
    );
    const zoomChangedListener = map.addListener(
      "zoom_changed",
      handleZoomChanged
    );

    // 클린업: 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      centerChangedListener.remove();
      zoomChangedListener.remove();
    };
  }, [setSyncState]);

  const handleMapLoad = (map) => {
    googleMapInstance = map; // 전역 변수에 저장

    // mapResolver가 있다면 resolve 호출
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
  // 이미 인스턴스가 존재하면 즉시 반환
  if (googleMapInstance) {
    return googleMapInstance;
  }

  // 인스턴스가 아직 없다면 Promise를 통해 대기
  return new Promise((resolve) => {
    mapResolver = resolve; // mapResolver에 resolve 할당
  });
};

export default GoogleMapComponent;
