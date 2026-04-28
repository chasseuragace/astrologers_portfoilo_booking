/// Details page for Booking.
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useBookingById, useBookingMutations } from '../hooks/booking.hooks';
import { ErrorView } from '../../../../core/components/error-view';
import { BookingFormDialog } from '../components/booking-form-dialog';

export function BookingDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data, isLoading, error, refetch } = useBookingById(id || '');
  const { update, delete: deleteMutation } = useBookingMutations();
  const [isFormOpen, setIsFormOpen] = React.useState(false);

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this Booking?')) {
      deleteMutation.mutate(id || '', {
        onSuccess: () => navigate('/booking'),
      });
    }
  };

  if (isLoading) {
    return <div className="flex justify-center p-8">Loading...</div>;
  }

  if (error) {
    return <ErrorView message={error.message} onRetry={() => refetch()} />;
  }

  if (!data) {
    return <div className="p-8 text-center">Booking not found</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4">
        <button
          onClick={() => navigate('/booking')}
          className="text-blue-500 hover:underline"
        >
          ← Back to list
        </button>
      </div>

      <div className="rounded border p-6">
        <h1 className="mb-4 text-2xl font-bold">{data.name || 'Unnamed Booking'}</h1>
        
        <div className="space-y-2">
          <div>
            <span className="font-semibold">ID:</span> {data.id}
          </div>
          {data.description && (
            <div>
              <span className="font-semibold">Description:</span> {data.description}
            </div>
          )}
          {data.createdAt && (
            <div>
              <span className="font-semibold">Created:</span> {data.createdAt.toLocaleString()}
            </div>
          )}
          {data.updatedAt && (
            <div>
              <span className="font-semibold">Updated:</span> {data.updatedAt.toLocaleString()}
            </div>
          )}
        </div>

        <div className="mt-6 space-x-2">
          <button
            onClick={() => setIsFormOpen(true)}
            className="rounded border px-4 py-2 hover:bg-gray-100"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </div>

      {isFormOpen && data && (
        <BookingFormDialog
          isOpen={isFormOpen}
          entity={data}
          onClose={() => setIsFormOpen(false)}
          onSave={(entity) => {
            update.mutate(entity);
            setIsFormOpen(false);
          }}
        />
      )}
    </div>
  );
}
