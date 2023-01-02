import { FieldError } from '@frontend/utils/toErrorMap';
import { makeApiResponse } from '../util';

describe('makeApiResponse', () => {
  test('should return an object with data and no errors', () => {
    const data = {
      id: 1,
      name: 'test',
    };
    const errors: FieldError[] = [];
    const response = makeApiResponse(data, errors);
    expect(response).toEqual({
      data: {
        id: 1,
        name: 'test',
      },
      errors: [],
    });
  });

  test('should return an object with no data if errors', () => {
    const data = null;
    const errors: FieldError[] = [
      {
        field: 'name',
        message: 'name is required',
      },
    ];
    const response = makeApiResponse(data, errors);
    expect(response).toEqual({
      data: null,
      errors: [
        {
          field: 'name',
          message: 'name is required',
        },
      ],
    });
  });
});
