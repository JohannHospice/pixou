import { useEffect, useState } from "react";

// Hook pour gerer la recuperation des donnees (chargement, erreurs...)
export default function useFetch<T>(
  initialValue: T,
  apiCall: () => Promise<T>
) {
  const [data, setData] = useState<T>(initialValue);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const data = await apiCall();
        setData(data);
      } catch (err) {
        console.error(apiCall.name, err);
        setError(true);
      }
      setLoading(false);
    })();
  }, [apiCall]);

  return { data, loading, error };
}
