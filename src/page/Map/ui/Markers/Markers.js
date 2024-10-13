import { Marker } from "react-naver-maps";
import useBusStop from "../../model/useBusStop";
import { useEffect } from "react";
import { busStop, nodeLocation } from "../../../../shared/BusLocationData";
import useNode from "../../model/useNodeInit";
import useCheckAtom from "../../../../shared/recoil/useCheckAtom";
const Markers = () => {
  const [busStops, setBusAdd, setBusDelete] = useBusStop();
  const [nodeData, setNodeAdd, setNodeDelete] = useNode();
  const [check] = useCheckAtom();
  useEffect(() => {
    if (check.node) {
      setNodeAdd(nodeLocation);
    } else {
      setNodeDelete(); // 함수 호출
    }
  }, [check.node]);
  useEffect(() => {
    if (check.bus) {
      setBusAdd(busStop);
    } else {
      setBusDelete(); // 함수 호출
    }
  }, [check.bus]);
  return (
    <>
      {busStops.map((stop, index) => (
        <Marker key={index} position={stop.busPoint} />
      ))}
      {nodeData.map((data, index) => (
        <Marker key={index} position={data} />
      ))}
    </>
  );
};

export default Markers;
