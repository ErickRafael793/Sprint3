import { AlertTriangle, ShoppingCart } from "lucide-react";
import { Navigate, useLocation } from "react-router-dom";
import { APP_CONFIG } from "@/core/appConfig";
import { useAuth } from "@/presentation/context/AuthContext";
import { useLoginViewModel } from "@/presentation/viewmodel/useLoginViewModel";

export function LoginView() {
  const { session } = useAuth();
  const location = useLocation();
  const vm = useLoginViewModel();

  if (session) return <Navigate to={APP_CONFIG.routes.catalog} replace />;

  const logoutSuccess = new URLSearchParams(location.search).get("logout") === "success";

  return (
    <main className="auth-page">
      <form className="auth-card" onSubmit={(event) => { event.preventDefault(); void vm.submit(); }}>
        <div className="logo"><ShoppingCart /></div>
        <h1>{APP_CONFIG.appName}</h1>
        <p>Inicia sesión para continuar</p>

        {logoutSuccess && <div className="notice success">Sesión cerrada correctamente.</div>}
        {vm.error && <div className="notice error"><AlertTriangle size={18} />{vm.error}</div>}

        <label>
          Usuario
          <input value={vm.username} onChange={(event) => vm.setUsername(event.target.value)} placeholder="Tu usuario" autoComplete="username" />
        </label>

        <label>
          Contraseña
          <input type="password" value={vm.password} onChange={(event) => vm.setPassword(event.target.value)} placeholder="••••••••" autoComplete="current-password" />
        </label>

        <button className="primary-button" disabled={vm.loading}>
          {vm.loading ? "Iniciando..." : "Iniciar sesión"}
        </button>
        <small>Autenticación mediante Fake Store API</small>
      </form>
    </main>
  );
}
