// SplashPage.js
import React from "react";
import { SplashContainer, Logo, Tagline, LoadingIndicator, Box } from "./style";

const SplashPage = () => {
  return (
    <SplashContainer>
      <Box>
        <Logo>버스 라이브 511</Logo>
        <Tagline>실시간 서울 511번 버스 위치 추적</Tagline>
        <LoadingIndicator />
      </Box>
    </SplashContainer>
  );
};

export default SplashPage;
