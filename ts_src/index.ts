import { NintondoApi } from "./api";
import type { INintondoApi } from "./api";
import type { INintondoProvider } from "./provider";
import { NintondoUtils } from "./utils";
import type { INintondoUtilities } from "./utils";

declare global {
  interface Window {
    nintondo: INintondoProvider;
  }
}

export interface INintondo {
  /**
   * The utilities object for the Nintondo Provider SDK.
   */
  utilities: INintondoUtilities;
  /**
   * The instance of the Nintondo API.
   */
  api: INintondoApi;
  /**
   * The Nintondo provider.
   */
  provider: INintondoProvider;
}

/**
 * The Nintondo SDK. Implements `INintondo` interface.
 */
class Nintondo implements INintondo {
  utilities: INintondoUtilities;
  api: INintondoApi;
  provider: INintondoProvider;

  constructor(nintondoProvider: INintondoProvider) {
    this.utilities = new NintondoUtils();
    this.api = new NintondoApi();
    this.provider = nintondoProvider;
  }
}

/**
 * Initializes the Nintondo provider.
 *
 * @returns Returns undefined if the Nintondo provider is not available.
 */
export const initNintondo = (): Nintondo | undefined => {
  if (!window.nintondo) {
    return undefined;
  }

  return new Nintondo(window.nintondo);
};
