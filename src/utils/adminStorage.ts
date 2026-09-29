import shortCoursesImg from '../assets/images/short_courses_ulep_1786064117554.jpg';
import vocationalTrainingImg from '../assets/images/vocational_training_ulep_1786064108299.jpg';
import alegraAdImg from '../assets/images/alegra_publicidad_1788568368892.jpg';
import heroStudentsImg from '../assets/images/hero_students_ulep_1786064095670.jpg';

export interface CourseData {
  id: string;
  title: string;
  type: 'curso' | 'tecnico';
  subtitle: string;
  description: string;
  imageUrl: string;
  badge: string;
  duration?: string;
  features: string[];
}

export interface AdData {
  id: string;
  title: string;
  sponsor: string;
  description: string;
  imageUrl: string;
  ctaText: string;
  ctaLink: string;
  badge: string;
  active: boolean;
}

export interface SiteImagesData {
  heroImage: string;
}

export interface FoundationBanner {
  id: string;
  name: string;
  imageUrl: string;
  active: boolean;
}

export interface AllyLogo {
  id: string;
  name: string;
  imageUrl: string;
  category?: string;
  active: boolean;
}

const STORAGE_KEYS = {
  COURSES: 'ulep_admin_courses_v1',
  ADS: 'ulep_admin_ads_v1',
  IMAGES: 'ulep_admin_images_v1',
  AUTH: 'ulep_admin_session_v1',
  BANNERS: 'ulep_admin_foundation_banners_v1',
  ALLIES: 'ulep_admin_allies_v1',
};

export const INITIAL_COURSES: CourseData[] = [
  {
    id: 'curso-trabajo-1',
    title: 'Cursos para el Trabajo',
    type: 'curso',
    subtitle: 'Módulos de formación práctica e intensiva',
    description: 'Diseñados para adquirir habilidades específicas e indispensables en el entorno laboral actual. Ideales para rápida actualización, certificación de destrezas operativas o ingreso inmediato al mundo del trabajo.',
    imageUrl: shortCoursesImg,
    badge: 'Capacitación Corta',
    duration: '3 a 6 meses',
    features: [
      'Duración ágil y contenidos 100% aplicados a la práctica',
      'Horarios flexibles: Diurno, Nocturno, Sábados o Virtual',
      'Acceso a Campus Virtual y aulas de aprendizaje',
      'Certificación oficial de aprobación emitida por Fundación ULEP'
    ]
  },
  {
    id: 'tecnico-laboral-1',
    title: 'Técnicos para el Trabajo',
    type: 'tecnico',
    subtitle: 'Programas Técnicos Laborales por Competencias',
    description: 'Programas integrales orientados a la preparación técnica en áreas de alta empleabilidad. Desarrolla competencias teórico-prácticas para desempeñarte con solvencia profesional en el sector productivo.',
    imageUrl: vocationalTrainingImg,
    badge: 'Formación Integral',
    duration: '1 a 2 años',
    features: [
      'Formación por competencias laborales orientada al empleo',
      'Acompañamiento docente y talleres prácticos en línea / presencial',
      'Modalidades Virtual, Presencial o Semipresencial',
      'Certificación de Técnico Laboral respaldada por GRUPO ULEP'
    ]
  }
];

export const INITIAL_ADS: AdData[] = [
  {
    id: 'alegra-ad-1',
    title: 'Alegra: Aliados en Contabilidad Inteligente en la Nube',
    sponsor: 'Alegra & Fundación ULEP',
    description: 'En Fundación ULEP utilizamos Alegra como nuestro sistema contable oficial en la nube para garantizar una administración transparente, ágil y moderna que le da superpoderes a nuestra ONG.',
    imageUrl: alegraAdImg,
    ctaText: 'Conocer Alianza Alegra',
    ctaLink: 'https://www.alegra.com/colombia/',
    badge: 'Alianza Oficial ONG',
    active: true,
  },
  {
    id: 'becas-ad-2',
    title: 'Convocatoria Abierta: Becas Educativas ULEP 2026',
    sponsor: 'GRUPO ULEP — Inclusión Social',
    description: 'Postúlate a nuestros planes de apoyo económico y financiación directa sin intermediarios bancarios para Cursos y Técnicos Laborales.',
    imageUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1600&q=80',
    ctaText: 'Solicitar Beca por WhatsApp',
    ctaLink: 'https://wa.me/573169008561?text=Hola%20Fundaci%C3%B3n%20ULEP%2C%20quisiera%20postularme%20a%20la%20Convocatoria%20de%20Becas%202026.',
    badge: '★ Convocatoria 2026',
    active: true,
  },
  {
    id: 'convenios-ad-3',
    title: 'Alianzas Empresariales para Prácticas y Empleabilidad',
    sponsor: 'Red Empresarial Fundación ULEP',
    description: 'Convenios con empresas del sector productivo para que nuestros estudiantes desarrollen competencias laborales reales y prácticas formativas.',
    imageUrl: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1600&q=80',
    ctaText: 'Ver Información de Convenios',
    ctaLink: 'https://wa.me/573169008561?text=Hola%20Fundaci%C3%B3n%20ULEP%2C%20quisiera%20informaci%C3%B3n%20sobre%20convenios%20y%20pr%C3%A1cticas.',
    badge: 'Bolsa de Empleo',
    active: true,
  }
];

export const INITIAL_IMAGES: SiteImagesData = {
  heroImage: heroStudentsImg,
};

