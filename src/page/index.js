import Map from "./Map";
import { Routes, Route } from "react-router-dom";
const Page = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Map />} />
      </Routes>
    </>
  );
};
export default Page;
