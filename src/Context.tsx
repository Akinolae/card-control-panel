import React from "react";
import type { PropsWithChildren } from "react";
import intState, { InitialState } from "./services/appstore/initialState";

interface SetStateProp {
  key: string;
  value: unknown;
}

type ContextProps = PropsWithChildren<{
  title?: string;
}>;

export const AppContext = React.createContext<
  [InitialState, (prop: SetStateProp) => void] | undefined
>(undefined);
function Context({ children }: ContextProps) {
  const [state, setState] = React.useState<InitialState>(intState);

  console.log(state, "state");
  
  const setStateValue = (prop: SetStateProp): void => {
    const { key, value } = prop;

    console.log(key, value, "keyvalue");

    setState((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  return (
    <AppContext.Provider value={[state, setStateValue]}>
      {children}
    </AppContext.Provider>
  );
}

export default Context;
