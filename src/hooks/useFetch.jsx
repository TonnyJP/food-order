/* eslint-disable no-unused-vars */
import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

export const useFetch = (url) => {
  const [isLoading, setIsLoading] = useState();
  const [isError, setIsError] = useState(false);
  const [data, setData] = useState([]);

  const fetch = useCallback(async () => {
    setIsLoading(true);
    try {
      const resp = await axios.get(url);
      if (resp.status !== 200) {
        setIsError(true);
      }
      if (resp.status === 200) {
        setData(resp.data);
        setIsError(false);
      }
    } catch (error) {
      //throw new Error(error.message || "couldn''t fetch");
      setIsError(error.message || 'Something went wrong!!!');
    }
    setIsLoading(false);
  }, [url]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return { data, isLoading, isError };
};
