'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AppShellHeader } from '@/components/app-shell-header';
import { isDemoLoggedIn } from '@/lib/demo-auth';
import { Loader2 } from 'lucide-react';

type Msg = { role: 'user' | 'ai'; text: string };

export default function ChatPage() {
  const router = useRouter();
  const [messages, setMessages] = useState<Msg[]>([{ role: 'ai', text: 'Welcome. Ask anything about the patient status.' }]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [lang, setLang] = useState('EN');

  useEffect(() => {
    if (!isDemoLoggedIn()) router.replace('/login');
  }, [router]);

  const send = async (text = input) => {
    if (!text.trim()) return;
    setMessages((prev) => [...prev, { role: 'user', text }]);
    setInput('');
    setTyping(true);
    await new Promise((r) => setTimeout(r, 1000));
    const dummy = ['Patient is stable.', 'Vitals are within normal range.', 'No acute distress indicators detected.'];
    setMessages((prev) => [...prev, { role: 'ai', text: dummy[Math.floor(Math.random() * dummy.length)] }]);
    setTyping(false);
  };

  return (
    <div className="space-y-4">
      <AppShellHeader />
      <div className="panel rounded-2xl p-4">
        <div className="mb-3 flex gap-2 text-sm">
          {['EN', 'বাংলা', 'हिंदी'].map((l) => (
            <button key={l} onClick={() => setLang(l)} className={`rounded-lg px-3 py-1 ${lang === l ? 'bg-teal text-navy' : 'border border-white/20'}`}>{l}</button>
          ))}
        </div>
        <div className="mb-4 h-[52vh] space-y-3 overflow-y-auto rounded-xl border border-white/10 bg-[#07101d] p-3">
          {messages.map((m, i) => (
            <div key={i} className={`max-w-[80%] rounded-xl px-3 py-2 text-sm ${m.role === 'ai' ? 'bg-teal/20 text-white' : 'ml-auto bg-white/10 text-white'}`}>
              {m.text}
            </div>
          ))}
          {typing && (
            <div className="inline-flex items-center gap-2 rounded-xl bg-teal/20 px-3 py-2 text-sm">
              <Loader2 className="h-3 w-3 animate-spin" /> AI typing...
            </div>
          )}
        </div>
        <div className="flex gap-2">
          <button onClick={() => setInput('CBC normal, SpO2 98, temp 98.6') } className="rounded-lg border border-white/20 px-3 py-2 text-xs">Paste Report</button>
          <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask anything or paste report..." className="flex-1 rounded-lg border border-white/20 bg-transparent px-3 py-2" />
          <button onClick={() => void send()} className="rounded-lg bg-teal px-4 py-2 font-medium text-navy">Send</button>
        </div>
      </div>
    </div>
  );
}
