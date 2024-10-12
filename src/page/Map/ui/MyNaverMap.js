import React from "react";
import { NaverMap, Marker, Container as MapDiv } from "react-naver-maps";
import Style from "./style";
const MyNaverMap = () => {
  return (
    <Style.Container>
      <MapDiv style={{ width: "100%", height: "800px" }}>
        <NaverMap
          defaultCenter={{ lat: 37.5665, lng: 126.978 }} // 서울 시청 좌표
          defaultZoom={13}>
          <Marker
            position={{ lat: 37.5665, lng: 126.978 }}
            animation={2} // 애니메이션 설정 (2: BOUNCE)
          />
        </NaverMap>
      </MapDiv>
    </Style.Container>
  );
};

export default MyNaverMap;
