import { z } from 'zod';

const payload = {
  title: z.string({
    required_error: 'Title is required',
  }),
  startDate: z.string({
    required_error: 'Start date is required',
  }),
  endDate: z.string({
    required_error: 'End date is required',
  }),
  tags: z.array(z.string()).optional(),
  country: z.string({
    required_error: 'Country is required',
  }),
  city: z.string({
    required_error: 'City is required',
  }),
  image: z.string(),
  notes: z.string().optional(),
  rating: z.number().optional(),
};

const params = {
  id: z.string({
    required_error: 'id is a required field',
  }),
};

export const createHolidaySchema = z.object({
  ...payload,
});

export const updateHolidaySchema = z.object({
  ...payload,
  ...params,
});

export const deleteHolidaySchema = z.object({
  ...params,
});

export const getHolidaySchema = z.object({
  ...params,
});

export type CreateHolidayInput = z.TypeOf<typeof createHolidaySchema>;
export type UpdateHolidayInput = z.TypeOf<typeof updateHolidaySchema>;
export type DeleteHolidayInput = z.TypeOf<typeof deleteHolidaySchema>;
export type GetHolidayInput = z.TypeOf<typeof getHolidaySchema>;
