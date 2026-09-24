import { Navigate, Route, Routes } from "react-router-dom";
import { APP_CONFIG } from "@/core/appConfig";
import { AppLayout } from "@/presentation/components/AppLayout";
import { ProtectedRoute } from "@/presentation/components/ProtectedRoute";
import { RoleRoute } from "@/presentation/components/RoleRoute";
import { AuditView } from "@/presentation/view/AuditView";
import { CartView } from "@/presentation/view/CartView";
import { CatalogView } from "@/presentation/view/CatalogView";
import { CreateProductView } from "@/presentation/view/CreateProductView";
import { LoginView } from "@/presentation/view/LoginView";
import { ProductDetailView } from "@/presentation/view/ProductDetailView";
import { ProfileView } from "@/presentation/view/ProfileView";
import { UsersView } from "@/presentation/view/UsersView";

export function AppRouter() {
  return (
    <Routes>
      <Route path={APP_CONFIG.routes.login} element={<LoginView />} />

      <Route element={<ProtectedRoute />}>
        <Route element={<AppLayout />}>
          <Route path={APP_CONFIG.routes.catalog} element={<CatalogView />} />
          <Route path="/products/:id" element={<ProductDetailView />} />
          <Route element={<RoleRoute allowed={["ADMIN"]} />}>
            <Route path={APP_CONFIG.routes.newProduct} element={<CreateProductView />} />
          </Route>
          <Route path={APP_CONFIG.routes.profile} element={<ProfileView />} />

          <Route element={<RoleRoute allowed={["CLIENT"]} />}>
            <Route path={APP_CONFIG.routes.cart} element={<CartView />} />
          </Route>

          <Route element={<RoleRoute allowed={["ADMIN", "AUDITOR"]} />}>
            <Route path={APP_CONFIG.routes.users} element={<UsersView />} />
          </Route>

          <Route element={<RoleRoute allowed={["AUDITOR"]} />}>
            <Route path={APP_CONFIG.routes.audit} element={<AuditView />} />
          </Route>
        </Route>
      </Route>

      <Route path="*" element={<Navigate to={APP_CONFIG.routes.catalog} replace />} />
    </Routes>
  );
}