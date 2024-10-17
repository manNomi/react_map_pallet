import React, { useEffect } from "react";
import { Marker, useMap } from "react-naver-maps";
import useBusStop from "../../model/useBusStop";
import useNode from "../../model/useNodeInit";
import { busStop, nodeLocation } from "../../../../entities/BusLocationData";
import useCheckAtom from "../../../../shared/recoil/useCheckAtom";
import handleMarkerClick from "../../model/markerClick";

const Markers = () => {
  const [busStops, setBusAdd, setBusDelete] = useBusStop();
  const [nodeData, setNodeAdd, setNodeDelete] = useNode();
  const [check] = useCheckAtom();

  const map = useMap(); // 지도 객체 가져오기

  // 마커 클릭 핸들러: 네이버 API 사용하여 InfoWindow 생성

  useEffect(() => {
    if (check.node) setNodeAdd(nodeLocation);
    else setNodeDelete();
  }, [check.node]);

  useEffect(() => {
    if (check.bus) setBusAdd(busStop);
    else setBusDelete();
  }, [check.bus]);

  return (
    <>
      {busStops.map((stopData, index) => (
        <Marker
          key={index}
          position={stopData.busPoint}
          onClick={() => handleMarkerClick(stopData, map)}
        />
      ))}
      {nodeData.map((data, index) => (
        <Marker key={index} position={{ lat: data.lat, lng: data.lng }} />
      ))}
    </>
  );
};

export default Markers;
