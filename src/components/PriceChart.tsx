import { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import axios from 'axios';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { format } from 'date-fns';
import { TOKEN_IDS, COINGECKO_API_KEY } from '../config/constants';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const ChartContainer = styled.div`
  background: rgba(0, 0, 0, 0.2);
  border-radius: 12px;
  padding: 1rem;
  margin: 1rem 0;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.18);
  width: 100%;
  max-width: 1200px;
  height: 350px;
  position: relative;
  overflow: hidden;
  margin: 0 auto;
  animation: ${fadeIn} 0.6s ease-out;

  @media (max-width: 1400px) {
    max-width: 1000px;
  }

  @media (max-width: 1200px) {
    max-width: 800px;
  }

  @media (max-width: 992px) {
    max-width: 92%;
    height: 300px;
    padding: 0.75rem;
  }

  @media (max-width: 768px) {
    height: 300px;
    padding: 0.5rem;
  }

  @media (max-width: 480px) {
    height: 250px;
    margin-bottom: 1rem;
    padding: 0.5rem 0;
  }
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
  opacity: 0;
  animation: ${fadeIn} 0.3s ease-out forwards;
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
          {label ? format(new Date(parseInt(label)), 'MMM d, yyyy h:mm a') : ''}
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

const calculateDomain = (data: ChartDataPoint[]) => {
  if (!data.length) return ['auto', 'auto'];
  const prices = data.map(d => d.price);
  const min = Math.min(...prices);
  const max = Math.max(...prices);
  const padding = (max - min) * 0.1; // Add 10% padding
  return [min - padding, max + padding];
};

const getTickCount = (timeframe: Timeframe, isMobile: boolean): number => {
  return isMobile ? 6 : 8;
};

export const PriceChart = () => {
  const [loading, setLoading] = useState(true);
  const [chartData, setChartData] = useState<ChartDataPoint[]>([]);
  const [timeframe, setTimeframe] = useState<Timeframe>('7D');
  const [error, setError] = useState<string | null>(null);
  const [displayTicks, setDisplayTicks] = useState<number[]>([]);

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

      const displayTicks = formattedData.filter((_, index) => {
        const totalPoints = formattedData.length;
        const tickCount = getTickCount(selectedTimeframe, window.innerWidth <= 480);
        const interval = Math.floor(totalPoints / (tickCount - 1));
        return index === 0 || index === totalPoints - 1 || index % interval === 0;
      });

      setDisplayTicks(displayTicks.map(d => d.timestamp));
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
        <ResponsiveContainer width="100%" height={window.innerWidth <= 480 ? 200 : 300}>
          <LineChart 
            data={chartData} 
            margin={{ 
              top: 10, 
              right: window.innerWidth <= 480 ? 15 : 25, 
              left: window.innerWidth <= 480 ? 0 : 0, 
              bottom: window.innerWidth <= 480 ? 10 : 5 
            }}
          >
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke="rgba(255,255,255,0.1)" 
              vertical={false}
            />
            <XAxis
              dataKey="timestamp"
              tickFormatter={(timestamp) => {
                const date = new Date(timestamp);
                if (timeframe === '24H') {
                  return format(date, 'h:mm a');
                } else if (timeframe === '7D') {
                  return format(date, 'MMM d');
                } else {
                  return format(date, 'MMM d');
                }
              }}
              ticks={displayTicks}
              tick={{ 
                fill: '#fff', 
                fontSize: window.innerWidth <= 480 ? 10 : 12,
                dy: window.innerWidth <= 480 ? 5 : 0
              }}
              height={window.innerWidth <= 480 ? 40 : 30}
              axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
              tickLine={{ stroke: 'rgba(255,255,255,0.1)' }}
            />
            <YAxis 
              domain={calculateDomain(chartData)}
              tick={{ 
                fill: '#fff', 
                fontSize: window.innerWidth <= 480 ? 10 : 12 
              }}
              tickFormatter={(value) => {
                return `$${Number(value).toFixed(4)}`
              }}
              width={window.innerWidth <= 480 ? 60 : 70}
              tickCount={5}
              allowDecimals={true}
              scale="linear"
              axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
              tickLine={{ stroke: 'rgba(255,255,255,0.1)' }}
            />
            <Tooltip 
              content={<CustomTooltip />}
              animationDuration={200}
            />
            <Line
              type="monotone"
              dataKey="price"
              stroke="#FBFF3A"
              strokeWidth={2}
              dot={false}
              activeDot={{ 
                r: 6, 
                fill: "#FBFF3A",
                stroke: "rgba(251, 255, 58, 0.3)",
                strokeWidth: 4
              }}
              animationDuration={1500}
              animationBegin={300}
              animationEasing="ease-out"
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </ChartContainer>
  );
};
