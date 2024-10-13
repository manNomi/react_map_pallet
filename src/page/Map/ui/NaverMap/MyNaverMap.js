import React, { useEffect, useRef, useCallback } from "react";
import {
  NaverMap,
  Marker,
  Container as MapDiv,
  useMap,
} from "react-naver-maps";
import Style from "./style";
import { useMapOptions } from "../../model/useMapOption";
import Markers from "../Markers/Markers";

const MyNaverMap = () => {
  const [option, setOptionEvent] = useMapOptions();
  useEffect(() => {
    setOptionEvent({
      minZoom: 10,
      maxZoom: 18,
      center: { lat: 37.450284, lng: 126.653478 },
    });
  }, []);

  return (
    <Style.Container>
      <MapDiv style={{ width: "100%", height: "600px" }}>
        <NaverMap
          center={option.center}
          minZoom={option.minZoom}
          maxZoom={option.maxZoom}
          zoom={13}>
          <Marker position={{ lat: 37.450284, lng: 126.653478 }} />
          <Markers />
        </NaverMap>
      </MapDiv>
    </Style.Container>
  );
};

export default MyNaverMap;
