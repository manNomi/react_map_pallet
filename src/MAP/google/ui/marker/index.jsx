import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { getGoogleMapInstance } from "../../index";

const GoogleMarker = ({ position, children, onClick }) => {
  const [map, setMap] = useState(null);

  useEffect(() => {
    const initMap = async () => {
      try {
        const googleMap = await getGoogleMapInstance();
        setMap(googleMap);
      } catch (error) {
        console.error("Google Map instance could not be retrieved:", error);
      }
    };

    initMap();
  }, []);

  useEffect(() => {
    // 마커 DOM 생성
    const markerElement = document.createElement("div");
    markerElement.style.position = "absolute";
    markerElement.style.width = "50px";
    markerElement.style.height = "50px";

    ReactDOM.render(
      React.cloneElement(children, {
        style: { width: "100%", height: "100%" },
      }),
      markerElement
    );

    const marker = new window.google.maps.Marker({
      position: new window.google.maps.LatLng(position.lat, position.lng),
      map,
      icon: {
        content: markerElement,
      },
    });

    // 클릭 이벤트 추가
    if (onClick) {
      marker.addListener("click", () => onClick());
    }

    return () => {
      marker.setMap(null);
    };
  }, [map, position, children, onClick]);

  return null;
};

GoogleMarker.defaultProps = {
  mapType: "google",
};

export default GoogleMarker;
