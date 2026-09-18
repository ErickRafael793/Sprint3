import { createContext, useContext, type PropsWithChildren } from "react";
import { dependencies, type Dependencies } from "./dependencies";

const DependenciesContext = createContext<Dependencies>(dependencies);

export function DependenciesProvider({ children }: PropsWithChildren) {
  return (
    <DependenciesContext.Provider value={dependencies}>
      {children}
    </DependenciesContext.Provider>
  );
}

export const useDependencies = () => useContext(DependenciesContext);
