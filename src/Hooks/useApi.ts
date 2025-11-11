import { useState } from "react";

export const useApi = (baseUrl: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const request = async (endpoint: string, options?: RequestInit) => {
    setLoading(true);
    try {
      const res = await fetch(`${baseUrl}${endpoint}`, options);
      if (!res.ok) throw new Error("Request failed");
      const data = await res.json();
      return data;
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { request, loading, error };
};
