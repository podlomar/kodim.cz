import md5 from 'blueimp-md5';
import { createContext, useContext } from 'react';
import { User } from '../../server/db.js';
import type { KodimCms } from 'kodim-cms';
import type { AccessCheck } from 'kodim-cms/esm/content/access-check.js';

export interface Store {
  dataEntries: Record<string, any>,
  user: User | null,
};

function storeData<T>(store: Store, keys: string[], data: T) {
  const hash = md5(keys.join('/'));
  store.dataEntries[hash] = data;
}

function getData<T>(store: Store, keys: string[]): T | null {
  const hash = md5(keys.join('/'));
  return store.dataEntries[hash] ?? null;
}

export interface Logins {
  githubClientId: string;
}

export interface BaseAppContext {
  dataEntries: Record<string, any>,
  user: User | null,
  storeData: (keys: string[], data: any) => void,
  retrieveData: (keys: string[]) => any,
}

export interface ServerAppContext extends BaseAppContext {
  env: 'server',
  cms: KodimCms,
  accessCheck: AccessCheck,
  logins: Logins,
}

export interface ClientAppContext extends BaseAppContext {
  env: 'client',
}

type AppContext = ServerAppContext | ClientAppContext;

const appContext = createContext<AppContext>({
  env: 'client',
  dataEntries: {},
  user: null,
  storeData: () => { },
  retrieveData: () => { },
});

export const useAppContext = () => useContext(appContext);

export function useData<T>(
  keys: string[],
  fetcher: (serverContext: ServerAppContext) => Promise<T>
): T {
  const appContext = useAppContext();

  const data = appContext.retrieveData(keys);

  if (data === null) {
    if (appContext.env === 'client') {
      throw Error('bad server data');
    } else {
      throw fetcher(appContext).then(
        (resource) => appContext.storeData(keys, resource)
      );
    }
  }

  return data as T;
}

interface ClientProviderProps {
  children: React.ReactNode;
}

export const ClientContextProvider = ({ children }: ClientProviderProps) => {
  //@ts-ignore
  const store = window.__STORE__ as Store;

  return (
    <appContext.Provider value={{
      dataEntries: store.dataEntries,
      user: store.user,
      env: 'client',
      storeData: (keys: string[], data: any) => storeData(store, keys, data),
      retrieveData: (keys: string[]) => getData(store, keys),
    }}>
      {children}
    </appContext.Provider>
  );
}

interface ServerProviderProps {
  cms: KodimCms,
  accessCheck: AccessCheck,
  logins: Logins,
  store: Store;
  children: React.ReactNode;
}

export const ServerContextProvider = (
  { cms, accessCheck, store, logins, children }: ServerProviderProps
) => (
  <appContext.Provider value={{
    dataEntries: store.dataEntries,
    user: store.user,
    env: 'server',
    storeData: (keys: string[], data: any) => storeData(store, keys, data),
    retrieveData: (keys: string[]) => getData(store, keys),
    cms,
    accessCheck,
    logins,
  }}>
    {children}
  </appContext.Provider>
);