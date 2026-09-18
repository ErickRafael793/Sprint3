import { useEffect, useState } from "react";
import { useDependencies } from "@/app/DependenciesProvider";
import type { User } from "@/domain/models";

export function useUsersViewModel() {
  const { userRepository } = useDependencies();
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    userRepository.getAll().then(setUsers);
  }, [userRepository]);

  return { users };
}
