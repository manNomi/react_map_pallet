import styled from "styled-components";
import NaverMapDiv from "./naver";

const Map = ({ map, kakao, google, naver }) => {
  const [center, setCenter] = useState({ lat: 37.450284, lng: 126.653478 });
  const [zoom, setZoom] = useState(13);
  const [map] = useMapAPI();
  return (
    <Container>
      {map === "Naver" && (
        <NaverMapDiv
          center={center}
          zoom={zoom}
          setCenter={setCenter}
          setZoom={setZoom}
          naver={naver}
        />
      )}
      {map === "Google" && (
        <GoogleMap
          center={center}
          zoom={zoom}
          setCenter={setCenter}
          setZoom={setZoom}
          google={google}
        />
      )}
      {map === "Kakao" && (
        <KakaoMapDiv
          center={center}
          zoom={zoom}
          setCenter={setCenter}
          setZoom={setZoom}
          kakao={kakao}
        />
      )}
      {map === "Default" && (
        <DefalutMap
          center={center}
          zoom={zoom}
          setCenter={setCenter}
          setZoom={setZoom}
        />
      )}
    </Container>
  );
};
export default Map;

const Container = styled.div`
  width: 100%;
  height: 100%;
`;
