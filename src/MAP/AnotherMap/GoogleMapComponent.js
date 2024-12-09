import React, { useRef, useEffect } from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";

const GoogleMapComponent = ({ api_key, syncState, setSyncState }) => {
  const googleMapRef = useRef(null);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: api_key,
  });

  const roundCoord = (value, precision = 6) => {
    return parseFloat(value.toFixed(precision));
  };

  useEffect(() => {
    const map = googleMapRef.current;

    if (!map) return;

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
      setSyncState((prev) => ({
        ...prev,
        zoom: map.getZoom(),
      }));
    };

    // 이벤트 리스너 등록
    map.addListener("center_changed", handleCenterChanged);
    map.addListener("zoom_changed", handleZoomChanged);

    // 클린업: 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      map.clearListeners(map, "center_changed");
      map.clearListeners(map, "zoom_changed");
    };
  }, [setSyncState]);

  return (
    isLoaded && (
      <GoogleMap
        center={syncState.center}
        zoom={syncState.zoom}
        mapContainerStyle={{
          position: "absolute",
          width: "100%",
          height: "100%",
        }}
        onLoad={(map) => {
          googleMapRef.current = map;
        }}
      />
    )
  );
};

export default GoogleMapComponent;
