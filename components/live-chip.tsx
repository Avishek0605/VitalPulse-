import { Radio } from 'lucide-react';
import { timeAgo } from '@/lib/utils';

export function LiveChip({ updatedAt }: { updatedAt: string }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-teal/30 bg-teal/10 px-3 py-1 text-xs text-teal">
      <Radio className="h-3 w-3" /> Updated {timeAgo(updatedAt)}
    </div>
  );
}
