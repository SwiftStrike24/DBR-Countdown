import { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  TooltipProps,
} from 'recharts';
import { format } from 'date-fns';
import { TOKEN_IDS, COINGECKO_API_KEY } from '../config/constants';

const ChartContainer = styled.div`
  width: 100%;
  max-width: 400px;
  height: 400px;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 16px;
  padding: 1rem;
  margin-bottom: 1rem;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  position: relative;
  overflow: hidden;
  align-self: flex-start;
`;

const LoadingOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 1rem;
  z-index: 10;
`;

const ChartHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const ChartTitle = styled.div`
  color: #888;
  font-size: 0.9rem;
`;

const TimeframeButtons = styled.div`
  display: flex;
  gap: 0.5rem;
`;

interface TimeButtonProps {
  active: boolean;
}

const TimeButton = styled.button<TimeButtonProps>`
  background: ${(props: TimeButtonProps) => props.active ? 'rgba(251, 255, 58, 0.1)' : 'rgba(255, 255, 255, 0.05)'};
  border: 1px solid ${(props: TimeButtonProps) => props.active ? '#FBFF3A' : 'rgba(255, 255, 255, 0.1)'};
  color: ${(props: TimeButtonProps) => props.active ? '#FBFF3A' : '#888'};
  padding: 4px 8px;
  border-radius: 8px;
  font-size: 0.8rem;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(251, 255, 58, 0.1);
    border-color: #FBFF3A;
    color: #FBFF3A;
  }
`;

interface PriceData {
  prices: [number, number][];
}

interface ChartDataPoint {
  timestamp: number;
  price: number;
  formattedDate: string;
}

type Timeframe = '24H' | '7D' | '30D';

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    value: number;
  }>;
  label?: string;
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          background: 'rgba(0, 0, 0, 0.8)',
          padding: '8px',
          border: '1px solid #444',
          borderRadius: '4px',
        }}
      >
        <p style={{ color: '#fff', margin: 0 }}>
          {label ? format(new Date(parseInt(label)), 'MMM d, yyyy HH:mm') : ''}
        </p>
        <p style={{ color: '#FBFF3A', margin: '4px 0 0 0' }}>
          ${payload[0].value.toFixed(4)}
        </p>
      </div>
    );
  }
  return null;
};

const getTimeframeParams = (timeframe: Timeframe): { days: string; interval?: string } => {
  switch (timeframe) {
    case '24H':
      return { days: '1' };  
    case '7D':
      return { days: '7', interval: 'daily' };
    case '30D':
      return { days: '30', interval: 'daily' };
    default:
      return { days: '7', interval: 'daily' };
  }
};

export const PriceChart = () => {
  const [loading, setLoading] = useState(true);
  const [chartData, setChartData] = useState<ChartDataPoint[]>([]);
  const [timeframe, setTimeframe] = useState<Timeframe>('7D');
  const [error, setError] = useState<string | null>(null);

  const fetchPriceHistory = async (selectedTimeframe: Timeframe) => {
    try {
      setLoading(true);
      setError(null);
      const params = getTimeframeParams(selectedTimeframe);
      
      console.log('Fetching with params:', params);
      
      const response = await axios.get<PriceData>(
        `https://api.coingecko.com/api/v3/coins/${TOKEN_IDS.DBR}/market_chart`,
        {
          params: {
            vs_currency: 'usd',
            days: params.days,
            ...(params.interval && { interval: params.interval })
          },
          headers: {
            'x-cg-demo-api-key': COINGECKO_API_KEY
          }
        }
      );

      if (!response.data.prices || response.data.prices.length === 0) {
        throw new Error('No price data available');
      }

      const formatString = selectedTimeframe === '24H' ? 'HH:mm' : 'MMM d';
      let formattedData = response.data.prices.map(([timestamp, price]) => ({
        timestamp,
        price,
        formattedDate: format(new Date(timestamp), formatString),
      }));

      if (selectedTimeframe === '24H') {
        formattedData = formattedData.filter((_, index) => index % 6 === 0);
      }

      setChartData(formattedData);
    } catch (error: any) {
      console.error('Error details:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status
      });
      setError(error.response?.data?.error || 'Failed to fetch price data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPriceHistory(timeframe);
    const interval = setInterval(() => fetchPriceHistory(timeframe), 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [timeframe]);

  const handleTimeframeChange = (newTimeframe: Timeframe) => {
    setTimeframe(newTimeframe);
  };

  return (
    <ChartContainer>
      <ChartHeader>
        <ChartTitle>DBR/USDC Price</ChartTitle>
        <TimeframeButtons>
          {(['24H', '7D', '30D'] as Timeframe[]).map((tf) => (
            <TimeButton
              key={tf}
              active={timeframe === tf}
              onClick={() => handleTimeframeChange(tf)}
            >
              {tf}
            </TimeButton>
          ))}
        </TimeframeButtons>
      </ChartHeader>
      {loading && <LoadingOverlay>Loading price data...</LoadingOverlay>}
      {error && (
        <div style={{ color: '#ff4444', textAlign: 'center', padding: '1rem' }}>
          {error}
        </div>
      )}
      {!loading && !error && chartData.length > 0 && (
        <ResponsiveContainer width="100%" height={330}>
          <LineChart data={chartData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis
              dataKey="timestamp"
              tickFormatter={(timestamp) => 
                format(new Date(timestamp), timeframe === '24H' ? 'HH:mm' : 'MMM d')}
              stroke="#888"
              tick={{ fill: '#888', fontSize: 12 }}
            />
            <YAxis
              stroke="#888"
              tick={{ fill: '#888', fontSize: 12 }}
              tickFormatter={(value) => `$${value.toFixed(2)}`}
              domain={['auto', 'auto']}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="price"
              stroke="#FBFF3A"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4, fill: '#FBFF3A' }}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </ChartContainer>
  );
};
