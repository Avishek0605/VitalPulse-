export function LoadingSkeleton() {
  return (
    <div className="space-y-3 animate-pulse">
      <div className="h-28 rounded-2xl bg-white/10" />
      <div className="grid grid-cols-2 gap-3">
        <div className="h-20 rounded-2xl bg-white/10" />
        <div className="h-20 rounded-2xl bg-white/10" />
      </div>
      <div className="h-24 rounded-2xl bg-white/10" />
    </div>
  );
}
