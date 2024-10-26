import * as z from 'zod';

export const mainFormSchema = z.object({
  organizer: z.object({
    name: z
      .string({
        required_error: 'Это поле является обязательным',
      })
      .min(1, {
        message: 'Это поле не может быть пустым',
      }),
    email: z
      .string({
        required_error: 'Это поле является обязательным',
      })
      .min(1, { message: 'Это поле не может быть пустым' })
      .email({ message: 'Это недействительный адрес электронной почты' }),
  }),
  website: z
    .string({
      required_error: 'Это поле является обязательным',
    })
    .min(1, {
      message: 'Это поле не может быть пустым',
    })
    .url({ message: 'Это недействительная ссылка' }),
  title: z
    .string({
      required_error: 'Это поле является обязательным',
    })
    .min(1, {
      message: 'Это поле не может быть пустым',
    }),
  content: z
    .string({
      required_error: 'Это поле является обязательным',
    })
    .min(1, {
      message: 'Это поле не может быть пустым',
    }),
  terms: z.boolean().default(false),
});

export const eventFormSchema = z
  .object({
    ageCategory: z
      .string({
        required_error: 'Это поле является обязательным',
      })
      .min(1, {
        message: 'Это поле не может быть пустым',
      }),
    format: z
      .string({
        required_error: 'Это поле является обязательным',
      })
      .min(1, {
        message: 'Это поле не может быть пустым',
      }),
    startDate: z.date({
      required_error: 'Это поле является обязательным',
    }),
    endDate: z.date({
      required_error: 'Это поле является обязательным',
    }),
    images: z
      .custom<FileList>()
      .refine((files) => files?.length > 0, 'Это поле является обязательным')
      .refine(
        (files) => files?.length < 6,
        'Максимальное количество фотографий 5'
      )
      .refine(
        (files) =>
          ['image/jpeg', 'image/jpg', 'image/png'].includes(files?.[0]?.type),
        'Поддерживаемые типы - .jpg, .jpeg, .png'
      ),
    address: z.object(
      {
        point: z
          .number({
            required_error: 'Это поле является обязательным',
          })
          .array()
          .min(2)
          .max(2),
        city: z
          .string({
            required_error: 'Это поле является обязательным',
          })
          .min(1, {
            message: 'Это поле не может быть пустым',
          }),
        text: z
          .string({
            required_error: 'Это поле является обязательным',
          })
          .min(1, {
            message: 'Это поле не может быть пустым',
          }),
        country: z
          .string({
            required_error: 'Это поле является обязательным',
          })
          .min(1, {
            message: 'Это поле не может быть пустым',
          }),
      },
      {
        required_error: 'Это поле является обязательным',
      }
    ),
  })
  .merge(mainFormSchema);

export const clubFormSchema = z
  .object({
    images: z
      .custom<FileList>()
      .refine((files) => files?.length > 0, 'Это поле является обязательным')
      .refine(
        (files) => files?.length < 6,
        'Максимальное количество фотографий 5'
      )
      .refine(
        (files) =>
          ['image/jpeg', 'image/jpg', 'image/png'].includes(files?.[0]?.type),
        'Поддерживаемые типы - .jpg, .jpeg, .png'
      ),
    format: z
      .string({
        required_error: 'Это поле является обязательным',
      })
      .min(1, {
        message: 'Это поле не может быть пустым',
      }),
    ageCategory: z.object(
      {
        from: z.string({
          required_error: 'Это поле является обязательным',
        }),
        to: z.string({
          required_error: 'Это поле является обязательным',
        }),
      },
      {
        required_error: 'Это поле является обязательным',
      }
    ),
    address: z.object(
      {
        point: z
          .number({
            required_error: 'Это поле является обязательным',
          })
          .array()
          .min(2)
          .max(2),
        city: z
          .string({
            required_error: 'Это поле является обязательным',
          })
          .min(1, {
            message: 'Это поле не может быть пустым',
          }),
        text: z
          .string({
            required_error: 'Это поле является обязательным',
          })
          .min(1, {
            message: 'Это поле не может быть пустым',
          }),
        country: z
          .string({
            required_error: 'Это поле является обязательным',
          })
          .min(1, {
            message: 'Это поле не может быть пустым',
          }),
      },
      {
        required_error: 'Это поле является обязательным',
      }
    ),
    type: z
      .string({
        required_error: 'Это поле является обязательным',
      })
      .min(1, {
        message: 'Это поле не может быть пустым',
      }),
  })
  .merge(mainFormSchema);

export const programFormSchema = z
  .object({
    images: z
      .custom<FileList>()
      .refine((files) => files?.length > 0, 'Это поле является обязательным')
      .refine(
        (files) => files?.length < 6,
        'Максимальное количество фотографий 5'
      )
      .refine(
        (files) =>
          ['image/jpeg', 'image/jpg', 'image/png'].includes(files?.[0]?.type),
        'Поддерживаемые типы - .jpg, .jpeg, .png'
      ),
    city: z
      .string({
        required_error: 'Это поле является обязательным',
      })
      .min(1, {
        message: 'Это поле не может быть пустым',
      }),
    startDate: z.date().optional(),
    endDate: z.date().optional(),
    isDated: z.boolean().optional(),
  })
  .merge(mainFormSchema);

export const photoSchema = z
  .custom<FileList>()
  .refine((files) => files?.length > 0)
  .refine((files) =>
    ['image/jpeg', 'image/jpg', 'image/png'].includes(files?.[0]?.type)
  )
  .optional();

export type EventFormType = z.infer<typeof eventFormSchema>;
export type ClubFormType = z.infer<typeof clubFormSchema>;
export type ProgramFormType = z.infer<typeof programFormSchema>;
