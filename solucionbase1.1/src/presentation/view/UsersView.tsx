import { useUsersViewModel } from "@/presentation/viewmodel/useUsersViewModel";

export function UsersView() {
  const { users } = useUsersViewModel();
  return (
    <section>
      <div className="page-header"><div><span className="eyebrow">Administración</span><h1>Usuarios registrados</h1></div></div>
      <div className="user-list">
        {users.map((user) => (
          <article key={user.id}>
            <span className="avatar">{user.name.firstname[0]}{user.name.lastname[0]}</span>
            <div><strong>{user.name.firstname} {user.name.lastname}</strong><span>{user.email}</span><small>@{user.username} · {user.phone}</small></div>
          </article>
        ))}
      </div>
    </section>
  );
}
