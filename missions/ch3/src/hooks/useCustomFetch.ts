import { useState, useEffect } from 'react';
import axios from 'axios';

interface FetchState<T> {
  data: T | null;
  isPending: boolean;
  isError: boolean;
}

type Language = 'ko-KR' | 'en-US';

export function useCustomFetch<T>(url: string, language: Language) {
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    isPending: false,
    isError: false
  });

  useEffect(() => {
    const fetchData = async () => {
      setState(prev => ({ ...prev, isPending: true }));
      
      try {
        const response = await axios.get<T>(url, {
          headers: {
            'Authorization': `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
          },
          params: {
            language: language
          }
        });
        setState({
          data: response.data,
          isPending: false,
          isError: false
        });
      } catch (error) {
        console.error('Error fetching data:', error);
        setState({
          data: null,
          isPending: false,
          isError: true
        });
      }
    };

    fetchData();
  }, [url, language, setState]);

  return state;
} 