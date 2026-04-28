/// List page for Service.
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useServiceList, useServiceMutations } from '../hooks/service.hooks';
import { ErrorView } from '../../../../core/components/error-view';
import { EmptyView } from '../../../../core/components/empty-view';
import { ServiceItemRow } from '../components/service-item-row';
import { ServiceFormDialog } from '../components/service-form-dialog';

export function ServiceListPage() {
  const navigate = useNavigate();
  const { data, isLoading, error, refetch } = useServiceList();
  const { add, delete: deleteMutation } = useServiceMutations();
  const [isFormOpen, setIsFormOpen] = React.useState(false);

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this Service?')) {
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
    return <EmptyView message="No Services yet" />;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Services</h1>
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
            Add Service
          </button>
        </div>
      </div>

      <div className="space-y-2">
        {data.map((item) => (
          <ServiceItemRow
            key={item.id}
            item={item}
            onView={() => navigate(`/service/${item.id}`)}
            onDelete={() => handleDelete(item.id)}
          />
        ))}
      </div>

      {isFormOpen && (
        <ServiceFormDialog
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
