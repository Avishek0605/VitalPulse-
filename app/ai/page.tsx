'use client';

import { useState } from 'react';

export default function AIPage() {
  const [message, setMessage] = useState('');
  const [reply, setReply] = useState('');
  const [loading, setLoading] = useState(false);

  const askAI = async () => {
    if (!message.trim()) return;
    setLoading(true);
    setReply('');

    try {
      const res = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message }),
      });

      const data = await res.json();
      setReply(data.reply || data.error || 'No response.');
    } catch {
      setReply('Request failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-semibold text-white">VitalPulse AI Assistant</h1>
      <p className="rounded-xl border border-yellow-500/40 bg-yellow-500/10 p-3 text-sm text-yellow-100">
        This assistant is for education only and is not a substitute for your treating doctor.
      </p>

      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Paste report text or ask your question..."
        className="min-h-36 w-full rounded-2xl border border-white/20 bg-white/5 p-4 text-white outline-none placeholder:text-soft"
      />

      <button
        onClick={askAI}
        disabled={loading}
        className="rounded-xl bg-teal px-4 py-2 font-medium text-navy disabled:opacity-60"
      >
        {loading ? 'Analyzing...' : 'Ask AI'}
      </button>

      {reply && (
        <div className="whitespace-pre-wrap rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white">
          {reply}
        </div>
      )}
    </section>
  );
}
