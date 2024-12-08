import VectorSource from "ol/source/Vector";
import VectorLayer from "ol/layer/Vector";
import { transform, toLonLat } from "ol/proj";
import { Map as OLMap, View as OLView } from "ol";
import TileLayer from "ol/layer/Tile";
import { useEffect, useState } from "react";
import { OSM } from "ol/source";

const useInitMap = ({
  setVectorSource,
  setLineSource,
  setMarkerSource,
  setOlMapRef,
}) => {
  useEffect(() => {
    // OpenLayers 초기화
    const newVectorSource = new VectorSource({ features: [] });
    const newLineSource = new VectorSource({ features: [] });
    const newMarkerSource = new VectorSource({ features: [] });

    const newMapInstance = new OLMap({
      target: "ol-map",
      layers: [
        new VectorLayer({ source: newMarkerSource }), // 마커 소스
        new VectorLayer({ source: newLineSource }), // 라인 소스
        new TileLayer({
          source: new OSM(),
          opacity: opacity,
        }),
      ],
      view: new OLView({
        center: transform([center.lng, center.lat], "EPSG:4326", "EPSG:3857"),
        zoom: zoom,
        projection: "EPSG:3857",
        minZoom: 3,
        maxZoom: 20,
      }),
    });

    setVectorSource(newVectorSource);
    setLineSource(newLineSource);
    setMarkerSource(newMarkerSource);
    setOlMapRef(newMapInstance);

    return () => {
      if (newMapInstance) newMapInstance.setTarget(null);
    };
  }, []);
};

export default useInitMap;
