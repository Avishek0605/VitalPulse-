'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { isDemoLoggedIn, setDemoLoggedIn } from '@/lib/demo-auth';
import { useRouter } from 'next/navigation';
import { Patient } from '@/lib/types';

export default function Dashboard(){const [p,setP]=useState<Patient|null>(null); const r=useRouter();
const load=()=>fetch('/api/vitals').then(x=>x.json()).then(setP);
useEffect(()=>{if(!isDemoLoggedIn()) r.replace('/login'); load(); const t=setInterval(load,5000); return ()=>clearInterval(t);},[r]);
if(!p) return <div>Loading...</div>;
return <div className='space-y-4'><div className='flex justify-between'><b>VitalPulse</b><div className='flex gap-2'><button>🔔</button><button onClick={()=>{setDemoLoggedIn(false);r.push('/login')}}>Logout</button></div></div><div><h2>Good morning, Priya 👋</h2><p className='text-soft'>Monitoring: Ramesh Kumar · Father</p></div><div className='panel p-4'><p>{p.name} · {p.age} · {p.ward} Bed {p.bed} · {p.doctor}</p><p className='capitalize'>{p.status}</p><p className='text-sm'>LIVE · Updated 5 seconds ago</p></div><div className='grid grid-cols-2 gap-3'>{[['Heart Rate',p.vitals.heartRate+' bpm'],['SpO2',p.vitals.spo2+'%'],['Blood Pressure',`${p.vitals.systolic}/${p.vitals.diastolic}`],['Temperature',p.vitals.temperature+'°F']].map(v=><div key={String(v)} className='panel p-3 border-t-2 border-teal'><p className='text-soft text-sm'>{v[0]}</p><p>{v[1]}</p></div>)}</div><div className='panel p-3'>Respiratory Rate: {p.vitals.respiratoryRate}</div><div className='panel p-3'>VitalPulse AI: Patient is stable. No immediate concern.</div><Link href='/alerts'>View all alerts</Link><div className='fixed bottom-0 left-0 right-0 bg-[#0F2033] p-2 flex justify-around text-sm'><Link href='/dashboard'>Dashboard</Link><Link href='/alerts'>Alerts</Link><Link href='/records'>Records</Link><Link href='/chat'>AI Chat</Link></div><p className='text-xs text-soft pt-16'>Code by Avishek Bag</p></div>}
