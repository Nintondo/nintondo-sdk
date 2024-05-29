import { Psbt } from "belcoinjs-lib";
import type { SignedPsbtBase64, SignedTxHex } from "../types";

export interface INintondoUtilities {
  extractTxHexFromPsbt(psbtBase64: SignedPsbtBase64): SignedTxHex;
}

export class NintondoUtils implements INintondoUtilities {
  /**
   * Extracts the transaction hex from a base64-encoded Partially Signed Bitcoin Transaction (PSBT).
   *
   * @param psbtBase64 - The base64-encoded PSBT.
   * @returns The transaction hex string.
   */
  extractTxHexFromPsbt(psbtBase64: SignedPsbtBase64): SignedTxHex {
    const psbt = Psbt.fromBase64(psbtBase64);
    return psbt.extractTransaction().toHex();
  }
}
