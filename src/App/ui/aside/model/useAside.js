import { useState } from "react";

const useAside = () => {
  const [asideOpen, setAsideChange] = useState(true);
  const setAsideChangeEvent = () => {
    setAsideChange(!asideOpen);
  };
  return [asideOpen, setAsideChangeEvent];
};
export default useAside;
