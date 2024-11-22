<div align="center">
  <img src="src/assets/dbr-animation.svg" alt="deBridge Logo" width="120" />
  <h1>deBridge Airdrop Countdown</h1>
  <p>A sleek countdown timer and price tracker for the deBridge Foundation's second distribution</p>
</div>

## ✨ Features

- 🕒 Real-time countdown to the second distribution
- 📊 Interactive price chart with multiple timeframes (24H, 7D, 30D)
- 💱 Dynamic token selection (DBR/SOL/BTC) with live price tracking
- 📈 TradingView integration for CAD/USD forex rates
- 🌐 Multi-currency support (USD/CAD)
- 🔄 Auto-refreshing data with real-time updates
- 💫 Smooth animations and transitions
- 🌙 Dark mode design
- 📱 Fully responsive layout for all devices
- 🖼️ Token logos dynamically fetched from CoinGecko

## 🛠️ Tech Stack

- React 18 + TypeScript
- Vite for blazing fast builds
- Styled Components for dynamic styling
- Recharts for crypto price charts
- TradingView Widget for forex rates
- Axios for API calls
- CoinGecko API for crypto data
- date-fns for date formatting

## 🎯 Core Components

- `CountdownTimer`: Displays time remaining until distribution
- `ValueDisplay`: Shows DBR value in USD/CAD and SOL
- `LivePrices`: Real-time price tracker for DBR, SOL, and BTC
- `PriceChart`: Interactive price chart with multiple features
  - Dynamic token selection (DBR/SOL/BTC)
  - TradingView CAD/USD forex chart
  - Responsive design
  - Custom tooltips and formatting
  - Token-specific color themes
  - Adaptive tick counts
- `CurrencyToggle`: Currency switcher with flag icons

## 🔄 API Integration

- CoinGecko API v3
  - Real-time price data
  - Historical price charts
  - Token metadata and logos
  - Multi-currency support (USD/CAD)
- TradingView Charts Widget
  - Real-time CAD/USD forex rates
  - Interactive charting tools
- Auto-refresh mechanisms
  - Crypto prices: Every 60 seconds
  - Chart data: Every 5 minutes
  - Error handling and loading states

## 💻 Development

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build
```

## 🚀 Deployment

Configured for seamless deployment on Vercel with automatic builds and environment variable management.
