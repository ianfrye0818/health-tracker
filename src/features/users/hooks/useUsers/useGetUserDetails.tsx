import { AppUser } from "@/lib/dtos";
import { GetUsersDetailsFn } from "@/server/features/users/UsersController";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { USERS_QUERY_KEY } from "./shared";

export const useGetUserDetails = (userId: string, options?: Partial<UseQueryOptions<AppUser>>) => useQuery({
  queryKey: [USERS_QUERY_KEY, userId],
  queryFn: () => GetUsersDetailsFn({ data: { userId }}),
  ...options
})
