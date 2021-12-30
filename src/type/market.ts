export default interface History {
  prices: Prices;
  market_caps: [];
  total_volumes: [];
}

export interface Prices {
  Moments: Moment[];
}

export interface Moment {
  value: number;
  time: number;
}

export interface Market_caps {
  trade_volumes: Trade_volume[];
}

export interface Trade_volume {
  time: number;
  volume: number;
}
