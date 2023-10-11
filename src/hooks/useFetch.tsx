import { useState, useEffect } from "react";

const useFetch = (url: string) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json', 
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    },
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(url, requestOptions);
        const json = await res.json();
        setData(json);
        setLoading(false);
      } catch (error: any) {
        setError(error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  return { data, error, loading };
};
export default useFetch;