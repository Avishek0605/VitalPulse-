import Link from 'next/link';
import { HeartPulse } from 'lucide-react';

export default function Landing() {
  return <div className='space-y-10'>
    <nav className='flex justify-between items-center'><div className='flex items-center gap-2 text-teal font-semibold'><HeartPulse/>VitalPulse</div><div className='flex gap-2'><Link href='/login' className='rounded-xl border px-3 py-2'>Family Login</Link><Link href='/admin-login' className='rounded-xl bg-teal text-navy px-3 py-2'>Hospital Admin</Link></div></nav>
    <section className='panel p-6'><h1 className='text-4xl font-semibold'>Know your family member is okay. Every moment.</h1><p className='text-soft mt-2'>Real-time vitals. AI explanation. Your language.</p><div className='mt-4 flex gap-2'><Link href='/login' className='rounded-xl bg-teal text-navy px-4 py-2'>Family Login</Link><Link href='/dashboard' className='rounded-xl border px-4 py-2'>View Demo</Link></div></section>
    <footer className='text-center text-soft text-sm'>VitalPulse · Healthcare Technology · India<br/>Code by Avishek Bag</footer>
  </div>;
}
