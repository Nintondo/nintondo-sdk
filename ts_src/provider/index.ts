import type { Address, SignedTxHex, SignedPsbtBase64 } from "../types";
import type {
  CreateTxPayload,
  SignPsbtOptions,
  InscribedTransferResult,
  MultiSignPsbtOptions,
} from "./types";

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
   * @returns The signed transaction hex.
   */
  createTx(payload: CreateTxPayload): Promise<SignedTxHex>;
  signMessage(message: string): Promise<string>;
  calculateFee(psbtHex: SignedPsbtBase64, feeRate: number): Promise<number>;
  signPsbt(
    psbtBase64: string,
    options?: SignPsbtOptions
  ): Promise<SignedPsbtBase64>;
  inscribeTransfer(tokenName: string): Promise<InscribedTransferResult>;
  multiPsbtSign(payload: MultiSignPsbtOptions[]): Promise<SignedPsbtBase64[]>;
}
