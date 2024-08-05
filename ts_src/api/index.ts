import type { Address, ApiUTXO, SignedTxHex } from "../types";
import { API_URLS } from "./consts";
import type { GetFeesResponse, PushTxResponse, UtxoQueryParams } from "./types";
import { makeReq } from "./utils";

export interface INintondoApi {
  /**
   * To get the UTXOs of an address.
   *
   * @param address The address to get the UTXOs from.
   * @param params The query parameters.
   *
   * @returns The UTXOs of the address.
   */
  getUtxos(
    address: Address,
    params?: UtxoQueryParams
  ): Promise<ApiUTXO[] | undefined>;
  /**
   * To push a transaction to the network.
   *
   * @param txHex The signed transaction hex string.
   */
  pushTx(txHex: SignedTxHex): Promise<PushTxResponse | undefined>;
  /**
   * To get the current fees.
   *
   * @returns The current fees.
   */
  getFees(): Promise<GetFeesResponse | undefined>;
  /**
   * To get the account stats of an address.
   *
   * @param address The address to get the stats from.
   *
   * @returns The account stats.
   */
  getAccountStats(address: string): Promise<number | undefined>;
  /**
   * To get the current price of Bells in USD.
   *
   * @returns The current price of Bells in USD.
   */
  getBellsUSDPrice(): Promise<number | undefined>;
  /**
   * To get the last block.
   *
   * @returns The last block.
   */
  getLastBlock(): Promise<number | undefined>;
}

export class NintondoApi implements INintondoApi {
  async getUtxos(
    address: string,
    params?: UtxoQueryParams
  ): Promise<ApiUTXO[] | undefined> {
    return await makeReq({
      path: API_URLS.utxo(address),
      params: params as Record<string, string> | undefined,
    });
  }

  async pushTx(txHex: SignedTxHex): Promise<PushTxResponse | undefined> {
    const data = await makeReq<string>({
      path: API_URLS.pushTx,
      method: "POST",
      headers: {
        "Content-Type": "text/plain",
      },
      json: false,
      body: txHex,
    });

    if (!data) return undefined;

    return {
      txid: data,
    };
  }

  async getFees(): Promise<GetFeesResponse | undefined> {
    const data = await makeReq<Record<string, number>>({
      path: API_URLS.feeEstimates,
    });

    if (!data) return undefined;

    return {
      slow: Number(data["6"].toFixed(0)),
      fast: Number(data["2"].toFixed(0)) + 1,
    };
  }

  async getAccountStats(address: string): Promise<number | undefined> {
    return await makeReq({
      path: API_URLS.stats(address),
    });
  }

  async getBellsUSDPrice(): Promise<number | undefined> {
    return (
      await makeReq<{ price_usd: number }>({
        path: API_URLS.lastPrice,
      })
    )?.price_usd;
  }

  async getLastBlock(): Promise<number | undefined> {
    let data = await makeReq<string>({
      path: API_URLS.lastBlock,
    });
    if (!data) return undefined;

    return Number(data);
  }
}
