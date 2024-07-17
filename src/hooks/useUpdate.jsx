/* eslint-disable no-unused-vars */
import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

export const useUpate = () => {
  const [isLoading, setIsLoading] = useState();
  const [isError, setIsError] = useState(false);
  const [data, setData] = useState();

  const updateData = useCallback(async (url, toSend) => {
    setIsLoading(true);
    try {
      const resp = await axios.post(url, toSend);
      console.log('in useUpdate response, ', resp);
      if (resp.status !== 201) {
        setIsError(true);
        setData(resp.data);
      }
      if (resp.status === 201) {
        setIsError(false);
        setData(resp.data);
      }
      setIsLoading(false);
    } catch (error) {
      throw new Error(error.message || 'Somethinf went wrong');
    }
  }, []);

  const clearData = () => {
    setData();
  };

  return { data, isLoading, isError, updateData, clearData };
};
