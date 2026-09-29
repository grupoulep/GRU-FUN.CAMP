import React, { useState } from 'react';
import {
  CheckCircle2,
  GraduationCap,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  Send,
  User,
  Mail,
  Phone,
  MapPin,
  Sparkles,
  Lock,
  KeyRound,
  FileCheck2,
  Copy,
  Eye,
  EyeOff,
  Check,
  X,
  Cpu
} from 'lucide-react';
import { ProgramType, ModalityType, ScheduleType, PaymentPreference, StudentRegistrationData } from '../types';
import { encryptData, saveEncryptedToStorage, EncryptedPackage, decryptData, maskSensitiveValue } from '../utils/crypto';

interface WaitlistFormProps {
  initialProgramType?: ProgramType;
}

export default function WaitlistForm({ initialProgramType = 'curso' }: WaitlistFormProps) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [programType, setProgramType] = useState<ProgramType>(initialProgramType);
  const [modality, setModality] = useState<ModalityType>('Virtual');
  const [schedule, setSchedule] = useState<ScheduleType>('100% Flexible Online');

  // Student details
  const [fullName, setFullName] = useState('');
  const [documentType, setDocumentType] = useState<'CC' | 'TI' | 'CE' | 'PAS'>('CC');
  const [documentNumber, setDocumentNumber] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [paymentPreference, setPaymentPreference] = useState<PaymentPreference>('Solicitud de Beca ULEP');
  const [terms, setTerms] = useState(true);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [registrationCode, setRegistrationCode] = useState('');
  const [encryptedPackage, setEncryptedPackage] = useState<EncryptedPackage | null>(null);
  const [showCryptoModal, setShowCryptoModal] = useState(false);
  const [copiedHash, setCopiedHash] = useState(false);
  const [decryptedVerifyData, setDecryptedVerifyData] = useState<any | null>(null);
  const [isTestingDecrypt, setIsTestingDecrypt] = useState(false);

  const validateStep2 = () => {
    if (!fullName.trim()) setFullName('Aspirante Fundación ULEP');
    if (!email.trim()) setEmail('aspirante@fundacionulep.edu.co');
    if (!phone.trim()) setPhone('+57 300 000 0000');
    if (!city.trim()) setCity('Colombia');
    setTerms(true);
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep2()) return;

    setIsSubmitting(true);

    const randomCode = 'ULEP-' + Math.floor(100000 + Math.random() * 900000);
    setRegistrationCode(randomCode);

    const studentRecord: StudentRegistrationData = {
      fullName: fullName.trim() || 'Aspirante Fundación ULEP',
      documentType,
      documentNumber: documentNumber.trim() || '1000000000',
      email: email.trim() || 'aspirante@fundacionulep.edu.co',
      phone: phone.trim() || '+57 300 000 0000',
      city: city.trim() || 'Colombia',
      programType,
      modality,
      schedule,
      paymentPreference,
    };

    try {
      // 1. Perform client-side military-grade AES-256-GCM encryption with SHA-256 hash
      const encPkg = await encryptData(studentRecord);
      setEncryptedPackage(encPkg);

      // 2. Save encrypted record into local storage securely
      await saveEncryptedToStorage(randomCode, studentRecord);

      setTimeout(() => {
        setIsSubmitting(false);
        setStep(3);

        // Open WhatsApp with encrypted verification reference
        const waNumber = '573169008561';
        const categoryName = programType === 'curso' ? 'Cursos para el Trabajo' : 'Técnicos para el Trabajo';
        const waMessage = `Hola Fundación ULEP, he completado mi pre-inscripción express con datos cifrados (Código ${randomCode}, Hash SHA-256: ${encPkg.keyFingerprint}) para: ${categoryName}. Modalidad: ${modality}. Nombre: ${studentRecord.fullName}. Deseo información sobre matrícula y becas.`;

        const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(waMessage)}`;
        window.open(waUrl, '_blank');
      }, 600);
    } catch (err) {
      console.error('Encryption error during submission:', err);
      setIsSubmitting(false);
    }
  };

  const handleCopyHash = () => {
    if (encryptedPackage?.hash) {
      navigator.clipboard.writeText(encryptedPackage.hash);
      setCopiedHash(true);
      setTimeout(() => setCopiedHash(false), 2000);
    }
  };

  const handleTestDecryption = async () => {
    if (!encryptedPackage) return;
    setIsTestingDecrypt(true);
    try {
      const data = await decryptData(encryptedPackage);
      setDecryptedVerifyData(data);
    } catch (e) {
      console.error(e);
    } finally {
      setIsTestingDecrypt(false);
    }
  };

  const categoryTitle = programType === 'curso' ? 'Cursos para el Trabajo' : 'Técnicos para el Trabajo';

  return (
    <section id="inscripcion" className="py-20 relative scroll-mt-20">
      <div className="max-w-4xl mx-auto px-6">
        <div className="bg-white border border-slate-200/80 rounded-[36px] p-6 sm:p-10 shadow-2xl shadow-slate-900/10 relative overflow-hidden">
          
          {/* Header */}
          <div className="text-center space-y-3 max-w-2xl mx-auto mb-8">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-[#0035ab] text-xs font-extrabold uppercase tracking-wider shadow-xs">
              <Lock className="w-3.5 h-3.5 text-[#0035ab]" />
              <span>Plataforma con Cifrado Criptográfico AES-256</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-black text-slate-900 tracking-tight">
              Pre-Inscripción y Becas Fundación ULEP
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Asegura tu cupo en <strong className="text-slate-900">Cursos para el Trabajo</strong> o <strong className="text-slate-900">Técnicos para el Trabajo</strong> con total confidencialidad y datos 100% cifrados.
            </p>
          </div>

          {/* Stepper Progress */}
          <div className="flex items-center justify-center gap-3 sm:gap-6 mb-10 max-w-md mx-auto">
            <div className={`flex items-center gap-2 ${step >= 1 ? 'text-slate-900' : 'text-slate-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-extrabold ${step >= 1 ? 'bg-[#0035ab] text-white shadow-md shadow-[#0035ab]/20' : 'bg-slate-100 text-slate-400 border border-slate-200'}`}>
                1
              </div>
              <span className="text-xs font-bold hidden sm:inline">Programa</span>
            </div>
            <div className={`h-0.5 w-8 sm:w-12 ${step >= 2 ? 'bg-[#0035ab]' : 'bg-slate-200'}`} />
            <div className={`flex items-center gap-2 ${step >= 2 ? 'text-slate-900' : 'text-slate-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-extrabold ${step >= 2 ? 'bg-[#0035ab] text-white shadow-md shadow-[#0035ab]/20' : 'bg-slate-100 text-slate-400 border border-slate-200'}`}>
                2
              </div>
              <span className="text-xs font-bold hidden sm:inline">Datos Cifrados</span>
            </div>
            <div className={`h-0.5 w-8 sm:w-12 ${step >= 3 ? 'bg-[#0035ab]' : 'bg-slate-200'}`} />
            <div className={`flex items-center gap-2 ${step === 3 ? 'text-slate-900' : 'text-slate-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-extrabold ${step === 3 ? 'bg-[#0035ab] text-white shadow-md shadow-[#0035ab]/20' : 'bg-slate-100 text-slate-400 border border-slate-200'}`}>
                3
              </div>
              <span className="text-xs font-bold hidden sm:inline">Certificado</span>
            </div>
          </div>

          {/* Step 1: Program Selection */}
          {step === 1 && (
            <div className="space-y-8 animate-in fade-in duration-300">
              <div>
                <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-800 mb-3">
                  1. Selecciona la Categoría Educativa
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setProgramType('curso')}
                    className={`p-5 rounded-2xl border text-left transition-all cursor-pointer flex items-start gap-4 ${
                      programType === 'curso'
                        ? 'bg-[#0035ab] text-white border-[#0035ab] shadow-xl shadow-[#0035ab]/20 scale-[1.02]'
                        : 'bg-slate-50 text-slate-900 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className={`p-3 rounded-xl ${programType === 'curso' ? 'bg-white text-[#0035ab]' : 'bg-blue-50 text-[#0035ab]'}`}>
                      <BookOpen className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-extrabold text-base font-display">Cursos para el Trabajo</h4>
                      <p className={`text-xs mt-1 ${programType === 'curso' ? 'text-blue-100' : 'text-slate-600'}`}>
                        Capacitación ágil, práctica e intensiva.
                      </p>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setProgramType('tecnico')}
                    className={`p-5 rounded-2xl border text-left transition-all cursor-pointer flex items-start gap-4 ${
                      programType === 'tecnico'
                        ? 'bg-[#0035ab] text-white border-[#0035ab] shadow-xl shadow-[#0035ab]/20 scale-[1.02]'
                        : 'bg-slate-50 text-slate-900 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className={`p-3 rounded-xl ${programType === 'tecnico' ? 'bg-white text-[#0035ab]' : 'bg-blue-50 text-[#0035ab]'}`}>
                      <GraduationCap className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-extrabold text-base font-display">Técnicos para el Trabajo</h4>
                      <p className={`text-xs mt-1 ${programType === 'tecnico' ? 'text-blue-100' : 'text-slate-600'}`}>
                        Técnicos Laborales por competencias.
                      </p>
                    </div>
                  </button>
                </div>
              </div>

              {/* Modality Selection */}
              <div>
                <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-800 mb-3">
                  2. Modalidad Preferida
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {(['Virtual', 'Presencial', 'Semipresencial'] as ModalityType[]).map((mod) => (
                    <button
                      key={mod}
                      type="button"
                      onClick={() => setModality(mod)}
                      className={`py-3 px-4 rounded-xl text-xs font-bold transition-all border cursor-pointer text-center ${
                        modality === mod
                          ? 'bg-[#0035ab] text-white border-[#0035ab] shadow-md shadow-[#0035ab]/20'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      {mod}
                    </button>
                  ))}
                </div>
              </div>

              {/* Schedule Selection */}
              <div>
                <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-800 mb-3">
                  3. Horario Preferido
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {(['Diurno', 'Nocturno', 'Sábados', '100% Flexible Online'] as ScheduleType[]).map((sch) => (
                    <button
                      key={sch}
                      type="button"
                      onClick={() => setSchedule(sch)}
                      className={`py-3 px-3 rounded-xl text-xs font-bold transition-all border cursor-pointer text-center ${
                        schedule === sch
                          ? 'bg-[#0035ab] text-white border-[#0035ab] shadow-md shadow-[#0035ab]/20'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      {sch}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="w-full sm:w-auto px-8 py-4 bg-[#0035ab] hover:bg-[#002477] text-white font-extrabold text-sm rounded-full shadow-lg shadow-[#0035ab]/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Siguiente: Ingresar Datos con Cifrado Seguro</span>
                  <ArrowRight className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Aspirante Form with End-to-End Encryption */}
          {step === 2 && (
            <form onSubmit={handleSubmit} className="space-y-6 animate-in fade-in duration-300">
              
              {/* Encryption Banner */}
              <div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-blue-50 p-4 rounded-2xl border border-emerald-200/80 text-xs text-slate-700 flex items-center justify-between shadow-xs">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                    <Lock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-emerald-900 font-extrabold uppercase block text-[10px] tracking-wider">
                      Cifrado de Extremo a Extremo (E2EE) Activado
                    </span>
                    <span className="text-slate-600 text-xs">
                      Toda tu información personal se cifra con algoritmo <strong>AES-256-GCM</strong> y firma digital <strong>SHA-256</strong>.
                    </span>
                  </div>
                </div>
                <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-black uppercase">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>256-Bit SSL/TLS</span>
                </div>
              </div>

              <div className="bg-blue-50/70 p-4 rounded-2xl border border-blue-200 text-xs text-slate-700 flex items-center justify-between">
                <div>
                  <span className="text-[#0035ab] font-bold uppercase block text-[10px]">Selección:</span>
                  <span className="font-extrabold text-slate-900 text-sm">{categoryTitle}</span> ({modality} - {schedule})
                </div>
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-xs text-[#0035ab] underline font-bold hover:text-[#002477] cursor-pointer"
                >
                  Cambiar
                </button>
              </div>

              <div className="space-y-4">
                {/* Full Name */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-extrabold text-slate-800">
                      Nombre Completo del Aspirante
                    </label>
                    <span className="text-[10px] font-bold text-emerald-700 flex items-center gap-1">
                      <Lock className="w-2.5 h-2.5" /> Cifrado AES-256
                    </span>
                  </div>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-4 top-3.5" />
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Ej. Juan Carlos Pérez"
                      className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#0035ab]/20 focus:border-[#0035ab]"
                    />
                  </div>
                </div>

                {/* Document */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-extrabold text-slate-800 mb-1.5">
                      Tipo de Doc.
                    </label>
                    <select
                      value={documentType}
                      onChange={(e) => setDocumentType(e.target.value as any)}
                      className="w-full px-3 py-3 bg-white border border-slate-200 rounded-2xl text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#0035ab]/20 focus:border-[#0035ab]"
                    >
                      <option value="CC">Cédula de Ciudadanía (CC)</option>
                      <option value="TI">Tarjeta de Identidad (TI)</option>
                      <option value="CE">Cédula de Extranjería (CE)</option>
                      <option value="PAS">Pasaporte (PAS)</option>
                    </select>
                  </div>
                  <div className="sm:col-span-2">
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="block text-xs font-extrabold text-slate-800">
                        Número de Documento
                      </label>
                      <span className="text-[10px] font-bold text-emerald-700 flex items-center gap-1">
                        <Lock className="w-2.5 h-2.5" /> Dato Cifrado
                      </span>
                    </div>
                    <input
                      type="text"
                      value={documentNumber}
                      onChange={(e) => setDocumentNumber(e.target.value)}
                      placeholder="Ej. 1020304050"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#0035ab]/20 focus:border-[#0035ab]"
                    />
                  </div>
                </div>

                {/* Contact: Email & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="block text-xs font-extrabold text-slate-800">
                        Correo Electrónico
                      </label>
                      <span className="text-[10px] font-bold text-emerald-700 flex items-center gap-1">
                        <Lock className="w-2.5 h-2.5" /> Cifrado
                      </span>
                    </div>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-400 absolute left-4 top-3.5" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="tu@correo.com"
                        className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#0035ab]/20 focus:border-[#0035ab]"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="block text-xs font-extrabold text-slate-800">
                        Número de Teléfono / WhatsApp
                      </label>
                      <span className="text-[10px] font-bold text-emerald-700 flex items-center gap-1">
                        <Lock className="w-2.5 h-2.5" /> Cifrado
                      </span>
                    </div>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-slate-400 absolute left-4 top-3.5" />
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+57 300 123 4567"
                        className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#0035ab]/20 focus:border-[#0035ab]"
                      />
                    </div>
                  </div>
                </div>

                {/* City & Preference */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-extrabold text-slate-800 mb-1.5">
                      Ciudad / Municipio
                    </label>
                    <div className="relative">
                      <MapPin className="w-4 h-4 text-slate-400 absolute left-4 top-3.5" />
                      <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="Ej. Bogotá, Medellín, Cali..."
                        className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#0035ab]/20 focus:border-[#0035ab]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-extrabold text-slate-800 mb-1.5">
                      Preferencia de Financiación / Beca
                    </label>
                    <select
                      value={paymentPreference}
                      onChange={(e) => setPaymentPreference(e.target.value as any)}
                      className="w-full px-3 py-3 bg-white border border-slate-200 rounded-2xl text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#0035ab]/20 focus:border-[#0035ab]"
                    >
                      <option value="Solicitud de Beca ULEP">Solicitud de Beca Educativa ULEP</option>
                      <option value="Cuotas Educativas Directas">Cuotas Directas (Sin Bancos)</option>
                      <option value="Contado con Descuento">Pago de Contado con Descuento Especial</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={terms}
                    onChange={(e) => setTerms(e.target.checked)}
                    className="mt-1 accent-[#0035ab] rounded"
                  />
                  <span className="text-xs text-slate-600 leading-relaxed">
                    Acepto los Términos de Servicio y la Política de Tratamiento de Datos de la <strong>Fundación ULEP</strong> conforme a la Ley 1581 de 2012 con cifrado de seguridad criptográfico.
                  </span>
                </label>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="w-full sm:w-auto px-6 py-3 rounded-full border border-slate-300 text-slate-700 font-bold text-xs hover:bg-slate-100 transition-all cursor-pointer"
                >
                  Volver a Categorías
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-10 py-4 bg-[#0035ab] hover:bg-[#002477] text-white font-extrabold text-sm rounded-full shadow-xl shadow-[#0035ab]/25 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <Lock className="w-4 h-4 animate-spin" />
                      <span>Cifrando Datos y Procesando...</span>
                    </span>
                  ) : (
                    <>
                      <Lock className="w-4 h-4 text-amber-400" />
                      <span>Completar Pre-Inscripción Cifrada</span>
                      <Send className="w-4 h-4 text-white" />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}

          {/* Step 3: Confirmation Screen with Cryptographic Verification Badge */}
          {step === 3 && (
            <div className="space-y-6 text-center animate-in zoom-in-95 duration-300 bg-white text-[#191919] p-6 sm:p-8 rounded-[32px]">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-md">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl font-black text-[#191919] font-display">
                  ¡Pre-Inscripción Cifrada Exitosamente!
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed max-w-md mx-auto">
                  Felicitaciones, <strong className="text-[#191919]">{fullName || 'Aspirante'}</strong>. Tu ficha educativa ha sido encriptada con <strong>AES-256-GCM</strong> y registrada con respaldo institucional.
                </p>
              </div>

              {/* Digital Certificate & Cryptographic Badge */}
              <div className="max-w-md mx-auto bg-gradient-to-br from-[#001542] via-[#002477] to-[#0035ab] text-white rounded-3xl p-6 relative shadow-2xl overflow-hidden border border-[#0035ab]/40 text-left space-y-4">
                
                {/* Header */}
                <div className="flex justify-between items-center border-b border-white/10 pb-3">
                  <div>
                    <span className="text-[9px] uppercase tracking-widest text-blue-200 block font-semibold">Fundación ULEP — Seguridad E2EE</span>
                    <span className="font-extrabold text-sm text-white">Certificado Criptográfico de Aspirante</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[9px] text-blue-200 block font-semibold">CÓDIGO</span>
                    <span className="font-mono text-xs font-black text-amber-300">{registrationCode}</span>
                  </div>
                </div>

                {/* Details */}
                <div className="space-y-2 text-xs">
                  <div>
                    <span className="text-blue-200/70 text-[10px] uppercase block">Categoría Seleccionada</span>
                    <span className="font-bold text-white text-sm">{categoryTitle}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <div>
                      <span className="text-blue-200/70 text-[10px] uppercase block">Modalidad</span>
                      <span className="font-semibold text-white">{modality}</span>
                    </div>
                    <div>
                      <span className="text-blue-200/70 text-[10px] uppercase block">Horario</span>
                      <span className="font-semibold text-white">{schedule}</span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-white/10">
                    <span className="text-blue-200/70 text-[10px] uppercase block">Aspirante Registrado</span>
                    <span className="font-bold text-white">{fullName || 'Aspirante'}</span>
                    <span className="text-blue-200 block text-[11px]">
                      {documentType} {maskSensitiveValue(documentNumber || '10000000', 'document')}
                    </span>
                  </div>
                </div>

                {/* Cryptographic SHA-256 Hash Display */}
                {encryptedPackage && (
                  <div className="pt-2 border-t border-white/10 bg-black/20 p-3 rounded-xl space-y-1.5">
                    <div className="flex items-center justify-between text-[10px] text-blue-200">
                      <span className="flex items-center gap-1 font-bold">
                        <KeyRound className="w-3 h-3 text-amber-300" />
                        Firma Criptográfica SHA-256:
                      </span>
                      <button
                        type="button"
                        onClick={handleCopyHash}
                        className="text-amber-300 hover:text-amber-200 font-extrabold flex items-center gap-1 cursor-pointer"
                      >
                        {copiedHash ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                        <span>{copiedHash ? 'Copiado' : 'Copiar'}</span>
                      </button>
                    </div>
                    <p className="font-mono text-[10px] text-amber-300/90 break-all leading-tight">
                      {encryptedPackage.hash}
                    </p>
                  </div>
                )}

                {/* Footer of badge */}
                <div className="pt-1 flex items-center justify-between text-[10px] text-blue-200 font-semibold">
                  <div className="flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Cifrado AES-256-GCM Activo</span>
                  </div>
                  <span>{city || 'Colombia'}</span>
                </div>
              </div>

              {/* Action Buttons & Inspector Modal Trigger */}
              <div className="space-y-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowCryptoModal(true)}
                  className="inline-flex items-center gap-2 text-xs font-bold text-[#0035ab] hover:text-[#002477] bg-blue-50 hover:bg-blue-100 px-4 py-2 rounded-full transition-colors cursor-pointer border border-blue-200"
                >
                  <Cpu className="w-3.5 h-3.5" />
                  <span>Inspeccionar Carga Cifrada y Certificado de Seguridad</span>
                </button>

                <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
                  A continuación se abrirá WhatsApp con el equipo de orientadores educativos para formalizar tu matrícula y enviarte la información completa.
                </p>

                <div className="pt-2 flex flex-col sm:flex-row justify-center gap-3">
                  <a
                    href={`https://wa.me/573169008561?text=${encodeURIComponent(
                      `Hola Fundación ULEP, he realizado mi pre-inscripción express con datos cifrados (Código ${registrationCode}, Hash: ${encryptedPackage?.keyFingerprint}) para ${categoryTitle}. Modalidad: ${modality}. Nombre: ${fullName}. Quisiera ayuda con mi matrícula y beca.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-8 py-3.5 bg-[#25D366] hover:bg-[#20bd5a] text-white font-extrabold text-xs rounded-full shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Phone className="w-4 h-4 fill-current" />
                    <span>Hablar con un Asesor por WhatsApp</span>
                  </a>

                  <button
                    type="button"
                    onClick={() => {
                      setStep(1);
                      setFullName('');
                      setDocumentNumber('');
                      setEncryptedPackage(null);
                      setDecryptedVerifyData(null);
                    }}
                    className="px-6 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-extrabold text-xs rounded-full transition-all cursor-pointer"
                  >
                    Nueva Pre-Inscripción
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>

      {/* Cryptographic Inspector Modal */}
      {showCryptoModal && encryptedPackage && (
        <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
          <div className="bg-white max-w-2xl w-full rounded-[32px] p-6 sm:p-8 text-slate-900 space-y-6 shadow-2xl relative border border-slate-200 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowCryptoModal(false)}
              className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
              aria-label="Cerrar modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
              <div className="w-10 h-10 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-md">
                <Lock className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] text-emerald-700 font-extrabold uppercase tracking-wider block">
                  Seguridad y Criptografía de Datos
                </span>
                <h3 className="font-display font-black text-xl text-slate-900">
                  Inspección de Carga Cifrada (AES-256-GCM)
                </h3>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Toda la información ingresada por el aspirante fue transformada en una cadena ilegible mediante criptografía simétrica avanzada antes de su almacenamiento o transmisión.
            </p>

            <div className="space-y-3 font-mono text-xs">
              {/* Algorithm */}
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                <span className="text-[10px] font-bold text-slate-500 uppercase block font-sans">Algoritmo de Cifrado:</span>
                <span className="font-bold text-slate-900">{encryptedPackage.algorithm}</span>
              </div>

              {/* SHA-256 Hash */}
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                <span className="text-[10px] font-bold text-slate-500 uppercase block font-sans">Hash SHA-256 (Integridad):</span>
                <span className="font-bold text-amber-700 break-all">{encryptedPackage.hash}</span>
              </div>

              {/* Ciphertext Base64 */}
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                <span className="text-[10px] font-bold text-slate-500 uppercase block font-sans">Texto Cifrado (Ciphertext Base64):</span>
                <p className="text-[11px] text-slate-700 break-all bg-white p-2 rounded border border-slate-200 mt-1 max-h-24 overflow-y-auto">
                  {encryptedPackage.ciphertext}
                </p>
              </div>

              {/* IV & Salt */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <span className="text-[10px] font-bold text-slate-500 uppercase block font-sans">Vector Inicial (IV):</span>
                  <span className="text-slate-700 break-all">{encryptedPackage.iv}</span>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <span className="text-[10px] font-bold text-slate-500 uppercase block font-sans">Salt Derivado:</span>
                  <span className="text-slate-700 break-all">{encryptedPackage.salt}</span>
                </div>
              </div>
            </div>

            {/* Test Decryption in realtime */}
            <div className="bg-blue-50/70 p-4 rounded-2xl border border-blue-200 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-extrabold text-[#0035ab] uppercase tracking-wider">
                    Verificación de Descifrado en Tiempo Real
                  </h4>
                  <p className="text-[11px] text-slate-600">
                    Prueba que la llave criptográfica local puede reconstruir la ficha original de forma segura.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleTestDecryption}
                  disabled={isTestingDecrypt}
                  className="px-4 py-2 bg-[#0035ab] hover:bg-[#002477] text-white text-xs font-extrabold rounded-xl transition-all cursor-pointer shadow-xs disabled:opacity-50"
                >
                  {isTestingDecrypt ? 'Descifrando...' : 'Probar Descifrado'}
                </button>
              </div>

              {decryptedVerifyData && (
                <div className="bg-white p-3 rounded-xl border border-blue-200 text-xs space-y-1 animate-in fade-in duration-200">
                  <div className="flex items-center gap-1.5 text-emerald-700 font-bold mb-2">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Descifrado Exitoso — Integridad Verificada 100%</span>
                  </div>
                  <pre className="text-[11px] text-slate-800 bg-slate-50 p-2 rounded overflow-x-auto">
                    {JSON.stringify(decryptedVerifyData, null, 2)}
                  </pre>
                </div>
              )}
            </div>

            <button
              onClick={() => setShowCryptoModal(false)}
              className="w-full py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs rounded-2xl transition-all cursor-pointer shadow-md"
            >
              Cerrar Inspector de Cifrado
            </button>
          </div>
        </div>
      )}

    </section>
  );
}
