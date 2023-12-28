import axios from "axios";
import { useEffect, useState } from "react";

export const useFetch = (fetchFn, intitialValue) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [data, setData] = useState(intitialValue);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        const { data } = await axios.get(fetchFn);
        setData(data);
      } catch (error) {
        setError(error);
      }
      setIsLoading(false);
    };

    fetchData();
  }, [fetchFn]);

  return { data, isLoading, error, setData };
};
