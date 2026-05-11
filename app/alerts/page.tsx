'use client';
import { useEffect, useState } from 'react';
import { AlertItem } from '@/lib/types';
export default function Alerts(){const [a,setA]=useState<AlertItem[]>([]); useEffect(()=>{fetch('/api/alerts').then(x=>x.json()).then(setA)},[]); return <div><h1>Alerts & Timeline</h1>{a.length===0?<p>✓ Everything is calm.</p>:a.map((x)=><div key={x.id} className='panel p-3 my-2'><b>{x.severity}</b> {x.message} <span className='text-soft text-xs'>{new Date(x.timestamp).toLocaleString()}</span></div>)}<p className='text-xs text-soft'>Code by Avishek Bag</p></div>}
