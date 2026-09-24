import { AuthService } from "@/application/AuthService";
import { APP_CONFIG } from "@/core/appConfig";
import { HttpClient } from "@/infrastructure/http/HttpClient";
import { BrowserCartRepository } from "@/infrastructure/repository/BrowserCartRepository";
import { BrowserSessionRepository } from "@/infrastructure/repository/BrowserSessionRepository";
import { FakeStoreAuthRepository } from "@/infrastructure/repository/FakeStoreAuthRepository";
import { MockAuditRepository } from "@/infrastructure/repository/MockAuditRepository";
import { MockProductRepository } from "@/infrastructure/repository/MockProductRepository";
import { MockUserRepository } from "@/infrastructure/repository/MockUserRepository";

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
  productRepository: new MockProductRepository(),
  userRepository: new MockUserRepository(),
  auditRepository: new MockAuditRepository(),
  cartRepository,
};

export type Dependencies = typeof dependencies;