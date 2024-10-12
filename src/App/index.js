import { PC, Mobile } from "./model/useMediaQuery.js";
import { BrowserRouter } from "react-router-dom";
import SearchContainer from "./ui/header";
import GlobalStyle from "./style/GloabalStyle.js";
import Page from "../page/index.js";
const App = () => {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <PC>
        <SearchContainer />
        <Page />
      </PC>
      <Mobile>
        <SearchContainer />
        <Page />
      </Mobile>
    </BrowserRouter>
  );
};

export default App;
