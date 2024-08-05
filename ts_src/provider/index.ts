import type { Address, SignedTxHex, SignedPsbtBase64 } from "../types";
import type {
  CreateTxPayload,
  SignPsbtOptions,
  InscribedTransferResult,
  MultiSignPsbtOptions,
} from "./types";

export type NetworkType = "mainnet" | "testnet";

export interface INintondoProvider {
  /**
   * To connect to the Nintondo provider.
   *
   * @returns The address of the connected account.
   */
  connect(): Promise<Address>;
  /**
   * To disconnect from the Nintondo provider.
   *
   * @returns The balance of the connected account.
   */
  getBalance(): Promise<number>;
  /**
   * To get the current account name from the Nintondo provider.
   *
   * @returns The name of the connected account.
   */
  getAccountName(): Promise<string>;
  /**
   * To get the connection state from the Nintondo provider.
   *
   * @returns The connection state.
   */
  isConnected(): Promise<boolean>;
  /**
   * To get the current account from the Nintondo provider.
   *
   * @returns The address of the connected account.
   */
  getAccount(): Promise<Address>;
  /**
   * To get the public key of the connected account from the Nintondo provider.
   *
   * @returns The public key of the connected account.
   */
  getPublicKey(): Promise<string>;
  /**
   * To get the version of the Nintondo provider.
   *
   * @returns The version of the Nintondo provider in the format x.x.x
   */
  getVersion(): Promise<string>;

  /**
   * To create a transaction.
   *
   * @param payload - The payload to create a transaction.
   *
   * @returns The signed transaction hex.
   */
  createTx(payload: CreateTxPayload): Promise<SignedTxHex>;

  /**
   * To sign a message.
   *
   * @param message - The message to sign.
   *
   * @returns The signed message.
   */
  signMessage(message: string): Promise<string>;

  /**
   * To calculate the fee of a transaction.
   *
   * @param psbtHex - The PSBT base64 string.
   * @param feeRate - The fee rate.
   *
   * @returns The fee of the transaction.
   */
  calculateFee(psbtHex: SignedPsbtBase64, feeRate: number): Promise<number>;

  /**
   * To sign a PSBT.
   *
   * @param psbtBase64 - The PSBT base64 string.
   * @param options - The options to sign the PSBT.
   *
   * @returns The signed PSBT base64 string.
   */
  signPsbt(
    psbtBase64: string,
    options?: SignPsbtOptions
  ): Promise<SignedPsbtBase64>;

  /**
   * To inscribe a transfer.
   *
   * @param tokenName - The token name to inscribe the transfer.
   *
   * @returns The inscribed transfer result.
   */
  inscribeTransfer(tokenName: string): Promise<InscribedTransferResult>;

  /**
   * To sign multiple PSBT's.
   *
   * @param payload - The array of PSBS's to sign.
   *
   * @returns The signed PSBT base64 string.
   */
  multiPsbtSign(payload: MultiSignPsbtOptions[]): Promise<SignedPsbtBase64[]>;

  /**
   * To get the currently selected network of the Nintondo wallet.
   *
   * @returns The Network from belcoinjs-lib
   */
  getNetwork(): Promise<NetworkType>;

  /**
   * To switch the network of the Nintondo wallet.
   *
   * @param network - The network to switch to.
   */
  switchNetwork(network: NetworkType): Promise<NetworkType>;

  /**
   * Adds the listener function to the end of the listeners array for the event named eventName. 
   * No checks are made to see if the listener has already been added. 
   * Multiple calls passing the same combination of eventName and listener 
   * will result in the listener being added, and called, multiple times.
   *
   * @param event - The name of the event.
   * @param listener - The callback function.
   *
   * @returns This instance of the NintondoProvider.
    */
  on<T extends keyof Events, D extends Events[T]>(event: T, listener: D): this;

  /**
   * Removes the specified listener from the listener array for the event named eventName.
   *
   * @param event - The name of the event.
   * @param listener - The callback function.
   *
   * @returns This instance of the NintondoProvider.
   */
  removeListener<T extends keyof Events, D extends Events[T]>(event: T, listener: D): this;

  /**
   * Removes all listeners, or those of the specified eventName.
   * Note that it is bad practice to remove listeners added elsewhere in the code, particularly 
   * when the NintondoProvider instance was created by some other component or module (e.g. sockets or file streams).
   *
   * @param event - The name of the event.
   *
   * @returns a reference to the NintondoProvider, so that calls can be chained.
  */
  removeAllListeners<T extends keyof Events>(event: T): void;
}

type Events = {
  accountsChanged: () => void;
  networkChanged: (network: NetworkType) => void;
};
