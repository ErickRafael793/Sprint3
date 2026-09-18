import type { AuditCart, Product, User } from "@/domain/models";

const image = (emoji: string, color: string) => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="640" height="480"><rect width="100%" height="100%" rx="40" fill="${color}"/><text x="50%" y="57%" text-anchor="middle" font-size="150">${emoji}</text></svg>`;
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
};

export const MOCK_PRODUCTS: Product[] = [
  { id: 1, title: "Mochila urbana antirrobo 15″", price: 49.99, category: "Electrónica", description: "Mochila resistente al agua con compartimento acolchado para laptop, puerto USB y correas ajustables.", image: image("💻", "#eee9ff"), rating: { rate: 4.3, count: 128 } },
  { id: 2, title: "Camisa casual manga larga", price: 22.3, category: "Ropa Hombre", description: "Camisa de algodón suave con corte cómodo para uso diario.", image: image("👕", "#e8f3f8"), rating: { rate: 4.1, count: 89 } },
  { id: 3, title: "Anillo plata .925 con circonia", price: 89, category: "Joyería", description: "Anillo de plata .925 con circonia y terminado pulido.", image: image("💍", "#fff1d9"), rating: { rate: 4.8, count: 64 } },
  { id: 4, title: "Vestido ligero de verano", price: 34.5, category: "Ropa Mujer", description: "Vestido ligero de tela fresca para clima cálido.", image: image("👗", "#fbe7ef"), rating: { rate: 4.5, count: 102 } },
  { id: 5, title: "Audífonos inalámbricos", price: 59.9, category: "Electrónica", description: "Audífonos Bluetooth con estuche de carga y controles táctiles.", image: image("🎧", "#e6f4ef"), rating: { rate: 4.6, count: 210 } },
  { id: 6, title: "Pulsera minimalista", price: 27.25, category: "Joyería", description: "Pulsera ajustable de diseño minimalista.", image: image("✨", "#f3edff"), rating: { rate: 4.2, count: 44 } },
];

export const MOCK_USERS: User[] = [
  { id: 1, username: "admin", email: "admin@nuvora.mx", phone: "427-100-1001", name: { firstname: "María", lastname: "González" } },
  { id: 2, username: "supervisor", email: "supervisor@nuvora.mx", phone: "427-100-1002", name: { firstname: "Javier", lastname: "López" } },
  { id: 3, username: "auditor", email: "auditor@nuvora.mx", phone: "427-100-1003", name: { firstname: "Ana", lastname: "Torres" } },
  { id: 4, username: "cliente", email: "cliente@nuvora.mx", phone: "427-100-1004", name: { firstname: "Carlos", lastname: "Ramírez" } },
];

export const MOCK_AUDIT_CARTS: AuditCart[] = [
  { id: 4521, userId: 4, date: "2026-09-14", products: [{ productId: 1, quantity: 2 }, { productId: 2, quantity: 1 }] },
  { id: 4519, userId: 5, date: "2026-09-13", products: [{ productId: 4, quantity: 2 }] },
  { id: 4515, userId: 4, date: "2026-09-12", products: [{ productId: 5, quantity: 1 }] },
];

export const wait = (milliseconds = 250): Promise<void> =>
  new Promise((resolve) => window.setTimeout(resolve, milliseconds));
