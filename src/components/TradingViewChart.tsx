import React, { useEffect, useRef, memo, useState } from 'react';
import styled from 'styled-components';

const TradingViewContainer = styled.div`
  height: 100%;
  width: 100%;
  background: rgba(0, 0, 0, 0.2);
  border-radius: inherit;
  overflow: hidden;
  position: relative;

  .tradingview-widget-container {
    height: 100%;
    opacity: 0;
    transition: opacity 0.3s ease-in-out;
    
    &.loaded {
      opacity: 1;
    }
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

function TradingViewChart({ onLoadingChange }: { onLoadingChange?: (loading: boolean) => void }) {
  const container = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!container.current) return;
    
    onLoadingChange?.(true);

    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
    script.type = "text/javascript";
    script.async = true;
    
    // Add onload handler to detect when TradingView is ready
    script.onload = () => {
      setTimeout(() => {
        setIsLoaded(true);
        onLoadingChange?.(false);
        if (container.current) {
          const widgetContainer = container.current.querySelector('.tradingview-widget-container');
          widgetContainer?.classList.add('loaded');
        }
      }, 1000); // Give TradingView a second to render
    };

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
  }, [onLoadingChange]);

  return (
    <TradingViewContainer>
      <div className={`tradingview-widget-container${isLoaded ? ' loaded' : ''}`} ref={container}>
        <div className="tradingview-widget-container__widget"></div>
      </div>
    </TradingViewContainer>
  );
}

export default memo(TradingViewChart);