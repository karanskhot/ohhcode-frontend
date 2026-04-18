'use client';

import { Code2 } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { SnippetAnalysis } from '@/types/snippet/snippet.types';

const SnippetAnalysisPanel = ({ analysis }: { analysis: SnippetAnalysis }) => {
  const { code, complexity, practice, recall } = analysis;

  return (
    <div className='w-full h-5/6 flex flex-col p-4 bg-background text-foreground'>
      <Carousel
        className='w-full max-w-2xl mx-auto'
        opts={{ align: 'start', loop: true }}
      >
        <CarouselContent>
          {/* 1. RECALL */}
          <CarouselItem>
            <div className='border-2 rounded-xl bg-card overflow-hidden'>
              <div className='flex flex-col aspect-square p-6'>
                <div className='flex items-center gap-2 border-b pb-3 mb-4'>
                  <span className='font-bold text-primary uppercase text-xl'>
                    Recall Strategy
                  </span>
                </div>

                <div className='flex-1 overflow-y-auto'>
                  <div>
                    <h4 className='font-bold text-accent-foreground text-lg capitalize mb-2'>
                      How you solved it
                    </h4>
                    <ul className='list-none space-y-2'>
                      {recall.summary.map((item, i) => (
                        <li
                          key={i}
                          className='text-base px-2 border-l-4 border-primary capitalize font-semibold'
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className='font-bold text-accent-foreground text-lg capitalize mb-2 mt-6'>
                      When to Use
                    </h4>
                    <ul className='list-none space-y-2'>
                      {recall.whenToUse.map((item, i) => (
                        <li
                          key={i}
                          className='text-base px-2 border-l-4 border-primary capitalize font-semibold'
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className='font-extrabold text-accent-foreground text-lg capitalize mb-2 mt-6'>
                      <hr className='mb-6' />
                      Triggers / Signals
                    </h4>
                    <div className='flex flex-wrap gap-2'>
                      {recall.recognitionSignals.map((item, i) => (
                        <Badge
                          key={i}
                          variant={'outline'}
                          className='capitalize py-4 px-2 text-sm'
                        >
                          {item}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CarouselItem>

          {/* 2. PRACTICE */}
          <CarouselItem>
            <div className='border-2 rounded-xl bg-card overflow-hidden'>
              <div className='flex flex-col aspect-square p-6'>
                <div className='flex items-center gap-2 border-b pb-3 mb-4'>
                  <span className='font-bold text-primary uppercase text-xl'>
                    Practice & Interview
                  </span>
                </div>

                <div className='flex-1 overflow-y-auto space-y-5'>
                  <div>
                    <h4 className='font-bold text-accent-foreground text-lg capitalize mb-2'>
                      Related Problems
                    </h4>
                    <ul className='list-none space-y-2'>
                      {practice.relatedProblems.map((item, i) => (
                        <li
                          key={i}
                          className='text-base px-2 border-l-4 border-primary capitalize font-semibold'
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className='font-bold text-accent-foreground text-lg capitalize mb-2'>
                      Self Check Questions
                    </h4>
                    <ul className='list-none space-y-2'>
                      {practice.selfCheckQuestions.map((item, i) => (
                        <li
                          key={i}
                          className='text-base px-2 border-l-4 border-primary capitalize font-semibold'
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <hr className='mt-6' />
                    <h4 className='font-bold text-accent-foreground text-lg capitalize mb-2 mt-6'>
                      Interview Follow-ups
                    </h4>
                    <ul className='list-none space-y-2'>
                      {practice.interviewFollowUps.map((item, i) => (
                        <li
                          key={i}
                          className='text-base px-2 border-l-4 border-primary capitalize font-semibold'
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </CarouselItem>

          {/* 3. CODE */}
          <CarouselItem>
            <div className='border-2 rounded-xl bg-[#0d1117] text-white overflow-hidden'>
              <div className='flex flex-col aspect-square'>
                <div className='p-4 border-b border-white/10 flex items-center justify-between'>
                  <div className='flex items-center gap-2'>
                    <Code2 className='w-5 h-5 text-emerald-400' />
                    <span className='font-bold text-regular uppercase'>
                      Extracted Code
                    </span>
                  </div>
                </div>
                <div className='flex-1 overflow-auto p-4'>
                  <pre className='text-regular font-mono leading-5 text-emerald-50'>
                    <code>{code.extracted}</code>
                  </pre>
                </div>
                <div className='flex gap-2 items-center py-3 text-sm justify-around'>
                  <div className='bg-emerald-500/20 text-emerald-400 font-bold px-2 py-1 rounded border border-emerald-500/30'>
                    TIME: {complexity.time}
                  </div>
                  <div className='bg-blue-500/20 text-blue-400 font-bold px-2 py-1 rounded border border-blue-500/30'>
                    SPACE: {complexity.space}
                  </div>
                </div>
              </div>
            </div>
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious className='-left-14 size-12' />
        <CarouselNext className='-right-14 size-12' />
      </Carousel>
    </div>
  );
};

export default SnippetAnalysisPanel;
