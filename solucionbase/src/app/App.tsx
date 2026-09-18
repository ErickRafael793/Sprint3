import { BrowserRouter } from "react-router-dom";
import { DependenciesProvider } from "@/app/DependenciesProvider";
import { AuthProvider } from "@/presentation/context/AuthContext";
import { AppRouter } from "./AppRouter";

export function App() {
  return (
    <DependenciesProvider>
      <AuthProvider>
        <BrowserRouter>
          <AppRouter />
        </BrowserRouter>
      </AuthProvider>
    </DependenciesProvider>
  );
}
