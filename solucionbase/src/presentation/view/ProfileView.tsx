import { LogOut } from "lucide-react";
import { useLogoutViewModel } from "@/presentation/viewmodel/useLogoutViewModel";

export function ProfileView() {
  const vm = useLogoutViewModel();

  return (
    <section className="profile-page">
      <div className="page-header"><div><span className="eyebrow">Cuenta</span><h1>Perfil</h1></div></div>
      <button className="logout-button" onClick={vm.requestLogout}><LogOut /> Cerrar sesión</button>

      {vm.confirming && (
        <div className="modal-backdrop" role="dialog" aria-modal="true">
          <div className="modal">
            <span className="modal-icon"><LogOut /></span>
            <h2>¿Cerrar sesión?</h2>
            <p>Se eliminarán tus credenciales y el carrito de este dispositivo.</p>
            <div className="action-row"><button className="secondary-button" onClick={vm.cancelLogout}>Cancelar</button><button className="danger-button filled" onClick={vm.logout}>Cerrar sesión</button></div>
          </div>
        </div>
      )}
    </section>
  );
}
