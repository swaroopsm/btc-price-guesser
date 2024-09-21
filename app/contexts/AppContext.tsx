import { createContext, useContext } from "react"

export interface AppContext {
  locale: string,
}

export const AppContext = createContext({
  locale: 'en'
});

interface Props extends AppContext {
  children: React.ReactNode;
}

export const AppProvider = ({ children, ...value }: Props) => {
  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  )
}

export const useAppContext = () => useContext(AppContext);
