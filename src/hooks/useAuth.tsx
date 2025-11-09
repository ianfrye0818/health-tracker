import { authClient } from "@/lib/auth-client";

export const useAuth = () => {
    const session = authClient.useSession();
    const user = session?.data?.user;
  
    return {
      session,
      user,
    };
  };