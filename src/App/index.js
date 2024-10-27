import { PC, Mobile } from "./model/useMediaQuery.js";
import { BrowserRouter } from "react-router-dom";
import Aside from "./ui/aside";
import GlobalStyle from "./style/GloabalStyle.js";
import Page from "../page/index.js";

const App = () => {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <PC>
        <Aside />
        <Page />
      </PC>
      <Mobile>
        <Aside />
        <Page />
      </Mobile>
    </BrowserRouter>
  );
};

export default App;
