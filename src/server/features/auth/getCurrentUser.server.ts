import { SessionUser, useAppSession } from "@/lib/session";

export const getCurrentUser = async (): Promise<SessionUser | null> => {
    const session = await useAppSession();

    if (!session.data || !session.data.id) return null;

    return session.data as SessionUser;
}