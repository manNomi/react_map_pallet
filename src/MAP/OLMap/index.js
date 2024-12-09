import React, { useEffect, useRef } from "react";
import { Map as OLMap, View } from "ol";
import { transform, toLonLat } from "ol/proj";
import "ol/ol.css";

const OpenLayersComponent = ({ syncState, setSyncState, style }) => {
  const olMapRef = useRef(null);

  useEffect(() => {
    // 지도 초기화
    if (!olMapRef.current) {
      olMapRef.current = new OLMap({
        target: "ol-map",
        view: new View({
          center: transform(
            [syncState.center.lng, syncState.center.lat],
            "EPSG:4326",
            "EPSG:3857" // OpenLayers 기본 좌표계
          ),
          zoom: syncState.zoom,
          projection: "EPSG:3857",
        }),
      });

      // 지도 중심 변경 이벤트
      const view = olMapRef.current.getView();
      const handleCenterChange = () => {
        const [lng, lat] = toLonLat(view.getCenter(), "EPSG:3857"); // EPSG:4326으로 변환
        setSyncState((prevState) => ({
          ...prevState,
          center: {
            lat: parseFloat(lat.toFixed(6)),
            lng: parseFloat(lng.toFixed(6)),
          },
        }));
      };

      // 지도 줌 변경 이벤트
      const handleZoomChange = () => {
        const zoom = view.getZoom();
        setSyncState((prevState) => ({
          ...prevState,
          zoom: zoom,
        }));
      };

      view.on("change:center", handleCenterChange);
      view.on("change:resolution", handleZoomChange);

      // 클린업 함수에서 이벤트 리스너 제거
      return () => {
        view.un("change:center", handleCenterChange);
        view.un("change:resolution", handleZoomChange);
      };
    } else {
      // 상태 변경 시 지도 업데이트
      const view = olMapRef.current.getView();
      view.setCenter(
        transform(
          [syncState.center.lng, syncState.center.lat],
          "EPSG:4326",
          "EPSG:3857" // OpenLayers 기본 좌표계
        )
      );
      view.setZoom(syncState.zoom);
    }
  }, [syncState, setSyncState]);

  return (
    <div style={style}>
      <div id="ol-map" style={{ width: "100%", height: "100%" }} />
    </div>
  );
};

export default OpenLayersComponent;
