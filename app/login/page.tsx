'use client';

import { Loader2, ShieldCheck } from 'lucide-react';
import { FormEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { setDemoLoggedIn } from '@/lib/demo-auth';
import { Toast } from '@/components/toast';

export default function LoginPage() {
  const [abdmId, setAbdmId] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState<1 | 2>(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [toast, setToast] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (toast) {
      const t = setTimeout(() => setToast(''), 1800);
      return () => clearTimeout(t);
    }
  }, [toast]);

  const sendOtp = async (e: FormEvent) => {
    e.preventDefault();
    if (!abdmId.trim()) {
      setError('Please enter your ABDM ID.');
      return;
    }
    setError('');
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1100));
    setLoading(false);
    setStep(2);
  };

  const verifyOtp = async (e: FormEvent) => {
    e.preventDefault();
    if (!otp.trim()) {
      setError('Please enter OTP to continue.');
      return;
    }
    setError('');
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1400));
    setDemoLoggedIn(true);
    setToast('Welcome to VitalPulse');
    setLoading(false);
    router.push('/dashboard');
  };

  return (
    <div className="mx-auto flex min-h-[80vh] max-w-5xl items-center justify-center rounded-3xl bg-[#091425] p-6">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-surface p-8 shadow-2xl">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-semibold text-teal">VitalPulse</h1>
          <p className="mt-2 text-sm text-soft">Monitor your loved one&apos;s health in real-time</p>
        </div>

        {step === 1 ? (
          <form onSubmit={sendOtp} className="space-y-4">
            <input
              value={abdmId}
              onChange={(e) => setAbdmId(e.target.value)}
              className="w-full rounded-xl border border-white/20 bg-[#07101d] px-4 py-3 text-white outline-none focus:ring-2 focus:ring-teal"
              placeholder="Enter ABDM ID (e.g. ABHA12345678)"
            />
            <button disabled={loading} className="flex w-full items-center justify-center gap-2 rounded-xl bg-teal px-4 py-3 font-medium text-navy disabled:opacity-70">
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <ShieldCheck className="h-4 w-4" />} Send OTP
            </button>
          </form>
        ) : (
          <form onSubmit={verifyOtp} className="space-y-4">
            <input
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              maxLength={6}
              className="w-full rounded-xl border border-white/20 bg-[#07101d] px-4 py-3 text-white outline-none focus:ring-2 focus:ring-teal"
              placeholder="Enter OTP"
            />
            <button disabled={loading} className="flex w-full items-center justify-center gap-2 rounded-xl bg-teal px-4 py-3 font-medium text-navy disabled:opacity-70">
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null} Verify &amp; Continue
            </button>
          </form>
        )}

        {error && <p className="mt-3 text-sm text-critical">{error}</p>}
      </div>
      <Toast message={toast} />
    </div>
  );
}
