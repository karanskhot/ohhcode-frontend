import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Home() {
  return (
    <main className='max-w-full w-full h-[calc(100dvh-12rem)] border flex flex-col space-y-4'>
      {/* Hero Section */}
      <div className='border flex flex-col bg-accent items-center justify-center h-1/2'>
        <h1 className='text-8xl font-light text-secondary'>
          OhhCode<span className='text-primary'>.ai</span>
        </h1>
        <p></p>
        <Link href={'/get-started'}>
          <Button className='w-full rounded-none'>Get Started</Button>
        </Link>
      </div>
    </main>
  );
}
