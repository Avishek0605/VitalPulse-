'use client';

import { Heart, Loader2, ArrowRight, ShieldCheck } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';

export default function LoginPage() {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2>(1);
  const [abhaId, setAbhaId] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleAbhaSubmit = () => {
    if (abhaId.trim().length < 10) {
      setError('Please enter a valid ABHA ID');
      return;
    }
    setError('');
    setStep(2);
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleVerify = async () => {
    const otpString = otp.join('');
    if (otpString.length < 6) {
      setError('Please enter the complete 6-digit OTP');
      return;
    }
    setLoading(true);
    setError('');
    // Simulate OTP verification (demo: any 6-digit OTP works)
    await new Promise((r) => setTimeout(r, 1500));
    localStorage.setItem('vp_auth', 'true');
    localStorage.setItem('vp_patient_id', 'VP-2024-001');
    router.push('/dashboard');
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0A1628] px-4">
      <div className="w-full max-w-md rounded-2xl bg-[#0F2033] p-6 shadow-2xl border border-cyan-400/10">
        {/* Header */}
        <div className="mb-6 text-center">
          <Heart className="mx-auto h-10 w-10 text-rose-400" />
          <h1 className="mt-3 text-2xl font-bold text-white">VitalPulse</h1>
          <p className="mt-1 text-sm text-[#A0AEC0]">
            {step === 1 ? 'Enter ABHA ID to access patient updates' : 'Enter the OTP sent to your registered mobile'}
          </p>
        </div>

        {/* Error message */}
        {error && (
          <div className="mb-4 rounded-lg bg-red-500/10 border border-red-400/30 p-3 text-sm text-red-300">
            {error}
          </div>
        )}

        {/* Step 1: ABHA ID */}
        {step === 1 && (
          <div className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-[#A0AEC0]">
                ABHA ID
              </label>
              <input
                type="text"
                value={abhaId}
                onChange={(e) => setAbhaId(e.target.value)}
                placeholder="e.g. 12-3456-7890-1234"
                className="w-full rounded-xl border border-cyan-400/20 bg-[#0A1628] px-4 py-3 text-white placeholder-gray-500 focus:border-cyan-400 focus:outline-none"
                onKeyDown={(e) => e.key === 'Enter' && handleAbhaSubmit()}
              />
            </div>
            <button
              onClick={handleAbhaSubmit}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-cyan-500 py-3 font-semibold text-black hover:bg-cyan-400 transition"
            >
              Send OTP <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        )}

        {/* Step 2: OTP */}
        {step === 2 && (
          <div className="space-y-4">
            <div className="flex justify-center gap-2">
              {otp.map((digit, i) => (
                <input
                  key={i}
                  ref={(el) => { otpRefs.current[i] = el; }}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(i, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(i, e)}
                  className="h-14 w-12 rounded-xl border border-cyan-400/20 bg-[#0A1628] text-center text-xl font-bold text-white focus:border-cyan-400 focus:outline-none"
                />
              ))}
            </div>
            <button
              onClick={handleVerify}
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-cyan-500 py-3 font-semibold text-black hover:bg-cyan-400 transition disabled:opacity-50"
            >
              {loading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <>
                  <ShieldCheck className="h-5 w-5" /> Verify OTP
                </>
              )}
            </button>
            <button
              onClick={() => { setStep(1); setError(''); setOtp(['', '', '', '', '', '']); }}
              className="w-full text-center text-sm text-cyan-400 hover:underline"
            >
              ← Change ABHA ID
            </button>
          </div>
        )}

        {/* Demo hint */}
        <p className="mt-4 text-center text-xs text-[#4A5A6A]">
          Demo: Any ABHA ID format works · OTP: any 6 digits
        </p>
      </div>
    </div>
  );
        }
