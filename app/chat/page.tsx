'use client';
import { Bot, SendHorizontal } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

type Msg={role:'u'|'ai';text:string;time:string};
export default function Chat(){
  const [lang,setLang]=useState('বাংলা');const [text,setText]=useState('');const [msgs,setMsgs]=useState<Msg[]>([{role:'ai',text:'নমস্কার! আমি VitalPulse AI। যেকোনো রিপোর্ট সহজ করে বুঝিয়ে দেব।',time:new Date().toLocaleTimeString()}]);
  const send=async()=>{if(!text.trim())return;const hist: Msg[]=[...msgs,{role:'u' as const,text,time:new Date().toLocaleTimeString()}];setMsgs(hist);setText('');const res=await fetch('/api/chat',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({message:text,history:hist,language:lang})});const d=await res.json();setMsgs(v=>[...v,{role:'ai',text:d.reply,time:new Date().toLocaleTimeString()}]);};
  return <div className='app-phone p-4 pb-20'><div className='flex items-center justify-between'><div className='flex items-center gap-2'><Bot className='text-teal'/><h1 className='font-semibold'>VitalPulse AI</h1></div><div className='flex gap-1 text-xs'>{['EN','বাংলা','हिंदी'].map(l=><button key={l} onClick={()=>setLang(l)} className={`px-2 py-1 rounded-full ${lang===l?'bg-teal text-[#05233b]':'panel'}`}>{l}</button>)}</div></div><div className='mt-3 h-[62vh] overflow-y-auto space-y-2'>{msgs.map((m,i)=><div key={i} className={m.role==='ai'?'panel border-l-2 border-l-teal p-2 text-sm':'ml-10 rounded-xl bg-cyan-400/20 p-2 text-sm'}>{m.text}<p className='text-[10px] text-soft mt-1'>{m.time}</p></div>)}</div><div className='mt-2 flex gap-2'><input value={text} onChange={e=>setText(e.target.value)} placeholder='Ask anything or paste a report...' className='flex-1 rounded-xl bg-[#0a2035] border border-cyan-400/30 p-3 text-sm'/><button onClick={()=>void send()} className='rounded-xl bg-teal text-[#05233b] px-3'><SendHorizontal size={16}/></button></div><Link href='/dashboard' className='text-xs text-soft mt-3 inline-block'>← Back to Dashboard</Link></div>
}
