import type { Address, ApiUTXO, PsbtBase64 } from "../types";

export interface CreateTxPayload {
  to: Address;
  amount: number;
  receiverToPayFee: boolean;
  feeRate: number;
  utxos: ApiUTXO[];
}

interface BaseUserToSignInput {
  index: number;
  sighashTypes: number[] | undefined;
  disableTweakSigner?: boolean;
}

export interface AddressUserToSignInput extends BaseUserToSignInput {
  address: Address;
}

export interface PublicKeyUserToSignInput extends BaseUserToSignInput {
  publicKey: string;
}

export type UserToSignInput = AddressUserToSignInput | PublicKeyUserToSignInput;

export interface SignPsbtOptions {
  autoFinalized: boolean;
  toSignInputs?: UserToSignInput[];
}

export interface InscribedTransferResult {
  mintedAmount: number;
}

export interface MultiSignPsbtOptions {
  psbtBase64: PsbtBase64;
  options: SignPsbtOptions;
}
