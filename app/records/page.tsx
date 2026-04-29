'use client';

import { useEffect, useState } from 'react';
import { FileText } from 'lucide-react';
import { RecordItem } from '@/lib/types';

export default function RecordsPage() {
  const [records, setRecords] = useState<RecordItem[]>([]);

  useEffect(() => {
    const load = async () => {
      const res = await fetch('/api/records?patientId=P001', { cache: 'no-store' });
      const data = (await res.json()) as RecordItem[];
      setRecords(data);
    };
    void load();
  }, []);

  return (
    <div>
      <h1 className="mb-4 text-xl font-semibold">Medical Records</h1>
      {records.length === 0 ? (
        <div className="panel p-5 text-sm text-soft">No records published yet.</div>
      ) : (
        <div className="space-y-3">
          {records.map((record) => (
            <article key={record.id} className="panel p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm">
                  <FileText className="h-4 w-4 text-teal" /> {record.title}
                </div>
                <a href={record.file_url} className="text-sm text-teal">View</a>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
