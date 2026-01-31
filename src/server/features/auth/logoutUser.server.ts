import { useAppSession } from "@/lib/session";

export const logoutUser = async (): Promise<void> => {
    const session = await useAppSession();
    await session.clear();
}