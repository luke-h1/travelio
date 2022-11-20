import {
  CreateHolidayInput,
  UpdateHolidayInput,
  DeleteHolidayInput,
} from '@frontend/schemas/holiday.schema';
import { ApiResponse } from '@frontend/types/util';
import { Holiday, User } from '@prisma/client';
import fetcher from './fetcher';

export const auth = (
  mode: 'login' | 'register',
  body: {
    email: string;
    password: string;
  },
): Promise<ApiResponse<User>> => {
  return fetcher(`/${mode}`, 'POST', body);
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
