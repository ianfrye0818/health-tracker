
import { UnauthorizedException } from "@/Exceptions";
import { auth } from "@/utils/auth";
import { createMiddleware } from "@tanstack/react-start";


export const authMiddleware = createMiddleware().server(async ({ next, request }) => {
    const session = await auth.api.getSession({ headers: request.headers });
    if (!session) throw new UnauthorizedException('You must be logged in to access this resource');


    const user = session.user;

    return next({
        context: { user }
    });
});
