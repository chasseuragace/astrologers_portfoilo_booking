/// Empty view component for displaying empty states.

interface EmptyViewProps {
  message: string;
}

export function EmptyView({ message }: EmptyViewProps) {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center">
      <div className="mb-4 text-6xl">📭</div>
      <h3 className="mb-2 text-lg font-display font-semibold text-amber-200/60">No data</h3>
      <p className="text-amber-200/40">{message}</p>
    </div>
  );
}
