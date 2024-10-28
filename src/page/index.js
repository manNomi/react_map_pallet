import Map from "./Map";
import ChatPage from "./ChatPage";
import { Routes, Route } from "react-router-dom";
const Page = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Map />} />
        <Route path="/chat" element={<ChatPage />} />
      </Routes>
    </>
  );
};
export default Page;
