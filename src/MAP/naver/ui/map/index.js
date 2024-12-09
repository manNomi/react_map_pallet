import React, { useEffect, useRef } from "react";
import {
  NaverMap,
  Container as MapDiv,
  NavermapsProvider,
} from "react-naver-maps";

const NaverMapDiv = ({ api_key, center, zoom, setSyncState }) => {
  const mapRef = useRef(null); // React ref로 지도 접근

  useEffect(() => {
    const { naver } = window;

    if (mapRef.current && naver) {
      const mapInstance = new naver.maps.Map(mapRef.current, {
        center: new naver.maps.LatLng(center.lat, center.lng),
        zoom,
      });

      // 중심 변경 핸들러
      const handleCenterChanged = () => {
        const newCenter = mapInstance.getCenter();
        setSyncState((prevState) => ({
          ...prevState,
          center: { lat: newCenter.lat(), lng: newCenter.lng() },
        }));
      };

      // 줌 변경 핸들러
      const handleZoomChanged = () => {
        const newZoom = mapInstance.getZoom();
        setSyncState((prevState) => ({
          ...prevState,
          zoom: newZoom,
        }));
      };

      naver.maps.Event.addListener(
        mapInstance,
        "center_changed",
        handleCenterChanged
      );
      naver.maps.Event.addListener(
        mapInstance,
        "zoom_changed",
        handleZoomChanged
      );

      // Clean-up 이벤트 리스너
      return () => {
        naver.maps.Event.removeListener(
          mapInstance,
          "center_changed",
          handleCenterChanged
        );
        naver.maps.Event.removeListener(
          mapInstance,
          "zoom_changed",
          handleZoomChanged
        );
        mapInstance.destroy();
      };
    }
  }, [center, zoom, setSyncState]);

  return (
    <NavermapsProvider ncpClientId={api_key}>
      <MapDiv ref={mapRef} style={{ width: "100%", height: "100%" }}>
        <NaverMap />
      </MapDiv>
    </NavermapsProvider>
  );
};

export default NaverMapDiv;
