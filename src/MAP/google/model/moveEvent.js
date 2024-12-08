// 이벤트 리스너 설정
const addGoogleListeners = (map) => {
  map.addListener("center_changed", () => {
    const center = map.getCenter();
    setSyncState((prev) => ({
      ...prev,
      center: { lat: center.lat(), lng: center.lng() },
    }));
  });

  map.addListener("zoom_changed", () => {
    const zoom = map.getZoom();
    setSyncState((prev) => ({ ...prev, zoom }));
  });
};
