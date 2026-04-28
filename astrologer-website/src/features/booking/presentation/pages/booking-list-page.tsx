/// List page for Booking.
import React, { useState, useMemo } from 'react';
import { useBookingList, useBookingMutations } from '../hooks/booking.hooks';
import { ErrorView } from '../../../../core/components/error-view';
import { EmptyView } from '../../../../core/components/empty-view';
import { BookingFormDialog } from '../components/booking-form-dialog';
import { Calendar, ChevronLeft, ChevronRight, Filter, X, Check } from 'lucide-react';
import type { BookingStatus, BookingEntity } from '../../domain/entities/booking.entity';
import { NepaliDatePickerCustom } from '../../../../components/NepaliDatePickerCustom';

export function BookingListPage() {
  const { data, isLoading, error, refetch } = useBookingList();
  const { update, delete: deleteMutation } = useBookingMutations();
  const [isFormOpen, setIsFormOpen] = React.useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingDate, setEditingDate] = useState<string>('');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // Filter states
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const bookings = data || [];

  // Filter bookings
  const filteredBookings = useMemo(() => {
    return bookings.filter(booking => {
      const statusMatch = statusFilter === 'all' || booking.status === statusFilter;
      const dateMatch = !selectedDate || booking.nepaliDate === selectedDate;
      return statusMatch && dateMatch;
    });
  }, [bookings, statusFilter, selectedDate]);

  // Pagination
  const totalPages = Math.ceil(filteredBookings.length / itemsPerPage);
  const paginatedBookings = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredBookings.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredBookings, currentPage, itemsPerPage]);

  // Reset page when filters change
  const handleStatusFilterChange = (status: string) => {
    setStatusFilter(status);
    setCurrentPage(1);
  };

  const handleDateFilterChange = (date: string) => {
    setSelectedDate(date);
    setCurrentPage(1);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approved': return 'bg-emerald-500/80 text-amber-100';
      case 'Pending': return 'bg-gold-500/80 text-cosmic-950';
      case 'Rejected': return 'bg-red-500/80 text-amber-100';
      case 'Completed': return 'bg-blue-500/80 text-amber-100';
      case 'Cancelled': return 'bg-gray-500/80 text-amber-100';
      default: return 'bg-cosmic-700 text-amber-100';
    }
  };

  const statusOptions: BookingStatus[] = ['Pending', 'Approved', 'Rejected', 'Completed', 'Cancelled'];

  const handleStatusChange = (booking: BookingEntity, newStatus: BookingStatus) => {
    update.mutate({ ...booking, status: newStatus });
  };

  const handleDateChange = (booking: BookingEntity) => {
    if (editingDate) {
      update.mutate({ ...booking, nepaliDate: editingDate });
      setEditingId(null);
      setEditingDate('');
    }
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this Booking?')) {
      deleteMutation.mutate(id);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cosmic-950">
        <div className="text-gold-400 font-display text-xl animate-pulse">Loading...</div>
      </div>
    );
  }

  if (error) {
    return <ErrorView message={error.message} onRetry={() => refetch()} />;
  }

  return (
    <div className="min-h-screen bg-cosmic-950 p-4">
      <div className="container mx-auto max-w-7xl">
        <div className="mb-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <h1 className="text-3xl font-display font-bold text-gold-400">Manage Bookings</h1>
          <button
            onClick={() => refetch()}
            className="px-4 py-2 bg-cosmic-800/50 border border-gold-400/30 text-amber-100 rounded-lg hover:bg-gold-400/10 transition"
          >
            Refresh
          </button>
        </div>

        {/* Filters */}
        <div className="bg-cosmic-800/40 backdrop-blur-sm p-6 rounded-2xl border border-gold-400/20 mb-6">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-gold-400" />
              <span className="text-amber-100 font-display font-semibold">Filters:</span>
            </div>
            
            {/* Status Filter */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => handleStatusFilterChange('all')}
                className={`px-4 py-2 rounded-lg font-display font-medium transition-all ${
                  statusFilter === 'all'
                    ? 'bg-gold-500 text-cosmic-950'
                    : 'bg-cosmic-900/50 border border-gold-400/30 text-amber-100 hover:bg-gold-400/10'
                }`}
              >
                All
              </button>
              {statusOptions.map((status) => (
                <button
                  key={status}
                  onClick={() => handleStatusFilterChange(status)}
                  className={`px-4 py-2 rounded-lg font-display font-medium transition-all ${
                    statusFilter === status
                      ? 'bg-gold-500 text-cosmic-950'
                      : 'bg-cosmic-900/50 border border-gold-400/30 text-amber-100 hover:bg-gold-400/10'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>

            {/* Date Filter */}
            <div className="flex items-center gap-2 w-full md:w-auto">
              <Calendar className="w-5 h-5 text-gold-400 flex-shrink-0" />
              <div className="relative w-full md:w-48">
                <NepaliDatePickerCustom
                  value={selectedDate}
                  onChange={(date) => handleDateFilterChange(date)}
                  placeholder="Filter by date"
                />
              </div>
              {selectedDate && (
                <button
                  onClick={() => handleDateFilterChange('')}
                  className="text-amber-200/60 hover:text-amber-100 flex-shrink-0"
                >
                  <X size={18} />
                </button>
              )}
            </div>
          </div>

          {/* Filter Summary */}
          <div className="mt-4 pt-4 border-t border-gold-400/20">
            <p className="text-amber-200/60">
              Showing {filteredBookings.length} booking{filteredBookings.length !== 1 ? 's' : ''}
              {statusFilter !== 'all' && ` with status "${statusFilter}"`}
              {selectedDate && ` on ${selectedDate}`}
            </p>
          </div>
        </div>

        {/* Bookings List */}
        <div className="bg-cosmic-800/40 backdrop-blur-sm p-6 rounded-2xl border border-gold-400/20 mb-6">
          {paginatedBookings.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-amber-200/60 text-lg">No bookings found matching your filters.</p>
              {statusFilter !== 'all' || selectedDate ? (
                <button
                  onClick={() => {
                    setStatusFilter('all');
                    setSelectedDate('');
                    setCurrentPage(1);
                  }}
                  className="mt-4 px-6 py-2 bg-gold-500 text-cosmic-950 font-display font-semibold rounded-lg hover:bg-gold-600 transition-colors"
                >
                  Clear Filters
                </button>
              ) : (
                <EmptyView message="No Bookings yet" />
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {paginatedBookings.map((item) => (
                <div key={item.id} className="bg-cosmic-900/50 border border-gold-400/20 rounded-xl overflow-hidden">
                  {/* Header Row - Always Visible */}
                  <div 
                    onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}
                    className="p-6 cursor-pointer hover:bg-cosmic-900/70 transition-colors flex justify-between items-start"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <p className="font-display font-semibold text-amber-100 text-lg">{item.name}</p>
                        <span className={`px-3 py-1 rounded-full text-sm font-display font-medium ${getStatusColor(item.status)}`}>
                          {item.status}
                        </span>
                      </div>
                      <p className="text-amber-200/80 text-sm">{item.serviceType}</p>
                      <p className="text-amber-200/60 text-xs mt-1">
                        <span className="font-display font-medium">Date:</span> {item.nepaliDate}
                      </p>
                    </div>
                    <div className="text-gold-400">
                      {expandedId === item.id ? '−' : '+'}
                    </div>
                  </div>

                  {/* Expanded Details */}
                  {expandedId === item.id && (
                    <div className="border-t border-gold-400/20 p-6 bg-cosmic-900/80 space-y-6">
                      {/* Full Booking Details */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-xs text-gold-400/70 font-display font-semibold mb-1">NAME</p>
                          <p className="text-amber-100">{item.name}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gold-400/70 font-display font-semibold mb-1">PHONE</p>
                          <p className="text-amber-100">{item.phone || '—'}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gold-400/70 font-display font-semibold mb-1">EMAIL</p>
                          <p className="text-amber-100">{item.email || '—'}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gold-400/70 font-display font-semibold mb-1">LOCATION</p>
                          <p className="text-amber-100">{item.location || '—'}</p>
                        </div>
                        <div className="md:col-span-2">
                          <p className="text-xs text-gold-400/70 font-display font-semibold mb-1">SERVICE TYPE</p>
                          <p className="text-amber-100">{item.serviceType}</p>
                        </div>
                        <div className="md:col-span-2">
                          <p className="text-xs text-gold-400/70 font-display font-semibold mb-1">DESCRIPTION</p>
                          <p className="text-amber-100">{item.description || '—'}</p>
                        </div>
                      </div>

                      {/* Date Editing */}
                      <div className="pt-4 border-t border-gold-400/20">
                        <p className="text-xs text-gold-400/70 font-display font-semibold mb-3">CHANGE DATE</p>
                        {editingId === item.id ? (
                          <div className="flex gap-2">
                            <div className="flex-1">
                              <NepaliDatePickerCustom
                                value={editingDate || item.nepaliDate}
                                onChange={(date) => setEditingDate(date)}
                                placeholder="Select date"
                              />
                            </div>
                            <button
                              onClick={() => handleDateChange(item)}
                              className="px-4 py-2 bg-emerald-500/20 border border-emerald-500/50 text-emerald-300 rounded-lg hover:bg-emerald-500/30 transition flex items-center gap-2"
                            >
                              <Check size={18} />
                            </button>
                            <button
                              onClick={() => {
                                setEditingId(null);
                                setEditingDate('');
                              }}
                              className="px-4 py-2 bg-red-500/20 border border-red-500/50 text-red-300 rounded-lg hover:bg-red-500/30 transition flex items-center gap-2"
                            >
                              <X size={18} />
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => {
                              setEditingId(item.id);
                              setEditingDate(item.nepaliDate);
                            }}
                            className="px-4 py-2 bg-cosmic-900/50 border border-gold-400/30 text-amber-100 rounded-lg hover:bg-gold-400/10 transition"
                          >
                            Edit Date
                          </button>
                        )}
                      </div>

                      {/* Status Update Chips */}
                      <div className="pt-4 border-t border-gold-400/20">
                        <p className="text-xs text-gold-400/70 font-display font-semibold mb-3">UPDATE STATUS</p>
                        <div className="flex flex-wrap gap-2">
                          {statusOptions.map(status => (
                            <button
                              key={status}
                              onClick={() => handleStatusChange(item, status)}
                              className={`px-4 py-2 rounded-lg font-display font-medium transition-all ${
                                item.status === status
                                  ? getStatusColor(status)
                                  : 'bg-cosmic-900/50 border border-gold-400/30 text-amber-100 hover:bg-gold-400/10'
                              }`}
                            >
                              {status}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Delete Button */}
                      <div className="pt-4 border-t border-gold-400/20 flex justify-end">
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="px-4 py-2 bg-red-500/20 border border-red-500/50 text-red-300 rounded-lg hover:bg-red-500/30 transition"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-lg bg-cosmic-900/50 border border-gold-400/30 text-amber-100 hover:bg-gold-400/10 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-10 h-10 rounded-lg font-display font-medium transition-all ${
                  currentPage === page
                    ? 'bg-gold-500 text-cosmic-950'
                    : 'bg-cosmic-900/50 border border-gold-400/30 text-amber-100 hover:bg-gold-400/10'
                }`}
              >
                {page}
              </button>
            ))}
            
            <button
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg bg-cosmic-900/50 border border-gold-400/30 text-amber-100 hover:bg-gold-400/10 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>

      {isFormOpen && (
        <BookingFormDialog
          isOpen={isFormOpen}
          onClose={() => setIsFormOpen(false)}
          onSave={() => {
            // add.mutate(entity);
            setIsFormOpen(false);
          }}
        />
      )}
    </div>
  );
}
