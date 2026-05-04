'use client';
import { Heart } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { setDemoLoggedIn } from '@/lib/demo-auth';
import Link from 'next/link';
import { Footer } from '@/components/layout/Footer';

export default function Login() {
  const r = useRouter();
  const [step, setStep] = useState<1|2>(1);
  const [abdm, setAbdm] = useState('VP-2024-00847');
  const [otp, setOtp] = useState(['','','','','','']);
  const [loading, setLoading] = useState(false);

  const verify = async () => { setLoading(true); await new Promise(a=>setTimeout(a,1500)); setDemoLoggedIn(true); r.push('/dashboard'); };

  return <div className='app-phone p-5 min-h-[88vh]'>
    <div className='grid place-items-center py-5'><div className='grid h-16 w-16 place-items-center rounded-full border border-cyan-400/30 bg-cyan-400/10'><Heart className='text-teal'/></div><h1 className='text-3xl font-bold mt-3'>VitalPulse</h1><p className='text-soft text-sm'>Real-time care. Every family. Every language.</p></div>
    {step===1 ? <div className='space-y-3'><h2 className='text-xl font-semibold'>Welcome back</h2><p className='text-soft text-sm'>Enter your ABDM Health ID</p><input className='w-full rounded-xl border border-cyan-400/30 bg-[#0a2035] p-3' value={abdm} onChange={e=>setAbdm(e.target.value)} /><button className='w-full rounded-xl bg-teal py-3 font-semibold text-[#05233b]' onClick={()=>setStep(2)}>Send OTP</button></div> : <div className='space-y-3'><h2 className='text-xl font-semibold'>Enter OTP</h2><p className='text-soft text-sm'>6-digit code sent to ••••••7890</p><div className='flex gap-2'>{otp.map((v,i)=><input key={i} maxLength={1} value={v} onChange={e=>{const n=[...otp];n[i]=e.target.value;setOtp(n);}} className='h-12 w-12 rounded-xl border border-cyan-400/30 bg-[#0a2035] text-center text-lg'/>)}</div><button className='w-full rounded-xl bg-teal py-3 font-semibold text-[#05233b]' onClick={()=>void verify()}>{loading?'Connecting...':'Verify & Connect'}</button></div>}
    <div className='mt-6 text-center text-xs text-soft'>Demo mode: any ABDM ID + any 6-digit OTP</div>
    <div className='mt-4 text-center text-sm'><Link href='/admin/login' className='text-[#00D4FF]'>Hospital Admin? Login here →</Link></div><Footer />
  </div>;
}
