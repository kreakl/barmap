import React, { createContext, use } from 'react';

export const contextProviderFactory = <T extends object>(displayName: string) => {
  const Ctx = createContext<T>(
    new Proxy({} as T, {
      get: () => {
        throw new Error('Could not use context outside of provider');
      },
    }),
  );

  const Provider: React.FC<React.PropsWithChildren<{ value: T }>> = ({
    children,
    value,
  }) => <Ctx.Provider value={value}>{children}</Ctx.Provider>;

  Provider.displayName = displayName;

  const useContext = () => use(Ctx);

  return { Provider, useContext };
};
