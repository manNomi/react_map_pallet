import { useState } from "react";
import React from "react";
// 아래 양식으로 교체요함
// { 번호판 , node: 1, position: { lat: 37.45707758, lng: 126.6712355 } },
// 맞지 ?
const getBusData = () => {
  const nodes = [
    { node: 0, position: { lat: 37.4478052441598, lng: 126.646296789041 } },
    { node: 3, position: { lat: 37.4460269045282, lng: 126.643593618829 } },
    { node: 15, position: { lat: 37.4503492910096, lng: 126.659916449765 } },
    { node: 27, position: { lat: 37.4587371703138, lng: 126.676210388807 } },
    { node: 36, position: { lat: 37.4641711732054, lng: 126.677968529141 } },
    { node: 60, position: { lat: 37.4487536815333, lng: 126.649458501003 } },
  ];
  return nodes;
};

const useTestBusData = () => {
  const [busData, setBusData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const busData = getBusData();
        setBusData(busData);
        setLoading(false);
      } catch (error) {
        setError(true);
      }
    };

    fetchData();
  }, []);
  return [busData, loading, error];
};
export default useTestBusData;
