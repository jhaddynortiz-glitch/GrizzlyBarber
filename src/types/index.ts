/**
 * Definiciones de tipos para Grizzly Barber
 * Basado en las reglas de arquitectura de AGENTS.md
 */

export type UserRole = 'client' | 'barber' | 'admin';

export interface UserProfile {
  id: string;
  email: string;
  displayName: string;
  phone: string;
  role: UserRole;
  avatarUrl?: string;
  createdAt: number;
}

export type ServiceCategory = 'hair' | 'beard' | 'combo' | 'spa';

export interface ServiceItem {
  id: string;
  name: string;
  description: string;
  durationMinutes: number;
  price: number;
  category: ServiceCategory;
  imageUrl?: string;
  active: boolean;
}

export interface BarberScheduleDay {
  dayOfWeek: number; // 0 = Domingo, 1 = Lunes, ..., 6 = Sábado
  startTime: string; // "09:00"
  endTime: string;   // "20:00"
  breakStart?: string;
  breakEnd?: string;
}

export interface BarberProfile {
  id: string;
  userId: string;
  name: string;
  bio: string;
  specialties: string[];
  avatarUrl?: string;
  schedule: BarberScheduleDay[];
  active: boolean;
}

export type AppointmentStatus = 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled';

export interface Appointment {
  id: string;
  clientId: string;
  clientName: string;
  clientPhone: string;
  barberId: string;
  barberName: string;
  serviceId: string;
  serviceName: string;
  date: string;       // "YYYY-MM-DD"
  startTime: string;  // "10:30"
  endTime: string;    // "11:15"
  status: AppointmentStatus;
  totalPrice: number;
  notes?: string;
  createdAt: number;
  updatedAt: number;
}
