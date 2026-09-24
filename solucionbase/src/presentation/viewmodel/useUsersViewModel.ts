import { useCallback, useEffect, useState } from "react";
import { useDependencies } from "@/app/DependenciesProvider";
import { AppError } from "@/core/AppError";
import type { User } from "@/domain/models";

export function useUsersViewModel() {
  const { userRepository } = useDependencies();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      setUsers(await userRepository.getAll());
    } catch (caughtError) {
      setUsers([]);
      setError(
        caughtError instanceof AppError
          ? caughtError.message
          : "No fue posible cargar los usuarios.",
      );
    } finally {
      setLoading(false);
    }
  }, [userRepository]);

  useEffect(() => {
    void load();
  }, [load]);

  return { users, loading, error, retry: load };
}