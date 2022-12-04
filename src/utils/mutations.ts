import { RegisterInput } from '@frontend/schemas/auth.schema';
import {
  CreateHolidayInput,
  UpdateHolidayInput,
} from '@frontend/schemas/holiday.schema';
import { ApiResponse } from '@frontend/types/util';
import { Holiday, User } from '@prisma/client';
import fetcher from './fetcher';

export const auth = (body: RegisterInput): Promise<ApiResponse<User>> => {
  return fetcher(`/auth/signup`, 'POST', body);
};

export const createHoliday = (
  body: CreateHolidayInput,
): Promise<ApiResponse<Holiday>> => {
  return fetcher(`/holiday`, 'POST', body);
};

export const updateHoliday = (
  body: UpdateHolidayInput,
): Promise<ApiResponse<Holiday>> => {
  return fetcher(`/holiday/${body.id}`, 'PUT', body);
};

export const deleteHoliday = (id: string): Promise<ApiResponse<null>> => {
  return fetcher(`/holiday/delete/${id}`, 'DELETE');
};

export const createImageSignature = (): Promise<{
  timestamp: string;
  signature: string;
}> => {
  return fetcher(`/image`, 'POST', {});
};
