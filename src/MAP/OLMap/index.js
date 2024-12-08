import useMoveEvent from "./model/moveEvent";
import useMapInit from "./model/initMapEvent";

const OLMapComponent = ({ center, zoom, onMapChange, opacity = 0 }) => {
  const [olMapRef, setOlMapRef] = useState(null);
  const [vectorSource, setVectorSource] = useState(null);
  const [sourceLine, setLineSource] = useState(null);
  const [markerSource, setMarkerSource] = useState(null);
  const [check] = useCheckAtom();
  const [busRoute] = useRouteData();

  useMoveEvent();
  useMapInit({ setVectorSource, setLineSource, setMarkerSource, setOlMapRef });

  return (
    <>
      <div
        id="ol-map"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 1,
        }}></div>
      <Markers map={olMapRef} vectorSource={markerSource} />
    </>
  );
};

export default OLMapComponent;
