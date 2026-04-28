/// Error view component for displaying error states.

interface ErrorViewProps {
  message: string;
  onRetry?: () => void;
}

export function ErrorView({ message, onRetry }: ErrorViewProps) {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center">
      <div className="mb-4 text-6xl">⚠️</div>
      <h3 className="mb-2 text-lg font-display font-semibold text-mystic-rose">Error</h3>
      <p className="mb-4 text-amber-200/70">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="rounded-lg bg-gradient-to-r from-gold-500 to-gold-600 px-4 py-2 text-cosmic-950 font-display font-semibold hover:scale-105 transition-transform"
        >
          Retry
        </button>
      )}
    </div>
  );
}
