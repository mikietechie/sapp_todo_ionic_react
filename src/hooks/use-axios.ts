import axios from "axios";
import { useEffect, useRef, useState } from "react";

export const useAxios = (url: string, method: string, payload: any=null) => {
    const [data, setData] = useState<any>(null);
    const [error, setError] = useState<any>("");
    const [loaded, setLoaded] = useState(false);
    const controllerRef = useRef(new AbortController())
    const cancel = () => {
      controllerRef.current.abort()
    }
  
    useEffect(() => {
      (async () => {
        try {
          const response = await axios.request({
            data: payload,
            signal: controllerRef.current.signal,
            method,
            url,
          });
  
          setData(response.data);
        } catch (error) {
          setError(error);
        } finally {
          setLoaded(true);
        }
      })();
    }, []);
  
    return { cancel, data, error, loaded };
  };
  