"use client";

import * as React from "react";
import { INintondo, initNintondo } from "./index";

interface NintondoContextProps {
  nintondo?: INintondo;
  isConnected: boolean;
}

const NintondoContext = React.createContext<NintondoContextProps>({
  nintondo: undefined,
  isConnected: false,
});

const getTimeout = () => new Promise((resolve) => setTimeout(resolve, 100));

interface NintondoProviderProps {
  children: React.ReactNode;
}

export const NintondoProvider: React.FC<NintondoProviderProps> = ({
  children,
}) => {
  const [nintondo, setNintondo] = React.useState<INintondo>();
  const [isConnected, setIsConnected] = React.useState<boolean>(false);

  React.useEffect(() => {
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

export const useNintondo = () => React.useContext(NintondoContext);
