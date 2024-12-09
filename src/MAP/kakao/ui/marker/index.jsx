import React, { useEffect } from "react";

const KakaoMarker = ({ syncState, children, onClick }) => {
  useEffect(() => {
    const { kakao } = window;
    if (!kakao) return;

    const mapContainer = document.getElementById("kakao-map");
    const options = {
      center: new kakao.maps.LatLng(syncState.center.lat, syncState.center.lng),
      level: syncState.zoom,
    };

    const map = new kakao.maps.Map(mapContainer, options);

    const markerImage = new kakao.maps.MarkerImage(
      children,
      new kakao.maps.Size(50, 50),
      { offset: new kakao.maps.Point(25, 25) }
    );

    const marker = new kakao.maps.Marker({
      position: new kakao.maps.LatLng(
        syncState.center.lat,
        syncState.center.lng
      ),
      map,
      image: markerImage,
    });

    // 클릭 이벤트 추가
    kakao.maps.event.addListener(marker, "click", () => {
      if (onClick) onClick();
    });
  }, [syncState, children, onClick]);

  return null;
};

KakaoMarker.defaultProps = {
  mapType: "kakao",
};

export default KakaoMarker;
