import { useState, useEffect } from 'react';
import axios from 'axios';
import { TOKEN_IDS, COINGECKO_API_KEY } from '../config/constants';
import { PriceData, CurrencyRate, SupportedCurrency } from '../types';
import { useCurrency } from '../context/CurrencyContext';

export const usePrices = () => {
  const [prices, setPrices] = useState<PriceData>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { currency } = useCurrency();
  
  const fetchPrices = async () => {
    try {
      const [priceResponse, coinDataResponse] = await Promise.all([
        axios.get(
          `https://api.coingecko.com/api/v3/simple/price?ids=${Object.values(TOKEN_IDS).join(',')}&vs_currencies=${currency.toLowerCase()}&x_cg_demo_api_key=${COINGECKO_API_KEY}`
        ),
        axios.get(
          `https://api.coingecko.com/api/v3/coins/markets?ids=${Object.values(TOKEN_IDS).join(',')}&vs_currency=usd&x_cg_demo_api_key=${COINGECKO_API_KEY}`
        )
      ]);

      const logoUrls = coinDataResponse.data.reduce((acc: Record<string, string>, coin: any) => {
        acc[coin.id] = coin.image;
        return acc;
      }, {});

      const transformedPrices = Object.entries(priceResponse.data).reduce((acc, [key, value]) => {
        if (typeof value === 'object' && value !== null) {
          acc[key] = {
            usd: (value as Record<string, number>)[currency.toLowerCase()],
            image: logoUrls[key]
          };
        }
        return acc;
      }, {} as PriceData);

      setPrices(transformedPrices);
      setLoading(false);
    } catch (err) {
      console.error('Price fetch error:', err);
      setError('Failed to fetch prices');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrices();
    const interval = setInterval(fetchPrices, 60000);
    return () => clearInterval(interval);
  }, [currency]); // Add currency as dependency

  return { 
    prices, 
    loading, 
    error, 
    refetch: fetchPrices 
  };
};
