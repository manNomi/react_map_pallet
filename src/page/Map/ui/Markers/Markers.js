import React, { useEffect, useState } from "react";
import { Marker, useMap } from "react-naver-maps";
import useBusStop from "../../model/useBusStop";
import useNode from "../../model/useNodeInit";
import {
  busStop,
  nodeLocation,
} from "../../../../entities/Bus/BusLocationData";
import useCheckAtom from "../../../../shared/recoil/useCheckAtom";
import handleMarkerClick from "../BusStop/markerClick";
import usePageChange from "../../model/usePageChange";
import useBus from "../../model/useBus";
import useTestBus from "../../model/useTestBus";
import { useMapOptions } from "../../model/useMapOption";
import bus_stop_icon from "../../assets/bus_stop_icon.svg";

const Markers = () => {
  const [busStops, setBusAdd, setBusDelete] = useBusStop();
  const [nodeData, setNodeAdd, setNodeDelete] = useNode();
  const [check] = useCheckAtom();
  const changePage = usePageChange("./chat");
  const [, setBus, ,] = useBus();
  const [, setTestBus, ,] = useTestBus();
  const [, setOptionEvent] = useMapOptions();
  const map = useMap(); // 지도 객체 가져오기

  useEffect(() => {
    if (check.node) setNodeAdd(nodeLocation);
    else setNodeDelete();
  }, [check.node]);

  useEffect(() => {
    if (check.low) {
      setBusAdd(busStop.filter((busStation) => busStation.lastNode < 36));
    } else {
      setBusDelete("하행");
    }
  }, [check.low, busStop]);

  useEffect(() => {
    if (check.high) {
      setBusAdd(busStop.filter((busStation) => busStation.lastNode >= 36));
    } else {
      setBusDelete("상행");
    }
  }, [check.high, busStop]);

  return (
    <>
      {busStops.map((stopData, index) => (
        <Marker
          key={index}
          position={stopData.busPoint}
          onClick={() =>
            handleMarkerClick(
              stopData,
              map,
              changePage,
              setBus,
              setTestBus,
              setOptionEvent
            )
          }
        />
      ))}
      {nodeData.map((data, index) => (
        <Marker key={index} position={{ lat: data.lat, lng: data.lng }} />
      ))}
    </>
  );
};

export default Markers;
