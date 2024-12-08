import ReactDOM from "react-dom/client";
import MapContainer from "./MAP/index.js";
import { RecoilRoot } from "recoil";

// 환경 변수 가져오기
const naverClientId = process.env.REACT_APP_NAVER_CLIENT_ID;
const kakaoClientId = process.env.REACT_APP_KAKAO_CLIENT_ID;
const googleClientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

// 렌더링
ReactDOM.createRoot(document.getElementById("root")).render(
  <RecoilRoot>
    <MapContainer
      mapType={"kakao"}
      naver={naverClientId}
      kakao={kakaoClientId}
    />
  </RecoilRoot>
);
