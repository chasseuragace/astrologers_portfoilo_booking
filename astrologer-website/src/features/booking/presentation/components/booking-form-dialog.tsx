/// Form dialog for adding/editing Booking.
import React, { useState, useEffect } from 'react';
import type { BookingEntity, BookingStatus } from '../../domain/entities/booking.entity';
import { NepaliDatePickerCustom } from '../../../../components/NepaliDatePickerCustom';

interface BookingFormDialogProps {
  isOpen: boolean;
  entity?: BookingEntity;
  onClose: () => void;
  onSave: (entity: BookingEntity) => void;
}

const STATUS_OPTIONS: BookingStatus[] = ['Pending', 'Approved', 'Rejected', 'Completed', 'Cancelled'];

export function BookingFormDialog({ isOpen, entity, onClose, onSave }: BookingFormDialogProps) {
  const [formData, setFormData] = useState<BookingEntity>({
    id: '',
    name: '',
    phone: '',
    email: '',
    serviceType: '',
    nepaliDate: '',
    location: '',
    description: '',
    status: 'Pending',
    duration: '',
    adminNote: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (entity) {
      setFormData(entity);
    } else {
      setFormData({
        id: '',
        name: '',
        phone: '',
        email: '',
        serviceType: '',
        nepaliDate: '',
        location: '',
        description: '',
        status: 'Pending',
        duration: '',
        adminNote: '',
      });
    }
    setErrors({});
  }, [entity, isOpen]);

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name?.trim()) {
      newErrors.name = 'Name is required';
    }
    if (!formData.phone?.trim()) {
      newErrors.phone = 'Phone is required';
    }
    if (!formData.nepaliDate?.trim()) {
      newErrors.nepaliDate = 'Date is required';
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 overflow-y-auto py-8">
      <div className="w-full max-w-2xl rounded-lg bg-white p-6 shadow-lg my-auto">
        <h2 className="mb-4 text-xl font-bold">
          {entity ? 'Edit Booking' : 'Add Booking'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="mb-1 block text-sm font-medium">Name *</label>
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
              <label className="mb-1 block text-sm font-medium">Phone *</label>
              <input
                type="text"
                value={formData.phone || ''}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className={`w-full rounded border px-3 py-2 ${
                  errors.phone ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone}</p>}
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">Email</label>
              <input
                type="email"
                value={formData.email || ''}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full rounded border border-gray-300 px-3 py-2"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">Service Type</label>
              <input
                type="text"
                value={formData.serviceType || ''}
                onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                className="w-full rounded border border-gray-300 px-3 py-2"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">Nepali Date (BS) *</label>
              <NepaliDatePickerCustom
                value={formData.nepaliDate || ''}
                onChange={(date) => setFormData({ ...formData, nepaliDate: date })}
                placeholder="Select a date"
              />
              {errors.nepaliDate && <p className="mt-1 text-sm text-red-500">{errors.nepaliDate}</p>}
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">Location</label>
              <input
                type="text"
                value={formData.location || ''}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full rounded border border-gray-300 px-3 py-2"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as BookingStatus })}
                className="w-full rounded border border-gray-300 px-3 py-2"
              >
                {STATUS_OPTIONS.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">Description / Message</label>
            <textarea
              value={formData.description || ''}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={2}
              className="w-full rounded border border-gray-300 px-3 py-2"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="mb-1 block text-sm font-medium">Duration</label>
              <input
                type="text"
                value={formData.duration || ''}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                placeholder="30 minutes"
                className="w-full rounded border border-gray-300 px-3 py-2"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">Admin Note</label>
              <input
                type="text"
                value={formData.adminNote || ''}
                onChange={(e) => setFormData({ ...formData, adminNote: e.target.value })}
                className="w-full rounded border border-gray-300 px-3 py-2"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
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
