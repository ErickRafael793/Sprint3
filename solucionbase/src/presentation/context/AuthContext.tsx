import { createContext, useContext, useMemo, useState, type PropsWithChildren } from "react";
import { useDependencies } from "@/app/DependenciesProvider";
import type { Session } from "@/domain/models";

interface AuthContextValue {
  session: Session | null;
  setSession(session: Session): void;
  clearSession(): void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: PropsWithChildren) {
  const { authService } = useDependencies();
  const [session, setSession] = useState<Session | null>(() => authService.getSession());

  const value = useMemo(
    () => ({
      session,
      setSession,
      clearSession: () => setSession(null),
    }),
    [session],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth debe utilizarse dentro de AuthProvider");
  return context;
}
