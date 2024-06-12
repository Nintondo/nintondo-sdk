"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
  FC,
} from "react";
import { INintondo, initNintondo } from "./index";

interface NintondoContextProps {
  nintondo?: INintondo;
  isConnected: boolean;
}

const NintondoContext = createContext<NintondoContextProps>({
  nintondo: undefined,
  isConnected: false,
});

const getTimeout = () => new Promise((resolve) => setTimeout(resolve, 100));

interface NintondoProviderProps {
  children: ReactNode;
}

export const NintondoProvider: FC<NintondoProviderProps> = ({ children }) => {
  const [nintondo, setNintondo] = useState<INintondo>();
  const [isConnected, setIsConnected] = useState<boolean>(false);

  useEffect(() => {
    const init = async () => {
      const nintondo_ = initNintondo();
      if (nintondo_) {
        setNintondo(nintondo_);
        let isConnected = await nintondo_.provider.isConnected();
        setIsConnected(isConnected);
      } else {
        getTimeout().then(init);
      }
    };

    init();
  }, []);

  return (
    <NintondoContext.Provider value={{ nintondo, isConnected }}>
      {children}
    </NintondoContext.Provider>
  );
};

export const useNintondo = () => useContext(NintondoContext);
