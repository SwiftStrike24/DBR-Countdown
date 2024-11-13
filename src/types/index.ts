export interface TokenPrice {
  usd: number;
}

export interface PriceData {
  [key: string]: TokenPrice;
}

export type SupportedCurrency = 'USD' | 'CAD';

export interface CurrencyRate {
  [key: string]: number;
}
