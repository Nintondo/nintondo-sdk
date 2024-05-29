export interface TxStatus {
  confirmed: boolean;
  block_height: number;
  block_hash: string;
  block_time: number;
}

export interface ApiUTXO {
  txid: string;
  vout: number;
  status: TxStatus;
  value: number;
  rawHex?: string;
}

export type Address = string;
export type SignedTxHex = string;
export type PsbtBase64 = string;
export type SignedPsbtBase64 = string;
