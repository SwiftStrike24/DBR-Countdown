import { useState, useEffect } from 'react';
import axios from 'axios';
import { TOKEN_IDS, COINGECKO_API_KEY } from '../config/constants';
import { PriceData, CurrencyRate, SupportedCurrency } from '../types';
import { useCurrency } from '../context/CurrencyContext';

export const usePrices = () => {
  const [prices, setPrices] = useState<PriceData>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [exchangeRates, setExchangeRates] = useState<CurrencyRate>({});
  const { currency } = useCurrency();

  const fetchPrices = async () => {
    try {
      const [pricesResponse, ratesResponse] = await Promise.all([
        axios.get(
          `https://api.coingecko.com/api/v3/simple/price?ids=${Object.values(TOKEN_IDS).join(',')}&vs_currencies=usd&x_cg_demo_api_key=${COINGECKO_API_KEY}`
        ),
        axios.get('https://api.exchangerate-api.com/v4/latest/USD')
      ]);

      setPrices(pricesResponse.data);
      setExchangeRates(ratesResponse.data.rates);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch prices');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrices();
    const interval = setInterval(fetchPrices, 60000);
    return () => clearInterval(interval);
  }, []);

  const convertPrice = (usdPrice: number): number => {
    if (currency === 'USD') return usdPrice;
    return usdPrice * (exchangeRates[currency] || 1);
  };

  const convertedPrices = Object.entries(prices).reduce((acc, [key, value]) => {
    acc[key] = { usd: convertPrice(value.usd) };
    return acc;
  }, {} as PriceData);

  return { 
    prices: convertedPrices, 
    loading, 
    error, 
    refetch: fetchPrices 
  };
};
