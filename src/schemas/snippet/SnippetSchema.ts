import z from 'zod';

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
];

export const UploadSnippetSchema = z.object({
  title: z.string().min(1, { message: 'Title is required' }),
  snippetImage: z
    .instanceof(File, { message: 'Code snippet is required' })
    .refine((file) => file instanceof File, 'Code snippet is required')
    .refine(
      (file) => !file || file.size <= MAX_FILE_SIZE,
      'Maximum 2 MB allowed',
    )
    .refine(
      (file) => !file || ACCEPTED_IMAGE_TYPES.includes(file.type),
      'Only .jpg, .jpeg, .png and .webp formats are supported.',
    ),
});

export type UploadSnippetRequest = z.infer<typeof UploadSnippetSchema>;

export const UpdateSnippetSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  difficulty: z.enum(['EASY', 'MEDIUM', 'HIGH', 'AMBITIOUS']),
  // status: z.enum(["UPLOADED", "ANALYZING", "ANALYZED", "FAILED"]),
  tags: z.array(z.string()).max(4),
  important: z.boolean(),
  memoryNotes: z.string().optional(),
});

export type UpdateSnippetRequest = z.infer<typeof UpdateSnippetSchema>;
