/// Confirmation dialog component for destructive actions.

interface ConfirmationDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmationDialog({
  isOpen,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  onConfirm,
  onCancel,
}: ConfirmationDialogProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl bg-cosmic-800 border border-gold-400/20 p-6 shadow-2xl">
        <h3 className="mb-2 text-lg font-display font-bold text-amber-100">{title}</h3>
        <p className="mb-6 text-amber-200/70">{message}</p>
        <div className="flex justify-end space-x-3">
          <button
            onClick={onCancel}
            className="rounded-lg border border-gold-400/30 px-4 py-2 text-amber-100 hover:bg-gold-400/10 transition-colors"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className="rounded-lg bg-gradient-to-r from-mystic-rose to-red-700 px-4 py-2 text-amber-100 hover:opacity-90 transition-opacity"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
