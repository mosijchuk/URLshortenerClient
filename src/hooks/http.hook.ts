import { useState, useCallback } from "react";
import {Form} from "../types/types";


type Response = {
  [key: string]: string
}
type Request = ( url: string,
    method: string,
    body: Form | string | null,
    headers?: { [key: string]: string }) => Promise<any>



export const useHttp = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const request:Request = useCallback(
      async (url, method = "GET", body = null, headers = {}) => {
        setLoading(true);
        try {
          if (body) {
            body = JSON.stringify(body)
            headers["Content-type"] = "application/json"
          }

          const response = await fetch(url, {
            method,
            body,
            headers,
          });
          const data = await response.json();

          if (!response.ok) {
            throw new Error(data.message || "Something went wrong");
          }

          setLoading(false);

          return data;
        } catch (e) {
          setLoading(false);
          setError(e.message);
          throw e;
        }
    },
    []
  );

  const clearErrors = useCallback(() => setError(null), []);
  return { loading, request, error, clearErrors };
};
