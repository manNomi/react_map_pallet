import styled from "styled-components";

export const Icon = styled.svg`
  width: 24px;
  height: 24px;
`;
export const IconWrap = styled.svg`
  width: 24px;
  height: 24px;
`;

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: auto;
  height: 100%;
`;

export const Box = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 35px;
  height: 35px;
  border-radius: 50%;
  cursor: pointer;
  background-color: ${({ theme }) => theme.colors.transparent}; // 초기 배경색

  &:hover {
    background-color: ${({ theme }) =>
      theme.colors.hover}; // hover 시 테마에 맞는 배경색 적용
    transition: background-color 0.5s ease; // 배경색 변화를 부드럽게 전환
  }
`;
