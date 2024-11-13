export interface TokenPrice {
  id: string;
  symbol: string;
  current_price: number;
}

export interface PriceData {
  [key: string]: TokenPrice;
}
