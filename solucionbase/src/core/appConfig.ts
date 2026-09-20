export const APP_CONFIG = {
  appName: "Nuvora",
  api: {
    baseUrl: (import.meta.env.VITE_API_BASE_URL ?? "https://fakestoreapi.com").replace(/\/$/, ""),
    endpoints: {
      login: "/auth/login",
      users: "/users",
      products: "/products",
      productById: (id: number) => `/products/${id}`,
      categories: "/products/categories",
      productsByCategory: (category: string) => `/products/category/${encodeURIComponent(category)}`,
    },
  },
  routes: {
    login: "/login",
    catalog: "/catalog",
    product: (id: number) => `/products/${id}`,
    cart: "/cart",
    users: "/users",
    audit: "/audit",
    profile: "/profile",
  },
  storage: {
    session: "nuvora_session",
    cart: "nuvora_cart",
  },
} as const;