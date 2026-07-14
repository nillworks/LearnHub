export default function Loading() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center bg-surface dark:bg-dark-bg gap-4">
      {/* Spinner */}
      <div className="relative w-14 h-14">
        <div className="absolute inset-0 rounded-full border-4 border-primary/20" />
        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-primary animate-spin" />
      </div>
      <p className="text-text-secondary font-body text-sm animate-pulse">Loading, please wait…</p>
    </div>
  );
}
