import { clsx, type ClassValue } from 'clsx';
import { format } from 'date-fns';
import * as libPhoneNumber from 'libphonenumber-js';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getFormattedPhoneNumber(val: string | undefined) {
  if (!val) return { isValid: false, formattedNumber: '' };
  const cleanedValue = val.replace(/\D/g, '');
  const parsedNumber = libPhoneNumber.parsePhoneNumberFromString(
    cleanedValue,
    'US'
  );
  const formattedNumber = parsedNumber
    ? parsedNumber.format('NATIONAL', { fromCountry: 'US' })
    : '';
  const isValid = parsedNumber?.isValid();
  return { isValid, formattedNumber: isValid ? formattedNumber : '' };
}

export function startCase(wordString?: string | null) {
  if (!wordString) return '';
  //Remove any non-alphanumeric characters
  const cleanedString = wordString.replace(/[^a-zA-Z0-9]/g, ' ').trim();
  const words = cleanedString.split(' ');
  return words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}
export function truncate(
  wordString: string | undefined,
  length: number,
  omission: string = '...'
) {
  if (!wordString || wordString.length <= length) return wordString;
  return wordString.slice(0, length) + omission;
}
export const parseESTTime = (dateString: string, formatStr: string) => {
  // Remove the Z and parse as local time (which is already EST)
  const cleanedDate = dateString.replace('Z', '');
  const date = new Date(cleanedDate);
  return format(date, formatStr);
};

export const calculateDurationInSeconds = (
  startTime?: string,
  endTime?: string
) => {
  if (!startTime || !endTime) return 0;

  // Parse the ISO strings directly - they're already in UTC
  const start = new Date(startTime);
  const end = new Date(endTime);

  // Check if dates are valid
  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
    console.error('Invalid date format:', { startTime, endTime });
    return 0;
  }

  // Calculate difference in milliseconds and convert to seconds
  const diffInMs = end.getTime() - start.getTime();
  const diffInSeconds = Math.floor(diffInMs / 1000);

  // Ensure we don't return negative durations
  return Math.max(0, diffInSeconds);
};

export const formatDateString = (
  dateString?: string | Date | null,
  options?: { includeTime?: boolean }
) => {
  if (!dateString) return '';
  const date =
    typeof dateString === 'string' ? dateString : dateString.toISOString();

  const [year, month, day] = date.split('T')[0].split('-');
  const [hour, minute, second] = date.split('T')[1].split(':');
  const formattedSecond = second?.split('.')[0];
  const formattedHour = Number(hour) > 12 ? Number(hour) - 12 : hour;

  return (
    `${month}/${day}/${year}` +
    (options?.includeTime
      ? `, ${formattedHour}:${minute}:${formattedSecond}`
      : '')
  );
};

export const calculateHumanReadableDuration = (durationInSeconds: number) => {
  const hours = Math.floor(durationInSeconds / 3600);
  const minutes = Math.floor((durationInSeconds % 3600) / 60);

  return `${hours}h ${minutes}m`;
};

export const isTimeValid = (startTime?: string, endTime?: string) => {
  if (!startTime) return false;

  if (!endTime) return true;

  const start = new Date(startTime).getTime();
  const end = new Date(endTime).getTime();

  // Check if start time is before end time
  return start <= end;
};

/**
 * Validates that a number is a valid 10-digit phone number
 * @param phoneNumber The number to validate
 * @returns true if valid 10-digit phone number, false otherwise
 */
export function isValidPhoneNumber(phoneNumber: number | string): boolean {
  let phoneStr: string;
  if (typeof phoneNumber === 'number') {
    phoneStr = phoneNumber.toString();
  } else {
    phoneStr = phoneNumber;
  }

  if (phoneStr.length !== 10) {
    return false;
  }

  if (!/^\d{10}$/.test(phoneStr)) {
    return false;
  }

  const parsedNumber = libPhoneNumber.parsePhoneNumberFromString(
    phoneStr,
    'US'
  );
  return parsedNumber?.isValid() ?? false;
}

export function convertToMs(minutes: number) {
  return minutes * 60 * 1000;
}

/**
 * Generic function to remove pagination fields from any query type.
 * Removes: page, limit, sortOrder, search, and sortBy fields.
 *
 * @param query - The query object that extends pagination schema
 * @returns The query object without pagination fields
 */
export function parseQuery<T extends Record<string, any>>(
  query?: T
): Omit<T, 'page' | 'limit' | 'sortOrder' | 'search' | 'sortBy'> {
  if (!query)
    return {} as Omit<T, 'page' | 'limit' | 'sortOrder' | 'search' | 'sortBy'>;

  // Remove pagination fields: page, limit, sortOrder, search, and sortBy
  const { page, limit, sortOrder, search, sortBy, ...rest } = query;

  return rest;
}

export const getStoredPageSize = (tableId: string) => {
  try {
    const stored = localStorage.getItem(tableId);
    if (stored) {
      const parsed = JSON.parse(stored);
      return Number(parsed.pageSize) || 10;
    }
  } catch {
    return 10;
  }
};
