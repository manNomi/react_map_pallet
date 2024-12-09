import React, { useEffect } from "react";
import NaverMapDiv from "./naver";

const NaverMapComponent = ({ api_key, syncState, setSyncState }) => {
  return (
    <NaverMapDiv
      apiKey={api_key}
      center={syncState.center}
      zoom={syncState.zoom}
      setSyncState={setSyncState}
    />
  );
};

export default NaverMapComponent;
