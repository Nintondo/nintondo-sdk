import type { Address } from "../types";

export const API_URL = "https://api.nintondo.io/api";

export const API_URLS = {
  feeEstimates: "/fee-estimates",
  lastPrice: "/last-price",
  lastBlock: "/blocks/tip/height",
  pushTx: "/tx",
  utxo: (address: Address) => `/address/${address}/utxo`,
  stats: (address: Address) => `/address/${address}/stats`,
};
