import React, { useEffect } from "react";
import { Map, View } from "ol";
import { fromLonLat } from "ol/proj";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import VectorSource from "ol/source/Vector";
import VectorLayer from "ol/layer/Vector";
import { Icon, Style } from "ol/style";

const OLMarker = ({ syncState, iconUrl, onClick }) => {
  useEffect(() => {
    if (!iconUrl) {
      console.error("Icon URL is required for the marker.");
      return;
    }

    // OpenLayers 지도 초기화
    const map = new Map({
      target: "ol-map",
      layers: [],
      view: new View({
        center: fromLonLat([syncState.center.lng, syncState.center.lat]),
        zoom: syncState.zoom,
      }),
    });

    // 마커 생성
    const markerFeature = new Feature({
      geometry: new Point(
        fromLonLat([syncState.center.lng, syncState.center.lat])
      ),
    });

    // 마커 스타일: iconUrl을 이미지로 설정
    markerFeature.setStyle(
      new Style({
        image: new Icon({
          src: iconUrl, // iconUrl로 설정
          scale: 0.5, // 이미지 크기 조정
        }),
      })
    );

    // 마커 레이어 생성 및 지도에 추가
    const vectorSource = new VectorSource({
      features: [markerFeature],
    });

    const markerLayer = new VectorLayer({
      source: vectorSource,
    });

    map.addLayer(markerLayer);

    // 클릭 이벤트 추가
    map.on("singleclick", (event) => {
      map.forEachFeatureAtPixel(event.pixel, (feature) => {
        if (feature === markerFeature && onClick) {
          onClick(event);
        }
      });
    });

    // Clean-up on component unmount
    return () => {
      map.setTarget(null);
    };
  }, [syncState, iconUrl, onClick]);

  return <div id="ol-map" style={{ width: "100%", height: "100%" }} />;
};

OLMarker.defaultProps = {
  mapType: "openLayer",
};

export default OLMarker;
