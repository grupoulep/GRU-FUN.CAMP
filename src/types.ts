export type ProgramType = 'curso' | 'tecnico';
export type ModalityType = 'Virtual' | 'Presencial' | 'Semipresencial';
export type ScheduleType = 'Diurno' | 'Nocturno' | 'Sábados' | '100% Flexible Online';
export type PaymentPreference = 'Contado con Descuento' | 'Cuotas Educativas Directas' | 'Solicitud de Beca ULEP';
export type TabType = 'inicio' | 'programas' | 'beneficios' | 'nosotros' | 'inscripciones';

export interface EducationPreference {
  programType: ProgramType;
  modality: ModalityType;
  schedule: ScheduleType;
}

export interface StudentRegistrationData {
  fullName: string;
  documentType: 'CC' | 'TI' | 'CE' | 'PAS';
  documentNumber: string;
  email: string;
  phone: string;
  city: string;
  programType: ProgramType;
  modality: ModalityType;
  schedule: ScheduleType;
  paymentPreference: PaymentPreference;
  comments?: string;
}

export interface EncryptedStudentRecord {
  registrationCode: string;
  encryptedPayload: string;
  iv: string;
  salt: string;
  sha256Hash: string;
  algorithm: string;
  encryptedAt: string;
  integrityVerified: boolean;
}
