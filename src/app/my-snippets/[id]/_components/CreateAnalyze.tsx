import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useCreateAnalysis } from '@/hooks/use-snippet';
import { Snippet } from '@/types/snippet/snippet.types';
import { WandSparkles } from 'lucide-react';
import { useState } from 'react';

const CreateAnalyze = ({
  snippet,
  snippetId,
}: {
  snippet: Snippet;
  snippetId: string;
}) => {
  console.log(snippet);
  const [prefLanguage, setPrefLanguage] = useState(
    snippet?.language || 'ENGLISH',
  );
  const mutation = useCreateAnalysis(snippetId);

  const handleSnippetAnalysis = async () => {
    await mutation.mutateAsync({
      snippetId,
      payload: { language: prefLanguage },
    });
  };
  return (
    <div className='flex items-center justify-end w-full  mb-6'>
      <div className='flex items-center gap-4'>
        <Select
          value={prefLanguage}
          onValueChange={(val) => {
            setPrefLanguage(val as Snippet['language']);
          }}
        >
          <SelectTrigger className='w-40 h-10! text-base border-primary'>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem className='text-base' value='ENGLISH'>
              English
            </SelectItem>
            <SelectItem className='text-base' value='HINDI'>
              Hindi
            </SelectItem>
            <SelectItem className='text-base' value='HINGLISH'>
              Hinglish
            </SelectItem>
            <SelectItem className='text-base' value='MARATHI'>
              Marathi
            </SelectItem>
            <SelectItem className='text-base' value='SPANISH'>
              Spanish
            </SelectItem>
          </SelectContent>
        </Select>

        <Button
          className='font-bold px-5 py-2 h-11! hover:shadow cursor-pointer text-base'
          onClick={handleSnippetAnalysis}
          disabled={snippet.status === 'ANALYZING'}
        >
          <WandSparkles className='animate-pulse' />
          {/* {snippet.lastAnalyzedAt ? 'Re-Analyze' : 'Analyze'} */}
          OhhCode
        </Button>
      </div>
    </div>
  );
};
export default CreateAnalyze;
