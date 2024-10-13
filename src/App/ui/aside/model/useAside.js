import { useState } from "react";

const useAside = () => {
  const [asideOpen, setAsideChange] = useState(true);
  const setAsideChangeEvent = () => {
    setAsideChange(!asideOpen);
    console.log("클릭");
  };
  return [asideOpen, setAsideChangeEvent];
};
export default useAside;
