import { AppUser } from "@/lib/dtos";
import { GetUsersFn } from "@/server/features/users/UsersController";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { USERS_QUERY_KEY } from "./shared";

export const useGetUsers = (options?: Partial<UseQueryOptions<AppUser[]>>) => useQuery({
  queryKey: [USERS_QUERY_KEY],
  queryFn: () => GetUsersFn(),
  ...options
})
