import MouseWheelZoom from "ol/interaction/MouseWheelZoom";

const useMoveEvent = () => {
  useEffect(() => {
    if (!olMapRef) return;

    const view = olMapRef.getView();
    let zoomTimeout = null; // 디바운스 타이머
    let accumulatedDelta = 0; // 스크롤 양 누적

    // 기본 스크롤 기능 비활성화
    olMapRef.getInteractions().forEach((interaction) => {
      if (interaction instanceof MouseWheelZoom) {
        olMapRef.removeInteraction(interaction);
      }
    });

    // OpenLayers 이벤트 등록
    view.on("change:center", handleCenterChange); // 중심 변경 이벤트
    view.on("change:resolution", handleCenterChange); // 줌 변경 이벤트

    // 클린업
    return () => {
      if (mapElement) {
        mapElement.removeEventListener("wheel", handleScrollZoom); // 이벤트 제거
      }
      if (zoomTimeout) clearTimeout(zoomTimeout); // 디바운스 타이머 제거
      view.un("change:center", handleCenterChange);
      view.un("change:resolution", handleCenterChange);
    };
  }, [olMapRef, onMapChange]);
};

export default useMoveEvent;

// 중심 이동 감지
const handleCenterChange = () => {
  const newCenter = toLonLat(view.getCenter()); // EPSG:4326 좌표 변환
  const currentZoom = Math.round(view.getZoom()); // 줌을 정수로 처리

  onMapChange({ lat: newCenter[1], lng: newCenter[0] }, currentZoom);
};

// DOM에 스크롤 이벤트 등록
const mapElement = document.getElementById("ol-map");
if (mapElement) {
  mapElement.addEventListener("wheel", handleScrollZoom, {
    passive: false,
  }); // 스크롤 이벤트
}

// 커스텀 스크롤 이벤트로 줌 제어
const handleScrollZoom = (event) => {
  event.preventDefault(); // 기본 스크롤 동작 방지
  accumulatedDelta += event.deltaY;

  // 디바운스 처리
  if (zoomTimeout) clearTimeout(zoomTimeout);

  zoomTimeout = setTimeout(() => {
    const currentZoom = view.getZoom();
    const newZoom =
      accumulatedDelta > 0
        ? Math.floor(currentZoom) - 1 // 줌 아웃
        : Math.ceil(currentZoom) + 1; // 줌 인

    view.animate({
      zoom: newZoom,
      duration: 150, // 부드러운 애니메이션
    });

    accumulatedDelta = 0; // 누적 스크롤 초기화
  }, 10); // 100ms 디바운스
};
