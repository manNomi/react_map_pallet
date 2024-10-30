import Style from "./style";
import { useEffect } from "react";

const Advertise = () => {
  useEffect(() => {
    // AdSense 스크립트가 이미 로드되었는지 확인
    const existingScript = document.querySelector(
      "script[src='https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js']"
    );

    if (!existingScript) {
      // 스크립트가 없으면 동적으로 추가
      const script = document.createElement("script");
      script.src =
        "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8983060889326524";
      script.async = true;
      script.crossOrigin = "anonymous";
      document.body.appendChild(script);

      // 스크립트가 로드된 후에 광고를 초기화
      script.onload = () => {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      };
    } else {
      // 스크립트가 이미 있으면 바로 광고 초기화
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    }
  }, []);
  return (
    <Style.Ad>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-8983060889326524"
        data-ad-slot="1234567890" // Ad slot ID로 변경
        data-ad-format="auto"
        data-full-width-responsive="true"></ins>
    </Style.Ad>
  );
};

export default Advertise;
