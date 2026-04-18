'use client';
import { Button } from '../ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import { useState } from 'react';
import { FilePlus2Icon } from 'lucide-react';
import SnippetUpload from './SnippetUpload';
// import { SnippetUploadNew } from '../forms/SnippetUploadNew';

const UploadSnippetDialog = () => {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          size='lg'
          variant={'default'}
          className='cursor-pointer px-6 rounded-md shadow bg-primary hover:bg-primary/95 transition-all'
        >
          <FilePlus2Icon className='size-5!' />
          <span className='text-base font-medium tracking-wide'>Snippet</span>
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-150 rounded-none'>
        <DialogHeader>
          <DialogTitle className='text-2xl font-bold flex items-center gap-3'>
            <FilePlus2Icon />
            Add Snippet
          </DialogTitle>
          <DialogDescription>
            Upload and save your code snippet. Once done, Let Ohhcode.ai do the
            rest!
          </DialogDescription>
        </DialogHeader>
        <SnippetUpload onSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
};
export default UploadSnippetDialog;
