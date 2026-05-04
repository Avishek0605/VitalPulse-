'use client';
import { Footer } from '@/components/layout/Footer';
import { BottomNav } from '@/components/layout/BottomNav';
import { TopBar } from '@/components/layout/TopBar';
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
    <TopBar /><div><p className='font-semibold'>Good Morning, Priya 👋</p><p className='text-soft text-xs'>Monitoring: Ramesh Kumar · Father</p></div>
    <div className='panel p-3 text-xs text-teal'>● LIVE · Last updated 5 seconds ago · ICU-4 Ward 7</div>
    <div className='grid grid-cols-2 gap-3'>
      <div className='panel p-3 border-t-2 border-red-400'><p className='text-soft text-xs'>Heart Rate</p><p className='text-3xl font-bold'>{p.vitals.heartRate}</p><p className='text-red-300 text-xs'>bpm</p></div>
      <div className='panel p-3 border-t-2 border-cyan-400'><p className='text-soft text-xs'>SpO₂</p><p className='text-3xl font-bold'>{p.vitals.spo2}</p><p className='text-cyan-300 text-xs'>%</p></div>
      <div className='panel p-3 border-t-2 border-amber-400'><p className='text-soft text-xs'>Blood Pressure</p><p className='text-3xl font-bold'>{p.vitals.systolic}/{p.vitals.diastolic}</p><p className='text-amber-300 text-xs'>mmHg</p></div>
      <div className='panel p-3 border-t-2 border-purple-400'><p className='text-soft text-xs'>Temperature</p><p className='text-3xl font-bold'>{p.vitals.temperature}</p><p className='text-purple-300 text-xs'>°F</p></div>
    </div>
    <div className='panel p-3'><p className='text-soft text-xs'>AI Health Update</p><p className='text-sm'>Patient appears stable with normal vitals. No immediate concern right now.</p></div>
    <Footer/>
    <BottomNav active='home' />

  </div>
}
