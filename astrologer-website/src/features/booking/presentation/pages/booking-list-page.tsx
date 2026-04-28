/// List page for Booking.
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useBookingList, useBookingMutations } from '../hooks/booking.hooks';
import { ErrorView } from '../../../../core/components/error-view';
import { EmptyView } from '../../../../core/components/empty-view';
import { BookingItemRow } from '../components/booking-item-row';
import { BookingFormDialog } from '../components/booking-form-dialog';

export function BookingListPage() {
  const navigate = useNavigate();
  const { data, isLoading, error, refetch } = useBookingList();
  const { add, delete: deleteMutation } = useBookingMutations();
  const [isFormOpen, setIsFormOpen] = React.useState(false);

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this Booking?')) {
      deleteMutation.mutate(id);
    }
  };

  if (isLoading) {
    return <div className="flex justify-center p-8">Loading...</div>;
  }

  if (error) {
    return <ErrorView message={error.message} onRetry={() => refetch()} />;
  }

  if (!data || data.length === 0) {
    return <EmptyView message="No Bookings yet" />;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Bookings</h1>
        <div className="space-x-2">
          <button
            onClick={() => refetch()}
            className="rounded border px-4 py-2 hover:bg-gray-100"
          >
            Refresh
          </button>
          <button
            onClick={() => setIsFormOpen(true)}
            className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          >
            Add Booking
          </button>
        </div>
      </div>

      <div className="space-y-2">
        {data.map((item) => (
          <BookingItemRow
            key={item.id}
            item={item}
            onView={() => navigate(`/booking/${item.id}`)}
            onDelete={() => handleDelete(item.id)}
          />
        ))}
      </div>

      {isFormOpen && (
        <BookingFormDialog
          isOpen={isFormOpen}
          onClose={() => setIsFormOpen(false)}
          onSave={(entity) => {
            add.mutate(entity);
            setIsFormOpen(false);
          }}
        />
      )}
    </div>
  );
}
