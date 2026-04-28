/// Real repository implementation for Booking using Firebase Firestore.
import type { Either } from '../../../../core/usecase/usecase';
import type { Failure } from '../../../../core/errors/failures';
import { UnknownFailure } from '../../../../core/errors/failures';
import type { BookingEntity } from '../../domain/entities/booking.entity';
import type { BookingRepository } from '../../domain/repositories/booking.repository';
import { db } from '../../../../firebase/config';
import { collection, getDocs, getDoc, addDoc, updateDoc, deleteDoc, doc, query, orderBy, serverTimestamp, Timestamp } from 'firebase/firestore';
import { toEntity, type BookingModel } from '../models/booking.model';

export class BookingRepositoryImpl implements BookingRepository {
  private readonly collectionName = 'bookings';

  async getAll(): Promise<Either<Failure, BookingEntity[]>> {
    try {
      const bookingsCol = collection(db, this.collectionName);
      const q = query(bookingsCol, orderBy('created_at', 'desc'));
      const snapshot = await getDocs(q);
      const bookings = snapshot.docs.map(doc => {
        const data = doc.data() as BookingModel;
        return toEntity({
          ...data,
          id: doc.id,
          // Handle Firestore timestamps if they were stored as such
          created_at: (data.created_at as unknown) instanceof Timestamp ? (data.created_at as unknown as Timestamp).toDate().toISOString() : data.created_at,
          updated_at: (data.updated_at as unknown) instanceof Timestamp ? (data.updated_at as unknown as Timestamp).toDate().toISOString() : data.updated_at,
        });
      });
      return { right: bookings };
    } catch (error) {
      return { left: new UnknownFailure(error instanceof Error ? error.message : 'Failed to fetch bookings') };
    }
  }

  async getById(id: string): Promise<Either<Failure, BookingEntity>> {
    try {
      const docRef = doc(db, this.collectionName, id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data() as BookingModel;
        return {
          right: toEntity({
            ...data,
            id: docSnap.id,
            created_at: (data.created_at as unknown) instanceof Timestamp ? (data.created_at as unknown as Timestamp).toDate().toISOString() : data.created_at,
            updated_at: (data.updated_at as unknown) instanceof Timestamp ? (data.updated_at as unknown as Timestamp).toDate().toISOString() : data.updated_at,
          })
        };
      } else {
        return { left: new UnknownFailure('Booking not found') };
      }
    } catch (error) {
      return { left: new UnknownFailure(error instanceof Error ? error.message : 'Failed to fetch booking') };
    }
  }

  async add(entity: BookingEntity): Promise<Either<Failure, BookingEntity>> {
    try {
      const bookingsCol = collection(db, this.collectionName);
      // Remove id before adding to Firestore as Firestore generates its own
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { id, createdAt, updatedAt, ...rest } = entity;
      const dataToAdd = {
        ...rest,
        created_at: serverTimestamp(),
        updated_at: serverTimestamp(),
      };
      const docRef = await addDoc(bookingsCol, dataToAdd);
      const savedDoc = await getDoc(docRef);
      const savedData = savedDoc.data() as BookingModel;
      return {
        right: toEntity({
          ...savedData,
          id: docRef.id,
          created_at: (savedData.created_at as unknown) instanceof Timestamp ? (savedData.created_at as unknown as Timestamp).toDate().toISOString() : savedData.created_at,
          updated_at: (savedData.updated_at as unknown) instanceof Timestamp ? (savedData.updated_at as unknown as Timestamp).toDate().toISOString() : savedData.updated_at,
        })
      };
    } catch (error) {
      return { left: new UnknownFailure(error instanceof Error ? error.message : 'Failed to add booking') };
    }
  }

  async update(entity: BookingEntity): Promise<Either<Failure, BookingEntity>> {
    try {
      const docRef = doc(db, this.collectionName, entity.id);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { id, createdAt, updatedAt, ...rest } = entity;
      const dataToUpdate = {
        ...rest,
        updated_at: serverTimestamp(),
      };
      await updateDoc(docRef, dataToUpdate);
      const updatedDoc = await getDoc(docRef);
      const updatedData = updatedDoc.data() as BookingModel;
      return {
        right: toEntity({
          ...updatedData,
          id: docRef.id,
          created_at: (updatedData.created_at as unknown) instanceof Timestamp ? (updatedData.created_at as unknown as Timestamp).toDate().toISOString() : updatedData.created_at,
          updated_at: (updatedData.updated_at as unknown) instanceof Timestamp ? (updatedData.updated_at as unknown as Timestamp).toDate().toISOString() : updatedData.updated_at,
        })
      };
    } catch (error) {
      return { left: new UnknownFailure(error instanceof Error ? error.message : 'Failed to update booking') };
    }
  }

  async delete(id: string): Promise<Either<Failure, void>> {
    try {
      const docRef = doc(db, this.collectionName, id);
      await deleteDoc(docRef);
      return { right: undefined };
    } catch (error) {
      return { left: new UnknownFailure(error instanceof Error ? error.message : 'Failed to delete booking') };
    }
  }
}
