const addKakaoListeners = (map) => {
  kakao.maps.event.addListener(map, "center_changed", () => {
    const center = map.getCenter();
    setSyncState((prev) => ({
      ...prev,
      center: { lat: center.getLat(), lng: center.getLng() },
    }));
  });

  kakao.maps.event.addListener(map, "zoom_changed", () => {
    const zoom = map.getLevel();
    setSyncState((prev) => ({ ...prev, zoom: 19 - zoom })); // Kakao의 줌은 레벨이 낮을수록 확대됨
  });
};
