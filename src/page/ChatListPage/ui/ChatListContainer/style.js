import styled from "styled-components";

export default {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    justify-content: space-between;
    min-height: 100vh;
  `,
  Header: styled.header`
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    height: 40px;
    border-bottom: 2px solid black;
  `,
  Logo: styled.p`
    font-size: 15px;
    font-weight: 900;
  `,
  Title: styled.p`
    font-size: 15px;
    font-weight: 900;
  `,
  Content: styled.main`
    display: flex;
    flex-direction: column;
    align-items: start;
    width: 100%;
    height: 100%;
    flex: 1;
    flex-grow: 1;
  `,
};
