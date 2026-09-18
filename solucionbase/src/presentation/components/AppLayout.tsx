import { ClipboardList, Home, ShoppingCart, UserRound, Users } from "lucide-react";
import { NavLink, Outlet } from "react-router-dom";
import { APP_CONFIG } from "@/core/appConfig";
import { useAuth } from "@/presentation/context/AuthContext";

export function AppLayout() {
  const { session } = useAuth();
  if (!session) return null;

  const links = [
    { to: APP_CONFIG.routes.catalog, label: "Inicio", icon: Home, show: true },
    { to: APP_CONFIG.routes.cart, label: "Carrito", icon: ShoppingCart, show: session.role === "CLIENT" },
    { to: APP_CONFIG.routes.users, label: "Usuarios", icon: Users, show: session.role !== "CLIENT" },
    { to: APP_CONFIG.routes.audit, label: "Auditoría", icon: ClipboardList, show: session.role === "AUDITOR" },
    { to: APP_CONFIG.routes.profile, label: "Perfil", icon: UserRound, show: true },
  ].filter((link) => link.show);

  return (
    <div className="app-shell">
      <header className="desktop-header">
        <NavLink to={APP_CONFIG.routes.catalog} className="brand">
          <span className="brand-icon"><ShoppingCart size={20} /></span>
          {APP_CONFIG.appName}
        </NavLink>
        <span className="session-label">{session.user.username} · {session.role}</span>
      </header>

      <main className="page-container"><Outlet /></main>

      <nav className="bottom-nav" aria-label="Navegación principal">
        {links.map(({ to, label, icon: Icon }) => (
          <NavLink key={to} to={to} className={({ isActive }) => isActive ? "active" : ""}>
            <Icon size={20} />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
