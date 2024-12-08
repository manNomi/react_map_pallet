import React, { useEffect } from "react";
import NaverMapDiv from "./naver";

const NaverMapComponent = ({ api_key, syncState, setSyncState, style }) => {
  const addNaverListeners = (map) => {
    map.addListener("center_changed", () => {
      const center = map.getCenter();
      setSyncState((prev) => ({
        ...prev,
        center: { lat: center.lat, lng: center.lng },
      }));
    });

    map.addListener("zoom_changed", () => {
      setSyncState((prev) => ({ ...prev, zoom: map.getZoom() }));
    });
  };

  return (
    <NaverMapDiv
      naver={api_key}
      center={syncState.center}
      zoom={syncState.zoom}
      onLoad={(map) => addNaverListeners(map)}
    />
  );
};

export default NaverMapComponent;
