/// Form dialog for adding/editing Service.
import React, { useState, useEffect } from 'react';
import type { ServiceEntity } from '../../domain/entities/service.entity';

interface ServiceFormDialogProps {
  isOpen: boolean;
  entity?: ServiceEntity;
  onClose: () => void;
  onSave: (entity: ServiceEntity) => void;
}

export function ServiceFormDialog({ isOpen, entity, onClose, onSave }: ServiceFormDialogProps) {
  const [formData, setFormData] = useState<ServiceEntity>({
    id: '',
    name: '',
    title: '',
    description: '',
    active: true,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (entity) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFormData(entity);
    } else {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFormData({
        id: '',
        name: '',
        title: '',
        description: '',
        active: true,
      });
    }
    setErrors({});
  }, [entity, isOpen]);

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.id.trim()) {
      newErrors.id = 'ID is required';
    }
    if (!formData.name?.trim()) {
      newErrors.name = 'Name is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSave(formData);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
        <h2 className="mb-4 text-xl font-bold">
          {entity ? 'Edit Service' : 'Add Service'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium">ID</label>
            <input
              type="text"
              value={formData.id}
              onChange={(e) => setFormData({ ...formData, id: e.target.value })}
              disabled={!!entity}
              className={`w-full rounded border px-3 py-2 ${
                errors.id ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.id && <p className="mt-1 text-sm text-red-500">{errors.id}</p>}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">Name</label>
            <input
              type="text"
              value={formData.name || ''}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className={`w-full rounded border px-3 py-2 ${
                errors.name ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">Description</label>
            <textarea
              value={formData.description || ''}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              className="w-full rounded border border-gray-300 px-3 py-2"
            />
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded border px-4 py-2 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
