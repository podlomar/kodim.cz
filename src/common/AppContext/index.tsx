import md5 from 'blueimp-md5';
import { createContext, useContext, useMemo } from 'react';
import type { KodimCms } from 'kodim-cms';
import type { AccessCheck } from 'kodim-cms/esm/content/access-check.js';
import { User } from '../../server/db.js';

export interface Store {
  dataEntries: Record<string, any>,
  user: User | null,
}

function storeData<T>(store: Store, keys: string[], data: T) {
  const hash = md5(keys.join('/'));
  // eslint-disable-next-line no-param-reassign
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
  url: string,
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
  url: '/',
});

export const useAppContext = () => useContext(appContext);

export function useData<T>(
  keys: string[],
  fetcher: (serverContext: ServerAppContext) => Promise<T>,
): T {
  const context = useAppContext();

  const data = context.retrieveData(keys);

  if (data === null) {
    if (context.env === 'client') {
      throw Error('bad server data');
    } else {
      // eslint-disable-next-line @typescript-eslint/no-throw-literal
      throw fetcher(context).then(
        (resource) => context.storeData(keys, resource),
      );
    }
  }

  return data as T;
}

interface ClientProviderProps {
  children: React.ReactNode;
}

export const ClientContextProvider = ({ children }: ClientProviderProps) => {
  // @ts-ignore
  // eslint-disable-next-line no-underscore-dangle
  const store = window.__STORE__ as Store;

  const value = useMemo((): ClientAppContext => ({
    dataEntries: store.dataEntries,
    user: store.user,
    env: 'client',
    storeData: (keys: string[], data: any) => storeData(store, keys, data),
    retrieveData: (keys: string[]) => getData(store, keys),
    url: `${window.location.pathname}${window.location.search}`,
  }), [store]);

  return (
    <appContext.Provider value={value}>
      {children}
    </appContext.Provider>
  );
};

interface ServerProviderProps {
  cms: KodimCms,
  accessCheck: AccessCheck,
  logins: Logins,
  store: Store;
  children: React.ReactNode;
  url: string
}

export const ServerContextProvider = ({
  cms, accessCheck, store, logins, children, url,
}: ServerProviderProps) => {
  const value = useMemo((): ServerAppContext => ({
    dataEntries: store.dataEntries,
    user: store.user,
    env: 'server',
    storeData: (keys: string[], data: any) => storeData(store, keys, data),
    retrieveData: (keys: string[]) => getData(store, keys),
    cms,
    accessCheck,
    logins,
    url,
  }), [cms, accessCheck, store, logins, url]);

  return (
    <appContext.Provider value={value}>
      {children}
    </appContext.Provider>
  );
};
