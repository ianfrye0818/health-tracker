import { prisma } from '@/db';
import {
  BloodPressureEntryDto,
  BloodPressureInclude,
  toBloodPressureEntryDto,
} from '@/lib/dtos';
import { SessionUser } from '@/lib/session';

export const getUserBloodPressureEntries = async (
  user: SessionUser
): Promise<BloodPressureEntryDto[]> => {
  const entries = await prisma.bloodPressureEntry.findMany({
    where: { userId: user.id },
    include: BloodPressureInclude,
  });

  return entries.map(toBloodPressureEntryDto);
};