export const INITIAL_FOUNDATION_BANNERS: FoundationBanner[] = [
  {
    id: 'fnd-banner-1',
    name: 'Estudiantes y Campus Fundación ULEP',
    imageUrl: heroStudentsImg,
    active: true,
  },
  {
    id: 'fnd-banner-2',
    name: 'Formación Práctica en Laboratorios y Talleres',
    imageUrl: vocationalTrainingImg,
    active: true,
  },
  {
    id: 'fnd-banner-3',
    name: 'Aulas de Aprendizaje y Cursos para el Trabajo',
    imageUrl: shortCoursesImg,
    active: true,
  },
  {
    id: 'fnd-banner-4',
    name: 'Comunidad Educativa y Desarrollo Humano',
    imageUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1920&q=80',
    active: true,
  }
];

export function getStoredCourses(): CourseData[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.COURSES);
    if (!raw) return INITIAL_COURSES;
    return JSON.parse(raw);
  } catch {
    return INITIAL_COURSES;
  }
}

export function saveStoredCourses(courses: CourseData[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.COURSES, JSON.stringify(courses));
    window.dispatchEvent(new Event('ulep_admin_courses_updated'));
  } catch (err) {
    console.error('Error saving courses:', err);
  }
}

export function getStoredAds(): AdData[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.ADS);
    if (!raw) return INITIAL_ADS;
    return JSON.parse(raw);
  } catch {
    return INITIAL_ADS;
  }
}

export function saveStoredAds(ads: AdData[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.ADS, JSON.stringify(ads));
    window.dispatchEvent(new Event('ulep_admin_ads_updated'));
  } catch (err) {
    console.error('Error saving ads:', err);
  }
}

export function getStoredImages(): SiteImagesData {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.IMAGES);
    if (!raw) return INITIAL_IMAGES;
    return JSON.parse(raw);
  } catch {
    return INITIAL_IMAGES;
  }
}

export function saveStoredImages(images: SiteImagesData): void {
  try {
    localStorage.setItem(STORAGE_KEYS.IMAGES, JSON.stringify(images));
    window.dispatchEvent(new Event('ulep_admin_images_updated'));
  } catch (err) {
    console.error('Error saving images:', err);
  }
}

export const INITIAL_ALLIES: AllyLogo[] = [
  {
    id: 'ally-alegra',
    name: 'Alegra',
    imageUrl: alegraAdImg,
    category: 'Software Contable en la Nube',
    active: true,
  },
  {
    id: 'ally-grupoulep',
    name: 'GRUPO ULEP',
    imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=400&q=80',
    category: 'Respaldo Institucional',
    active: true,
  },
  {
    id: 'ally-campus',
    name: 'Campus Virtual ULEP',
    imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=400&q=80',
    category: 'Plataforma 100% Online',
    active: true,
  },
  {
    id: 'ally-laboral',
    name: 'Formación para el Trabajo',
    imageUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=400&q=80',
    category: 'Competencias Laborales',
    active: true,
  },
  {
    id: 'ally-inclusion',
    name: 'Red de Inclusión Social',
    imageUrl: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=400&q=80',
    category: 'Becas y Equidad Educativa',
    active: true,
  }
];

export function getStoredFoundationBanners(): FoundationBanner[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.BANNERS);
    if (!raw) return INITIAL_FOUNDATION_BANNERS;
    return JSON.parse(raw);
  } catch {
    return INITIAL_FOUNDATION_BANNERS;
  }
}

export function saveStoredFoundationBanners(banners: FoundationBanner[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.BANNERS, JSON.stringify(banners));
    window.dispatchEvent(new Event('ulep_admin_foundation_banners_updated'));
  } catch (err) {
    console.error('Error saving foundation banners:', err);
  }
}

export function getStoredAllies(): AllyLogo[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.ALLIES);
    if (!raw) return INITIAL_ALLIES;
    return JSON.parse(raw);
  } catch {
    return INITIAL_ALLIES;
  }
}

export function saveStoredAllies(allies: AllyLogo[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.ALLIES, JSON.stringify(allies));
    window.dispatchEvent(new Event('ulep_admin_allies_updated'));
  } catch (err) {
    console.error('Error saving allies:', err);
  }
}

export function checkAdminSession(): boolean {
  return sessionStorage.getItem(STORAGE_KEYS.AUTH) === 'true';
}

export function setAdminSession(value: boolean): void {
  if (value) {
    sessionStorage.setItem(STORAGE_KEYS.AUTH, 'true');
  } else {
    sessionStorage.removeItem(STORAGE_KEYS.AUTH);
  }
}

export function resetAllAdminData(): void {
  localStorage.removeItem(STORAGE_KEYS.COURSES);
  localStorage.removeItem(STORAGE_KEYS.ADS);
  localStorage.removeItem(STORAGE_KEYS.IMAGES);
  localStorage.removeItem(STORAGE_KEYS.BANNERS);
  localStorage.removeItem(STORAGE_KEYS.ALLIES);
  window.dispatchEvent(new Event('ulep_admin_courses_updated'));
  window.dispatchEvent(new Event('ulep_admin_ads_updated'));
  window.dispatchEvent(new Event('ulep_admin_images_updated'));
  window.dispatchEvent(new Event('ulep_admin_foundation_banners_updated'));
  window.dispatchEvent(new Event('ulep_admin_allies_updated'));
}
