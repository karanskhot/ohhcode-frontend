import {
  UploadSnippetRequest,
  UploadSnippetSchema,
} from '@/schemas/snippet/SnippetSchema';
import { snippetService } from '@/services/snippet-service';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { toast } from 'sonner';
import {
  FileUpload,
  FileUploadDropzone,
  FileUploadItem,
  FileUploadItemMetadata,
  FileUploadItemPreview,
  FileUploadItemProgress,
  FileUploadList,
  FileUploadProps,
} from '../ui/file-upload';
import { FilePlus2 } from 'lucide-react';

const SnippetUpload = ({ onSuccess }: { onSuccess?: () => void }) => {
  const router = useRouter();
  const {
    setValue,
    control,
    formState: { errors, isSubmitting },
  } = useForm<UploadSnippetRequest>({
    resolver: zodResolver(UploadSnippetSchema),
    defaultValues: {
      title: '',
      snippetImage: undefined,
    },
  });

  const file = useWatch({ control, name: 'snippetImage' });
  const onSnippetUpload: NonNullable<FileUploadProps['onUpload']> = useCallback(
    async (files, { onProgress, onError }) => {
      const f = files[0];
      if (!f) return;

      try {
        const totalChunks = 10;
        let uploadedChunks = 0;
        onProgress(f, totalChunks / 2);
        const { message, snippetId } = await snippetService.uploadSnippet({
          title: '',
          snippetImage: f,
        });

        // Simulate n/w delays
        for (let i = 0; i < totalChunks; i++) {
          await new Promise((resolve) =>
            setTimeout(resolve, Math.random() * 200 + 100),
          );

          uploadedChunks++;
          const progress = (uploadedChunks / totalChunks) * 100;
          onProgress(f, progress);
        }

        toast.success(message);
        router.replace(`/my-snippets/${snippetId}`);
        onSuccess?.();
      } catch {
        onError(f, new Error('Upload failed'));
        onProgress(f, 100);
      } finally {
        onProgress(f, 100);
      }
    },
    [router, onSuccess],
  );
  const onFileReject = useCallback((file: File, message: string) => {
    toast(message, { description: file.name });
  }, []);

  const handleFileChange = async (files: File[]) => {
    const f = files[0] || undefined;
    setValue('snippetImage', f, { shouldValidate: true });
  };

  return (
    <FileUpload
      value={file ? [file] : []}
      onValueChange={handleFileChange}
      onUpload={onSnippetUpload}
      onFileReject={onFileReject}
      maxFiles={1}
      accept='image/jpeg, image/png , image/gif, image/webp'
      maxSize={2 * 1024 * 1024}
      disabled={isSubmitting}
      className='w-full'
    >
      <form className='bg-background space-y-3 rounded-2xl border p-4 shadow-2xl'>
        {/* DROPZONE */}
        {!file && (
          <FileUploadDropzone className='border-primary hover:bg-muted flex cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed transition'>
            <div className='text-sm flex flex-col items-center gap-1 font-medium'>
              <FilePlus2 className='text-muted-foreground w-6 h-6' />
              Drag & Drop snippet here. Or click to browse.
            </div>
            <p className='text-muted-foreground text-xs'>
              PNG, JPG, WEBP • max 2MB
            </p>
          </FileUploadDropzone>
        )}

        {/* FILE ERROR */}
        {errors.snippetImage && (
          <p className='text-xs text-red-500'>
            {errors.snippetImage.message as string}
          </p>
        )}

        {/* PREVIEW */}
        {file && (
          <FileUploadList>
            <FileUploadItem
              value={file}
              className='border-accent rounded-md border p-2'
            >
              <FileUploadItemPreview className={`size-20`}>
                <FileUploadItemProgress variant='fill' />
              </FileUploadItemPreview>

              <FileUploadItemMetadata />
            </FileUploadItem>
          </FileUploadList>
        )}
      </form>
    </FileUpload>
  );
};
export default SnippetUpload;
