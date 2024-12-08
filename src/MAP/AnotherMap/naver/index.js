import { NaverMap, Container as MapDiv } from "react-naver-maps";
import { NavermapsProvider } from "react-naver-maps";
import { useRef } from "react";

const NaverMapDiv = ({ center, zoom, naver, style }) => {
  const naverMapRef = useRef(null);
  return (
    <NavermapsProvider ncpClientId={naver}>
      <MapDiv
        style={{
          position: "relative",
          ...style,
          width: "100%",
          height: "100vh",
        }}>
        <NaverMap ref={naverMapRef} center={center} zoom={zoom} style={style} />
      </MapDiv>
    </NavermapsProvider>
  );
};
export default NaverMapDiv;
