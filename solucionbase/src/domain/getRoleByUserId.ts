import type { UserRole } from "@/domain/models";

const SPECIAL_ROLES: Readonly<Record<number, UserRole>> = {
  1: "ADMIN",
  2: "ADMIN",
  3: "AUDITOR",
};

export const getRoleByUserId = (userId: number): UserRole =>
  SPECIAL_ROLES[userId] ?? "CLIENT";
