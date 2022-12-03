import { RegisterInput } from '@frontend/schemas/auth.schema';
import {
  CreateHolidayInput,
  UpdateHolidayInput,
  DeleteHolidayInput,
} from '@frontend/schemas/holiday.schema';
import { ApiResponse } from '@frontend/types/util';
import { Holiday, User } from '@prisma/client';
import fetcher from './fetcher';

export const auth = (
  mode: 'register',
  body: RegisterInput,
): Promise<ApiResponse<User>> => {
  return fetcher(`/auth/signup`, 'POST', body);
};

export const getOneHoliday = (
  id: string,
): Promise<ApiResponse<Holiday & { user: User }>> => {
  return fetcher('/holiday', 'GET', { getOne: true, id });
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

export const deleteHoliday = (
  body: DeleteHolidayInput,
): Promise<ApiResponse<Holiday>> => {
  return fetcher(`/holiday/${body.id}`, 'DELETE', body);
};

export const createImageSignature = (): Promise<{
  timestamp: string;
  signature: string;
}> => {
  return fetcher(`/image`, 'POST', {});
};
