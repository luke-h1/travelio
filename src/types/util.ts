import { FieldError } from '@frontend/utils/toErrorMap';

export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;

export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};

export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};

export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};

// api response looks like this:
// { data: '', errors: [] }
export type ApiResponse<T> = {
  data: Maybe<T>;
  errors: Maybe<Array<FieldError>>;
};

export const makeApiResponse = <T>(
  data: T,
  errors: FieldError[] | [],
): ApiResponse<T> => {
  return {
    data,
    errors,
  };
};
