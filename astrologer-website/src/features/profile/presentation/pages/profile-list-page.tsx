/// List page for Profile.
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useProfileList, useProfileMutations } from '../hooks/profile.hooks';
import { ErrorView } from '../../../../core/components/error-view';
import { EmptyView } from '../../../../core/components/empty-view';
import { ProfileItemRow } from '../components/profile-item-row';
import { ProfileFormDialog } from '../components/profile-form-dialog';

export function ProfileListPage() {
  const navigate = useNavigate();
  const { data, isLoading, error, refetch } = useProfileList();
  const { add, delete: deleteMutation } = useProfileMutations();
  const [isFormOpen, setIsFormOpen] = React.useState(false);

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this Profile?')) {
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
    return <EmptyView message="No Profiles yet" />;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Profiles</h1>
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
            Add Profile
          </button>
        </div>
      </div>

      <div className="space-y-2">
        {data.map((item) => (
          <ProfileItemRow
            key={item.id}
            item={item}
            onView={() => navigate(`/profile/${item.id}`)}
            onDelete={() => handleDelete(item.id)}
          />
        ))}
      </div>

      {isFormOpen && (
        <ProfileFormDialog
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
