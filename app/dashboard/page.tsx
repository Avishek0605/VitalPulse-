'use client';
import Link from 'next/link';
import { Bell, MessageCircle, FileText, AlertTriangle, LayoutGrid } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { isDemoLoggedIn } from '@/lib/demo-auth';
import { Patient } from '@/lib/types';

export default function Dashboard(){
  const [p,setP]=useState<Patient|null>(null); const r=useRouter();
  const load=()=>fetch('/api/vitals').then(x=>x.json()).then(setP);
  useEffect(()=>{if(!isDemoLoggedIn()) r.replace('/login'); load(); const t=setInterval(load,5000); return ()=>clearInterval(t)},[r]);
  if(!p) return <div className='app-phone p-6'>Loading...</div>;
  return <div className='app-phone p-4 pb-20 space-y-3'>
    <div className='flex justify-between items-center'><div><p className='font-semibold'>Good Morning, Priya 👋</p><p className='text-soft text-xs'>Monitoring: Ramesh Kumar · Father</p></div><Bell className='text-teal'/></div>
    <div className='panel p-3 text-xs text-teal'>● LIVE · Last updated 5 seconds ago · ICU-4 Ward 7</div>
    <div className='grid grid-cols-2 gap-3'>
      <div className='panel p-3 border-t-2 border-red-400'><p className='text-soft text-xs'>Heart Rate</p><p className='text-3xl font-bold'>{p.vitals.heartRate}</p><p className='text-red-300 text-xs'>bpm</p></div>
      <div className='panel p-3 border-t-2 border-cyan-400'><p className='text-soft text-xs'>SpO₂</p><p className='text-3xl font-bold'>{p.vitals.spo2}</p><p className='text-cyan-300 text-xs'>%</p></div>
      <div className='panel p-3 border-t-2 border-amber-400'><p className='text-soft text-xs'>Blood Pressure</p><p className='text-3xl font-bold'>{p.vitals.systolic}/{p.vitals.diastolic}</p><p className='text-amber-300 text-xs'>mmHg</p></div>
      <div className='panel p-3 border-t-2 border-purple-400'><p className='text-soft text-xs'>Temperature</p><p className='text-3xl font-bold'>{p.vitals.temperature}</p><p className='text-purple-300 text-xs'>°F</p></div>
    </div>
    <div className='panel p-3'><p className='text-soft text-xs'>AI Health Update</p><p className='text-sm'>Patient appears stable with normal vitals. No immediate concern right now.</p></div>
    <div className='fixed bottom-0 left-0 right-0 mx-auto max-w-md bg-[#0a2035] border-t border-cyan-400/20 p-2 flex justify-around text-xs'>
      <Link href='/dashboard' className='grid justify-items-center text-teal'><LayoutGrid size={16}/>Dashboard</Link><Link href='/alerts' className='grid justify-items-center'><AlertTriangle size={16}/>Alerts</Link><Link href='/chat' className='grid justify-items-center'><MessageCircle size={16}/>AI Chat</Link><Link href='/records' className='grid justify-items-center'><FileText size={16}/>Records</Link>
    </div>
  </div>
}
