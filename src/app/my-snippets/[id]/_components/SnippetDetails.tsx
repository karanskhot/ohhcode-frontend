'use client';
import { Input } from '@/components/ui/input';
import { format } from 'date-fns';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Bookmark, ChevronDown } from 'lucide-react';

import {
  Combobox,
  ComboboxAnchor,
  ComboboxBadgeItem,
  ComboboxBadgeList,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxTrigger,
} from '@/components/ui/combobox';

import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

import { useForm, useWatch } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import { toast } from 'sonner';
import { useQueryClient } from '@tanstack/react-query';
import {
  UpdateSnippetRequest,
  UpdateSnippetSchema,
} from '@/schemas/snippet/SnippetSchema';
import { Snippet } from '@/types/snippet/snippet.types';
import { TAG_OPTIONS } from '@/constants/Tags';
import { snippetService } from '@/services/snippet-service';

const SnippetDetails = ({ snippet }: { snippet: Snippet }) => {
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<UpdateSnippetRequest>({
    resolver: zodResolver(UpdateSnippetSchema),
    values: {
      title: snippet.title,
      tags: snippet.tags,
      difficulty: snippet.difficulty,
      important: snippet.important,
      memoryNotes: snippet.memoryNotes || '',
    },
  });

  const tags = useWatch({
    control,
    name: 'tags',
  });
  useWatch({
    control,
    name: 'title',
  });

  const important = useWatch({
    control,
    name: 'important',
  });

  const handleUpdateSnippet = async (data: UpdateSnippetRequest) => {
    console.log(data);
    const { message } = await snippetService.updateSnippet({
      payload: data,
      snippetId: snippet.id,
    });
    toast.success(message);
    queryClient.invalidateQueries({
      queryKey: ['snippet', snippet.id],
    });
  };

  return (
    <div className='border-border/60 mx-auto mt-2 flex max-w-2xl flex-col space-y-4 rounded-2xl border p-5 shadow-xl bg-slate-50/50 dark:bg-zinc-950/50 backdrop-blur-md'>
      {/* HEADER */}
      <div className='flex flex-row-reverse items-center justify-between'>
        {/* <Badge
          variant={
            snippet.status === 'ANALYZED'
              ? 'outline'
              : snippet.status === 'FAILED'
                ? 'destructive'
                : 'secondary'
          }
          className='px-4 py-3 text-sm tracking-wide'
        >
          {snippet.status}
        </Badge> */}
        <span className=''>{snippet.status}</span>
        <h1 className='text-lg font-semibold'>{snippet.title}</h1>
      </div>

      {/* META */}
      <div className='text-muted-foreground flex justify-between space-y-1 text-xs'>
        <h1>
          Created on{' '}
          <span className='text-foreground'>
            {format(new Date(snippet.createdAt), 'MMMM do, yyyy')}
          </span>
        </h1>

        {snippet.lastAnalyzedAt && (
          <>
            <h1>
              Analyzed on{' '}
              <span className='text-foreground'>
                {format(new Date(snippet.lastAnalyzedAt), 'MMMM do, yyyy')}
              </span>
            </h1>
            <h1>
              Language{' '}
              <span className='text-foreground'>{snippet.language}</span>
            </h1>
          </>
        )}
      </div>

      {/* IMAGE */}
      <div
        className={`relative ${snippet.analysis ? 'h-64' : 'h-120'} border-border/60 bg-muted w-full overflow-hidden rounded-xl border`}
      >
        <Image
          src={snippet.url}
          alt={snippet.title || 'Snippet Image'}
          fill
          sizes='(max-width: 1920px) 100vw, 600px'
          className='object-contain transition-transform duration-500 hover:scale-105'
          priority
        />
      </div>

      {/* FORM */}
      {(snippet.status === 'ANALYZED' ||
        (snippet.status !== 'UPLOADED' && snippet.status !== 'ANALYZING')) && (
        <form
          onSubmit={handleSubmit(handleUpdateSnippet)}
          className='border-border/60 bg-muted flex flex-col space-y-5 rounded-xl border p-5 shadow-sm backdrop-blur'
        >
          {/* TITLE */}
          <div
            className={`flex items-center border border-secondary bg-background transition-colors ${errors.title ? 'border-destructive' : 'border-secondary'} focus-within:ring-1 focus-within:ring-ring focus-within:border-secondary`}
          >
            <Input
              id='title'
              autoComplete='off'
              placeholder='snippet title'
              {...register('title')}
              className='text-[15px]!  border-0 bg-transparent!  focus-visible:ring-0 rounded-none ring-0  h-10 w-full'
            />
          </div>

          {/* DIFFICULTY */}
          <div className='flex items-center justify-between'>
            <Select
              onValueChange={(val) =>
                setValue('difficulty', val as Snippet['difficulty'])
              }
              defaultValue={snippet.difficulty}
            >
              <SelectTrigger className='h-10! text-base w-1/2 rounded-none border border-secondary'>
                <SelectValue placeholder='Select difficulty' />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value='EASY'>Easy</SelectItem>
                <SelectItem value='MEDIUM'>Medium</SelectItem>
                <SelectItem value='HIGH'>High</SelectItem>
                <SelectItem value='AMBITIOUS'>Ambitious</SelectItem>
              </SelectContent>
            </Select>
            <Button
              variant='ghost'
              type='button'
              className='border border-secondary hover:bg-background cursor-pointer flex h-11 items-center gap-2 transition-all'
              onClick={() => setValue('important', !important)}
            >
              <span className='text-xs'>Needs Revision</span>
              <Bookmark
                className={`size-4 transition-all ${
                  important ? 'scale-110 fill-yellow-400 text-yellow-400' : ''
                }`}
              />
            </Button>
          </div>

          {/* TAGS */}
          <div
            className={`flex items-center border border-secondary bg-background transition-colors ${errors.tags ? 'border-destructive' : 'border-secondary'} focus-within:ring-1 focus-within:ring-ring focus-within:border-secondary`}
          >
            <Combobox
              value={tags}
              onValueChange={(val) => setValue('tags', val)}
              className='w-full'
              multiple
              autoHighlight
            >
              <ComboboxAnchor className='border-border/60 flex h-auto min-h-12 items-center gap-1 rounded-none border px-2 py-1'>
                <ComboboxBadgeList>
                  {tags.map((tag) => {
                    const option = TAG_OPTIONS.find(
                      (t) => t.toLowerCase() === tag.toLowerCase(),
                    );
                    if (!option) return null;

                    return (
                      <ComboboxBadgeItem key={tag} value={tag}>
                        {option}
                      </ComboboxBadgeItem>
                    );
                  })}
                </ComboboxBadgeList>

                <ComboboxInput
                  placeholder={tags.length > 0 ? '' : 'Select tags...'}
                  className='flex-1 text-sm'
                />

                <ComboboxTrigger>
                  <ChevronDown className='h-4 w-4 opacity-60' />
                </ComboboxTrigger>
              </ComboboxAnchor>

              <ComboboxContent className='max-h-40 overflow-y-auto'>
                <ComboboxEmpty>No tags found.</ComboboxEmpty>
                {TAG_OPTIONS.map((tag) => (
                  <ComboboxItem key={tag} value={tag}>
                    {tag}
                  </ComboboxItem>
                ))}
              </ComboboxContent>
            </Combobox>
            {errors && (
              <p className='text-destructive text-xs'>{errors.tags?.message}</p>
            )}
          </div>

          {/* NOTES */}
          <Textarea
            placeholder='Add your memory notes...'
            className={`flex items-center border border-secondary bg-background transition-colors focus-within:ring-1 focus-within:ring-ring focus-within:border-secondary`}
            rows={6}
            {...register('memoryNotes')}
          />

          {/* ACTION */}
          <div className='flex justify-end'>
            <Button className='h-11 px-6 font-medium tracking-tight'>
              Save Snippet
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};
export default SnippetDetails;
