'use client';
import { Building2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Footer } from '@/components/layout/Footer';

export default function AdminLogin(){const r=useRouter();const [loading,setLoading]=useState(false);const submit=async()=>{setLoading(true);await new Promise(a=>setTimeout(a,1500));r.push('/admin')};return <div className='app-phone p-5'><div className='panel mb-3 bg-cyan-500/10 p-2 text-sm text-cyan-200'>🎯 Demo — Use any values to login</div><div className='text-center'><Building2 className='mx-auto text-[#00D4FF]'/><h1 className='text-2xl font-bold'>Hospital Admin Portal</h1><p className='text-soft'>Authorized hospital staff only</p></div><div className='mt-4 space-y-3'><input className='w-full rounded-xl border border-white/20 bg-[#071016] p-3' placeholder='HOSP-001'/><input className='w-full rounded-xl border border-white/20 bg-[#071016] p-3' placeholder='DR-ANJ-2024'/><input className='w-full rounded-xl border border-white/20 bg-[#071016] p-3' placeholder='Password' type='password'/><button onClick={()=>void submit()} className='w-full rounded-xl bg-[#00D4FF] p-3 font-semibold text-[#071016]'>{loading?'Logging in...':'Login to Admin Panel'}</button></div><Footer/></div>}
