import { ForbiddenException } from "@/exceptions";
import { UserRole } from "@/lib/enums";
import { hasAnyRole } from "@/lib/utils";
import { createMiddleware } from "@tanstack/react-start";
import { authMiddleware } from "./authmiddleware";

export const requireRoles = (requiredRoles: UserRole[]) => {
  return createMiddleware()
    .middleware([authMiddleware])
    .server(async ({ next, context }) => {
      const hasRoles = hasAnyRole(context.user, requiredRoles);
      if (!hasRoles) throw new ForbiddenException('You are not authorized to access this resource');

      return next({
        context,
      });
    });
};