import React, { useEffect, useRef } from "react";
import { Map as OLMap, View } from "ol";
import "ol/ol.css";

const OpenLayersComponent = ({ syncState }) => {
  const olMapRef = useRef(null);

  useEffect(() => {
    if (!olMapRef.current) {
      olMapRef.current = new OLMap({
        target: "ol-map",
        view: new View({
          center: [syncState.center.lng, syncState.center.lat],
          zoom: syncState.zoom,
          projection: "EPSG:4326",
        }),
      });
    } else {
      const view = olMapRef.current.getView();
      view.setCenter([syncState.center.lng, syncState.center.lat]);
      view.setZoom(syncState.zoom);
    }
  }, [syncState]);

  return <div id="ol-map" style={{ width: "100%", height: "100%" }} />;
};

export default OpenLayersComponent;
