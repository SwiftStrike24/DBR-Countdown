import React, { useEffect, useRef, memo } from 'react';
import styled from 'styled-components';

const TradingViewContainer = styled.div`
  height: 100%;
  width: 100%;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 12px;
  overflow: hidden;

  .tradingview-widget-container {
    height: 100%;
  }

  .tradingview-widget-container__widget {
    height: calc(100% - 32px);
    width: 100%;
  }

  .tradingview-widget-copyright {
    font-size: 0.7rem;
    padding: 4px 8px;
    opacity: 0.7;
    
    a {
      color: #888;
      text-decoration: none;
      
      &:hover {
        color: #FBFF3A;
      }
    }
  }
`;

function TradingViewChart() {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!container.current) return;

    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = JSON.stringify({
      autosize: true,
      symbol: "FX_IDC:CADUSD",
      timezone: "Etc/UTC",
      theme: "dark",
      style: "1",
      locale: "en",
      range: "YTD",
      allow_symbol_change: false,
      calendar: false,
      hide_volume: true,
      support_host: "https://www.tradingview.com",
      backgroundColor: "rgba(0, 0, 0, 0)",
      gridColor: "rgba(255, 255, 255, 0.1)",
      hide_top_toolbar: true,
      hide_side_toolbar: true,
    });

    container.current.appendChild(script);

    return () => {
      if (container.current) {
        const scriptElement = container.current.querySelector('script');
        if (scriptElement) {
          container.current.removeChild(scriptElement);
        }
      }
    };
  }, []);

  return (
    <TradingViewContainer>
      <div className="tradingview-widget-container" ref={container}>
        <div className="tradingview-widget-container__widget"></div>
      </div>
    </TradingViewContainer>
  );
}

export default memo(TradingViewChart); 