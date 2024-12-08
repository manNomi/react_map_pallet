import React, { useRef } from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";

const GoogleMapComponent = ({ google, syncState, setSyncState }) => {
  const googleMapRef = useRef(null);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: google,
  });

  const addGoogleListeners = (map) => {
    map.addListener("center_changed", () => {
      const center = map.getCenter();
      setSyncState((prev) => ({
        ...prev,
        center: { lat: center.lat(), lng: center.lng() },
      }));
    });

    map.addListener("zoom_changed", () => {
      setSyncState((prev) => ({ ...prev, zoom: map.getZoom() }));
    });
  };

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
          addGoogleListeners(map);
        }}
      />
    )
  );
};

export default GoogleMapComponent;
