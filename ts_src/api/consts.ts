import type { Address } from "../types";

export const API_URL = "https://electrs.nintondo.io";

export const GET_ADDRESS_UTXOS = (address: Address) =>
  `/address/${address}/utxos`;
export const GET_ADDRESS_STATS = (address: Address) =>
  `/address/${address}/stats`;
export const GET_FEES_URL = "/fee-estimates";
export const POST_PUSH_TX_URL = "/tx";
export const GET_LAST_PRICE_URL = "/last-price";
export const GET_LAST_BLOCK_URL = "/blocks/tip/height";
