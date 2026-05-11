'use client';

import { Heart, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';

export default function LoginPage() {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2>(1);
  const [abhaId, setAbhaId] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const refs = useRef<Array<HTMLInputElement | null>>([]);

  const verify = async () => {
    if (otp.join('').length < 6) return;
    setLoading(true);
    localStorage.setItem('vp_auth', 'true');
    localStorage.setItem('vp_patient_id', 'VP-2024-001');
    await new Promise((r) => setTimeout(r, 1500));
    router.push('/dashboard');
  };

  return <div className='mx-auto max-w-md rounded-2xl bg-[#0F2033] p-6 text-white shadow-2xl'>
    <div className='mb-3 rounded-lg bg-cyan-500/20 p-2 text-sm text-cyan-200'>Use any ABHA ID · OTP: 123456</div>
    <div className='mb-6 text-center'><Heart className='mx-auto text-cyan-400' /><h1 className='text-2xl font-bold'>VitalPulse</h1></div>
    {step === 1 ? <div className='space-y-3'><input value={abhaId} onChange={(e) => setAbhaId(e.target.value)} placeholder='12-3456-7890-1234' className='w-full rounded-xl border border-cyan-400/30 bg-[#0A1628] p-3' /><button className='w-full rounded-xl bg-cyan-400 p-3 font-semibold text-black' onClick={() => abhaId && setStep(2)}>Send OTP</button></div> : <div className='space-y-3'><div className='flex gap-2'>{otp.map((d, i) => <input key={i} ref={(el) => { refs.current[i] = el; }} value={d} maxLength={1} onChange={(e) => { const n=[...otp]; n[i]=e.target.value; setOtp(n); if (e.target.value && i<5) refs.current[i+1]?.focus(); }} className='h-12 w-12 rounded-xl border border-cyan-400/30 bg-[#0A1628] text-center text-lg' />)}</div><button onClick={() => void verify()} className='w-full rounded-xl bg-cyan-400 p-3 font-semibold text-black'>{loading ? <span className='inline-flex items-center gap-2'><Loader2 className='h-4 w-4 animate-spin' />Verifying...</span> : 'Verify & Login'}</button></div>}
  </div>;
}
