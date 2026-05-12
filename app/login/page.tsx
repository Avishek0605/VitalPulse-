'use client';
export const dynamic = 'force-dynamic';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LoginPage() {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2>(1);
  const [abhaId, setAbhaId] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);

  const onOtpChange = (index: number, value: string) => {
    const digit = value.replace(/\D/g, '').slice(-1);
    setOtp((prev) => {
      const next = [...prev];
      next[index] = digit;
      return next;
    });
  };

  const verify = async () => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    if (typeof window !== 'undefined') {
      localStorage.setItem('vp_auth', 'true');
      localStorage.setItem('vp_patient_id', 'VP-2024-001');
    }
    router.push('/dashboard');
  };

  return (
    <main className='min-h-screen bg-[#0A1628] text-white'>
      <div className='mx-auto flex min-h-screen w-full max-w-md items-center px-5'>
        <div className='w-full rounded-2xl bg-[#0F2033] p-6'>
          <h1 className='text-2xl font-bold text-cyan-400'>VitalPulse Login</h1>
          <p className='mt-2 text-sm text-[#A0AEC0]'>Use any ABHA ID · OTP: 123456</p>

          {step === 1 ? (
            <div className='mt-6 space-y-4'>
              <input
                value={abhaId}
                onChange={(e) => setAbhaId(e.target.value)}
                placeholder='12-3456-7890-1234'
                className='w-full rounded-xl border border-cyan-400/30 bg-[#0A1628] px-4 py-3 outline-none focus:ring-2 focus:ring-cyan-400'
              />
              <button
                onClick={() => setStep(2)}
                className='w-full rounded-xl bg-cyan-400 px-4 py-3 font-semibold text-[#06101D]'
              >
                Send OTP
              </button>
            </div>
          ) : (
            <div className='mt-6 space-y-4'>
              <div className='flex gap-2'>
                {otp.map((digit, idx) => (
                  <input
                    key={idx}
                    value={digit}
                    onChange={(e) => onOtpChange(idx, e.target.value)}
                    maxLength={1}
                    inputMode='numeric'
                    className='h-12 w-12 rounded-lg border border-cyan-400/30 bg-[#0A1628] text-center text-xl outline-none focus:ring-2 focus:ring-cyan-400'
                  />
                ))}
              </div>
              <div className='grid grid-cols-2 gap-3'>
                <button onClick={() => setStep(1)} className='rounded-xl border border-cyan-400/30 px-4 py-3 text-cyan-400'>Back</button>
                <button onClick={verify} className='rounded-xl bg-cyan-400 px-4 py-3 font-semibold text-[#06101D]'>Verify OTP</button>
              </div>
            </div>
          )}

          {loading ? <div className='mt-4 flex items-center gap-2 text-cyan-300'><div className='h-4 w-4 animate-spin rounded-full border-2 border-cyan-300 border-t-transparent' />Verifying...</div> : null}
        </div>
      </div>
    </main>
  );
}
