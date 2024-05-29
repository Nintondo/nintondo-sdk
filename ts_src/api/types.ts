export interface UtxoQueryParams {
  hex?: boolean;
  amount?: number;
}

export interface PushTxResponse {
  txid: string;
}

export interface AccountStatsResponse {
  amount: number;
  count: number;
  balance: number;
}

export interface GetFeesResponse {
  fast: number;
  slow: number;
}
