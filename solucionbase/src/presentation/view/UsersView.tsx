import { AlertTriangle, Users } from "lucide-react";
import { useUsersViewModel } from "@/presentation/viewmodel/useUsersViewModel";

const getInitials = (firstname: string, lastname: string, username: string) => {
  const initials = `${firstname?.[0] ?? ""}${lastname?.[0] ?? ""}`.trim();
  return (initials || username.slice(0, 2)).toUpperCase();
};

export function UsersView() {
  const vm = useUsersViewModel();

  return (
    <section>
      <div className="page-header">
        <div>
          <span className="eyebrow">Administración</span>
          <h1>Usuarios registrados</h1>
        </div>
      </div>

      {vm.loading && (
        <div className="loading" role="status" aria-live="polite">
          Cargando usuarios...
        </div>
      )}

      {!vm.loading && vm.error && (
        <div className="empty-state" role="alert">
          <AlertTriangle />
          <strong>{vm.error}</strong>
          <button className="primary-button" onClick={vm.retry}>Reintentar</button>
        </div>
      )}

      {!vm.loading && !vm.error && vm.users.length === 0 && (
        <div className="empty-state">
          <Users />
          <strong>No hay usuarios disponibles</strong>
        </div>
      )}

      {!vm.loading && !vm.error && vm.users.length > 0 && (
        <div className="user-list">
          {vm.users.map((user) => (
            <article key={user.id}>
              <span className="avatar">
                {getInitials(user.name.firstname, user.name.lastname, user.username)}
              </span>
              <div>
                <strong>{user.name.firstname} {user.name.lastname}</strong>
                <span>{user.email}</span>
                <small>@{user.username}{user.phone ? ` · ${user.phone}` : ""}</small>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}