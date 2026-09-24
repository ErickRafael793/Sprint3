import { AuthService } from "@/application/AuthService";
import { APP_CONFIG } from "@/core/appConfig";
import { HttpClient } from "@/infrastructure/http/HttpClient";
import { BrowserCartRepository } from "@/infrastructure/repository/BrowserCartRepository";
import { BrowserSessionRepository } from "@/infrastructure/repository/BrowserSessionRepository";
import { FakeStoreAuditRepository } from "@/infrastructure/repository/FakeStoreAuditRepository";
import { FakeStoreAuthRepository } from "@/infrastructure/repository/FakeStoreAuthRepository";
import { FakeStoreProductRepository } from "@/infrastructure/repository/FakeStoreProductRepository";
import { FakeStoreUserRepository } from "@/infrastructure/repository/FakeStoreUserRepository";

const http = new HttpClient(APP_CONFIG.api.baseUrl);
const sessionRepository = new BrowserSessionRepository();
const cartRepository = new BrowserCartRepository(http);

export const dependencies = {
  authService: new AuthService(
    new FakeStoreAuthRepository(http),
    sessionRepository,
    cartRepository,
    () => navigator.onLine,
  ),
  productRepository: new FakeStoreProductRepository(http),
  userRepository: new FakeStoreUserRepository(http),
  auditRepository: new FakeStoreAuditRepository(http),
  cartRepository,
};

export type Dependencies = typeof dependencies;