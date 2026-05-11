'use client';

import { FormEvent, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2>(1);
  const [abhaId, setAbhaId] = useState('');
  const [otp, setOtp] = useState('');
  const [sendingOtp, setSendingOtp] = useState(false);
  const [verifyingOtp, setVerifyingOtp] = useState(false);
  const [error, setError] = useState('');

  const sanitizedOtp = useMemo(() => otp.replace(/\D/g, '').slice(0, 6), [otp]);
  const canSendOtp = abhaId.trim().length >= 8;
  const canVerifyOtp = sanitizedOtp.length === 6;

  const handleSendOtp = async (event: FormEvent) => {
    event.preventDefault();
    setError('');

    if (!canSendOtp) {
      setError('Please enter a valid ABHA ID.');
      return;
    }

    setSendingOtp(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    setSendingOtp(false);
    setStep(2);
  };

  const handleVerifyOtp = async (event: FormEvent) => {
    event.preventDefault();
    setError('');

    if (!canVerifyOtp) {
      setError('Please enter a valid 6-digit OTP.');
      return;
    }

    setVerifyingOtp(true);
    await new Promise((resolve) => setTimeout(resolve, 500));

    localStorage.setItem('vp_auth', 'true');
    localStorage.setItem('vp_patient_id', 'VP-2024-001');

    router.replace('/dashboard');
  };

  return (
    <main className='min-h-screen bg-[#0A1628] text-white'>
      <div className='mx-auto flex min-h-screen w-full max-w-md items-center px-5'>
        <div className='w-full rounded-2xl border border-cyan-400/20 bg-[#0F2033] p-6 shadow-lg shadow-cyan-900/20'>
          <h1 className='text-2xl font-bold text-cyan-300'>VitalPulse Login</h1>
          <p className='mt-2 text-sm text-[#9FB3C8]'>
            Secure access via ABHA ID and one-time password.
          </p>

          {step === 1 ? (
            <form className='mt-6 space-y-4' onSubmit={handleSendOtp}>
              <div>
                <label htmlFor='abha-id' className='mb-2 block text-sm font-medium text-cyan-200'>
                  ABHA ID
                </label>
                <input
                  id='abha-id'
                  type='text'
                  inputMode='text'
                  placeholder='12-3456-7890-1234'
                  value={abhaId}
                  onChange={(e) => setAbhaId(e.target.value)}
                  className='w-full rounded-xl border border-cyan-400/30 bg-[#0A1628] px-4 py-3 text-white placeholder:text-[#6E8297] outline-none ring-cyan-400 transition focus:ring-2'
                />
              </div>

              {error ? <p className='text-sm text-red-300'>{error}</p> : null}

              <button
                type='submit'
                disabled={!canSendOtp || sendingOtp}
                className='w-full rounded-xl bg-cyan-400 px-4 py-3 font-semibold text-[#06101D] transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:bg-cyan-700'
              >
                {sendingOtp ? 'Sending OTP...' : 'Send OTP'}
              </button>
            </form>
          ) : (
            <form className='mt-6 space-y-4' onSubmit={handleVerifyOtp}>
              <div>
                <p className='mb-2 text-sm text-[#9FB3C8]'>
                  OTP sent to ABHA ID <span className='font-semibold text-cyan-200'>{abhaId}</span>
                </p>
                <label htmlFor='otp' className='mb-2 block text-sm font-medium text-cyan-200'>
                  Enter 6-digit OTP
                </label>
                <input
                  id='otp'
                  type='text'
                  inputMode='numeric'
                  pattern='[0-9]*'
                  placeholder='123456'
                  value={sanitizedOtp}
                  onChange={(e) => setOtp(e.target.value)}
                  className='w-full rounded-xl border border-cyan-400/30 bg-[#0A1628] px-4 py-3 text-white placeholder:text-[#6E8297] outline-none ring-cyan-400 transition focus:ring-2'
                />
              </div>

              {error ? <p className='text-sm text-red-300'>{error}</p> : null}

              <div className='grid grid-cols-2 gap-3'>
                <button
                  type='button'
                  onClick={() => {
                    setStep(1);
                    setOtp('');
                    setError('');
                  }}
                  className='rounded-xl border border-cyan-400/30 px-4 py-3 font-medium text-cyan-200 transition hover:bg-cyan-500/10'
                >
                  Back
                </button>
                <button
                  type='submit'
                  disabled={!canVerifyOtp || verifyingOtp}
                  className='rounded-xl bg-cyan-400 px-4 py-3 font-semibold text-[#06101D] transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:bg-cyan-700'
                >
                  {verifyingOtp ? 'Verifying...' : 'Verify OTP'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </main>
  );
}
