import React, { useEffect } from "react";
import NaverMapDiv from "./ui/map";

const NaverMapComponent = ({ api_key, syncState, setSyncState }) => {
  return (
    <NaverMapDiv
      api_key={api_key}
      center={syncState.center}
      zoom={syncState.zoom}
      setSyncState={setSyncState}
    />
  );
};

export default NaverMapComponent;
