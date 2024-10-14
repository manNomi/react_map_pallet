import { useState } from "react";
import React from "react";
// 아래 양식으로 교체요함
// { 번호판 , node: 1, position: { lat: 37.45707758, lng: 126.6712355 } },
// 맞지 ?
const getBusData = () => {
  const nodes = [
    { node: 15, position: { lat: 37.46404699, lng: 126.6803543 } },
    { node: 1, position: { lat: 37.45707758, lng: 126.6712355 } },
    { node: 3, position: { lat: 37.45259879, lng: 126.6454402 } },
    { node: 5, position: { lat: 37.46005146, lng: 126.6723939 } },
    { node: 44, position: { lat: 37.44780524, lng: 126.6462968 } },
    { node: 46, position: { lat: 37.45178038, lng: 126.6488714 } },
    { node: 2, position: { lat: 37.44955508, lng: 126.6632096 } },
    { node: 31, position: { lat: 37.45871559, lng: 126.6743077 } },
    { node: 13, position: { lat: 37.4522631, lng: 126.6675775 } },
    { node: 41, position: { lat: 37.45290046, lng: 126.6447682 } },
  ];
  return nodes;
};

const useBusData = () => {
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
export default useBusData;
