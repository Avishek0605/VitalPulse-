'use client';

import { useEffect, useState } from 'react';
import { Bell } from 'lucide-react';
import { AlertItem } from '@/lib/types';

const severityStyle: Record<AlertItem['severity'], string> = {
  info: 'border-white/20',
  warning: 'border-warning/40',
  critical: 'border-critical/40',
};

export default function AlertsPage() {
  const [alerts, setAlerts] = useState<AlertItem[]>([]);

  useEffect(() => {
    const load = async () => {
      const res = await fetch('/api/alerts?patientId=P001', { cache: 'no-store' });
      const data = (await res.json()) as AlertItem[];
      setAlerts(data);
    };
    void load();
    const timer = setInterval(load, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div>
      <h1 className="mb-4 text-xl font-semibold">Alerts Timeline</h1>
      {alerts.length === 0 ? (
        <div className="panel p-5 text-sm text-soft">No alerts yet. Family will see updates once events occur.</div>
      ) : (
        <div className="space-y-3">
          {alerts.map((alert) => (
            <article key={alert.id} className={`panel border p-4 ${severityStyle[alert.severity]}`}>
              <div className="flex items-center gap-2 text-xs text-soft"><Bell className="h-3 w-3" />{new Date(alert.timestamp).toLocaleString()}</div>
              <p className="mt-1 text-sm">{alert.message}</p>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
