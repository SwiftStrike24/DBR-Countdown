<div align="center">
  <img src="src/assets/dbr-animation.svg" alt="deBridge Logo" width="120" />
  <h1>deBridge Airdrop Countdown</h1>
  <p>A sleek countdown timer and price tracker for the deBridge Foundation's second distribution</p>
</div>

## ✨ Features

- 🕒 Real-time countdown to the second distribution
- 📊 Interactive price chart with multiple timeframes (24H, 7D, 30D)
- 💱 Dynamic token selection (DBR/SOL) with live price tracking
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
- Recharts for interactive charts
- Axios for API calls
- CoinGecko API for crypto data
- date-fns for date formatting

## 🎯 Core Components

- `CountdownTimer`: Displays time remaining until distribution
- `ValueDisplay`: Shows DBR value in USD/CAD and SOL
- `LivePrices`: Real-time price tracker for DBR and SOL
- `PriceChart`: Interactive price chart with multiple timeframes
  - Dynamic token selection
  - Responsive design
  - Custom tooltips and formatting
  - Adaptive tick counts
- `CurrencyToggle`: Currency switcher with flag icons

## 🔄 API Integration

- CoinGecko API v3
  - Real-time price data
  - Historical price charts
  - Token metadata and logos
  - Multi-currency support (USD/CAD)
- Auto-refresh mechanisms
  - Prices: Every 60 seconds
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
