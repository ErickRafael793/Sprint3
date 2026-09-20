# Nuvora React MVVM

Base de una aplicación de compras preparada para trabajo en equipo. Implementa las historias de login y cierre de sesión, y utiliza repositorios mock para representar las pantallas que desarrollarán los demás integrantes.

## Ejecutar el proyecto

```bash
npm install
```

Copia `.env.example` como `.env` y ejecuta:

```bash
npm run dev
```

Para comprobar que TypeScript y Vite compilan correctamente:

```bash
npm run build
```

## Estructura

```text
src/
├── app/                         # Arranque, rutas e inyección de dependencias
├── application/                 # Casos de uso y servicios de aplicación
├── core/                        # Configuración y errores compartidos
├── domain/
│   ├── models/                  # Modelos separados por dominio
│   └── repository/              # Contratos de los repositorios
├── infrastructure/
│   ├── http/                    # Cliente HTTP reutilizable
│   └── repository/              # Implementaciones reales, locales y mock
├── mocks/                       # Datos temporales para las historias pendientes
└── presentation/
    ├── components/              # Elementos visuales reutilizables
    ├── context/                 # Estado de autenticación
    ├── view/                    # Pantallas completas
    ├── viewmodel/               # Estado y acciones de cada pantalla
    └── styles/                  # Estilos compartidos
```

## Dónde está MVVM

- Model: `src/domain/models`.
- View: `src/presentation/view` y `src/presentation/components`.
- ViewModel: `src/presentation/viewmodel`.
- Repository: contratos en `src/domain/repository` e implementaciones en `src/infrastructure/repository`.

Una View no ejecuta `fetch`, no lee `localStorage` y no contiene reglas de negocio. La View llama al ViewModel; el ViewModel usa servicios o repositorios inyectados.

## Organización del equipo

Cada historia debe tocar principalmente su propio dominio:

| Área | Modelos | Repository | ViewModel | View |
| --- | --- | --- | --- | --- |
| Login y logout | `auth.models.ts` | `AuthRepository` y `SessionRepository` | `useLoginViewModel` y `useLogoutViewModel` | `LoginView` y `ProfileView` |
| Productos | `product.models.ts` | `ProductRepository` | `useCatalogViewModel` y `useProductDetailViewModel` | `CatalogView` y `ProductDetailView` |
| Carrito | `cart.models.ts` | `CartRepository` | `useCartViewModel` | `CartView` |
| Usuarios | `user.models.ts` | `UserRepository` | `useUsersViewModel` | `UsersView` |
| Auditoría | `audit.models.ts` | `AuditRepository` | `useAuditViewModel` | `AuditView` |

Esto evita que todos modifiquen un único `models.ts` y reduce conflictos entre ramas.

## Decisiones aplicadas

- La URL de la API existe únicamente en `.env` y `appConfig.ts`.
- Las rutas, claves de almacenamiento y nombre Nuvora están centralizados en `appConfig.ts`.
- La selección de implementaciones se encuentra únicamente en `app/dependencies.ts`.
- Se usan interfaces pequeñas para permitir sustituir Fake Store API o el almacenamiento.
- Se usan funciones simples cuando una clase no aporta estado o comportamiento reutilizable.
- Se utilizan guard clauses y fail fast antes de peticiones HTTP.
- El mapeo de roles está centralizado: IDs 1 y 2 son administradores, ID 3 es auditor y los demás son clientes.
- El logout elimina la sesión y el carrito, actualiza el contexto y navega con `replace` al login.
- Las rutas protegidas impiden regresar al contenido después de cerrar sesión.
- La vista Perfil contiene únicamente el botón Cerrar sesión y su confirmación.

## SOLID sin código innecesario

- Responsabilidad única: cada View presenta información, cada ViewModel coordina estado y cada Repository obtiene o guarda datos.
- Abierto y cerrado: una implementación mock puede sustituirse por una implementación real registrándola en `dependencies.ts`.
- Sustitución de Liskov: cualquier clase que cumpla un contrato de Repository puede utilizarse sin cambiar las Views.
- Segregación de interfaces: existen contratos separados para autenticación, productos, usuarios, carrito y auditoría.
- Inversión de dependencias: `AuthService` depende de interfaces del dominio, no de `fetch`, Fake Store API ni `localStorage`.

Se usan interfaces en lugar de clases abstractas porque las implementaciones no necesitan heredar código compartido. Una clase abstracta solo sería conveniente si varios repositorios compartieran comportamiento real, no únicamente nombres de métodos.

## Guard clauses e if frente a switch

El login valida primero los campos y la conexión. Si una condición no se cumple, termina antes de llamar a la API. Esta práctica se conoce como guard clauses o fail fast y evita trabajo innecesario y anidamientos difíciles de leer.

No se reemplazan todos los `if` por `switch`. Los `if` se utilizan para validaciones independientes y salidas tempranas. Para el mapeo fijo de roles se usa una tabla `Record`, que resulta más compacta que repetir condiciones. Un `switch` debe reservarse para seleccionar entre varias operaciones excluyentes cuando realmente mejore la lectura.

## Imports

El alias `@` representa la carpeta `src`, por lo que se evitan rutas como `../../../`. Los archivos `index.ts` de modelos y repositorios funcionan como puntos de exportación por módulo; no existe un archivo global que importe todo, ya que eso aumentaría el acoplamiento.

## Reglas para conservar la arquitectura

- No escribir URLs dentro de Views o ViewModels.
- No usar `fetch` directamente en una View.
- No acceder a `localStorage` directamente desde una View.
- No repetir el mapeo de roles.
- No poner validaciones de negocio dentro del JSX.
- Crear primero el contrato del repositorio y después su implementación.
- Registrar una nueva implementación en `app/dependencies.ts`.

## Almacenamiento

Esta versión web utiliza `localStorage` para demostrar persistencia y limpieza. En producción, el token debería manejarse con una cookie segura HttpOnly o con almacenamiento seguro nativo si el proyecto migra a React Native o Capacitor.
