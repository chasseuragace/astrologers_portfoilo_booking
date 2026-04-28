/// Item row component for Booking list.
import type { BookingEntity } from '../../domain/entities/booking.entity';

interface BookingItemRowProps {
  item: BookingEntity;
  onView: () => void;
  onDelete: () => void;
}

export function BookingItemRow({ item, onView, onDelete }: BookingItemRowProps) {
  return (
    <div className="flex items-center justify-between rounded border p-4 hover:bg-gray-50">
      <div className="flex-1">
        <h3 className="font-semibold">{item.name || 'Unnamed Booking'}</h3>
        {item.description && (
          <p className="text-sm text-gray-600">{item.description}</p>
        )}
      </div>
      <div className="space-x-2">
        <button
          onClick={onView}
          className="rounded border px-3 py-1 text-sm hover:bg-gray-100"
        >
          View
        </button>
        <button
          onClick={onDelete}
          className="rounded border border-red-500 px-3 py-1 text-sm text-red-500 hover:bg-red-50"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
