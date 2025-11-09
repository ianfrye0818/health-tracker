import { UserDto } from "@/server/dtos";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { USERS_QUERY_KEY } from "./shared";
import { getUsers } from "@/server/functions/users";

export const useGetUsers = (options?: UseQueryOptions<UserDto[]>) => useQuery({
  queryKey: [USERS_QUERY_KEY],
  queryFn: () => getUsers(),
  ...options
})
