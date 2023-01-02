import { z } from 'zod';
import { toFormikValidationSchema } from '../toFormikValidationSchema';

describe('toFormikValidationSchema', () => {
  it('should pass validate without errors', async () => {
    const object = { name: 'mock', age: 32 };
    const { schema } = makeSut();
    const { validate } = toFormikValidationSchema(schema);

    const errors = await validate(object);

    expect(errors).toEqual(undefined);
  });

  it('should fail validate with error object', async () => {
    const object = { name: undefined, age: '32' } as unknown as never;
    const { schema } = makeSut();
    const { validate } = toFormikValidationSchema(schema);

    const error: { inner?: { path: string; message: string }[] } = {};
    error.inner = [
      {
        path: 'name',
        message: 'Required',
      },
      {
        message: 'Expected number, received string',
        path: 'age',
      },
    ];

    await expect(validate(object)).rejects.toMatchObject(error);
  });
});

function makeSut() {
  const schema = z.object({
    name: z.string(),
    age: z.number().optional(),
  });

  return {
    schema,
  };
}
