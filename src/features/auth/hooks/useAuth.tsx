import { useRouteContext } from "@tanstack/react-router";

export const useAuth = () => {
    const context = useRouteContext({ from: '__root__'})

    return { user: context.user };
}