import { useState, useEffect } from 'react';
import axios from 'axios';
import { TOKEN_IDS, COINGECKO_API_KEY } from '../config/constants';
import { PriceData } from '../types';

export const usePrices = () => {
  const [prices, setPrices] = useState<PriceData>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const ids = Object.values(TOKEN_IDS).join(',');
        const response = await axios.get(
          `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd&x_cg_demo_api_key=${COINGECKO_API_KEY}`
        );
        setPrices(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch prices');
        setLoading(false);
      }
    };

    fetchPrices();
    const interval = setInterval(fetchPrices, 60000);
    return () => clearInterval(interval);
  }, []);

  return { prices, loading, error };
};
