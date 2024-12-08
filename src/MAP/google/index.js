import React, { useRef } from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";

const GoogleMapDiv = ({ center, zoom, setCenter, setZoom }) => {
  const googleMapRef = useRef(null);

  const mapContainerStyle = {
    width: "100%",
    height: "90vh",
    position: "relative",
  };

  return (
    <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
      <div style={mapContainerStyle}>
        {/* Google Map */}
        <GoogleMap
          ref={googleMapRef}
          center={center}
          zoom={zoom}
          mapContainerStyle={{ width: "100%", height: "100%" }}
          onLoad={(map) => {
            googleMapRef.current = map;
          }}
        />
      </div>
    </LoadScript>
  );
};

export default GoogleMapDiv;
