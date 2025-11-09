import { UserDto } from "@/server/dtos";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { USERS_QUERY_KEY } from "./shared";
import { getUserDetails } from "@/server/functions/users";

export const useGetUserDetails = (userId: string, options?: UseQueryOptions<UserDto | null>) => useQuery({
  queryKey: [USERS_QUERY_KEY, userId],
  queryFn: () => getUserDetails({ data: { userId } }),
  ...options,

})
