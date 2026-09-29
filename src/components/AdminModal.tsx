import React, { useState, useEffect } from 'react';
import {
  Lock,
  Unlock,
  X,
  Plus,
  Trash2,
  Image as ImageIcon,
  BookOpen,
  Megaphone,
  CheckCircle,
  AlertCircle,
  Upload,
  RefreshCw,
  LogOut,
  Sparkles,
  Layers,
  Eye,
  Check,
  Building2
} from 'lucide-react';
import {
  CourseData,
  AdData,
  SiteImagesData,
  FoundationBanner,
  AllyLogo,
  getStoredCourses,
  saveStoredCourses,
  getStoredAds,
  saveStoredAds,
  getStoredImages,
  saveStoredImages,
  getStoredFoundationBanners,
  saveStoredFoundationBanners,
  getStoredAllies,
  saveStoredAllies,
  checkAdminSession,
  setAdminSession,
  resetAllAdminData
} from '../utils/adminStorage';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AdminModal({ isOpen, onClose }: AdminModalProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [activeTab, setActiveTab] = useState<'banners' | 'logos' | 'cursos' | 'publicidad' | 'imagenes'>('banners');
  const [notification, setNotification] = useState<string | null>(null);

  // Allies Logos state (for marquee without borders or circle)
  const [allies, setAllies] = useState<AllyLogo[]>([]);
  const [newAllyName, setNewAllyName] = useState('');
  const [newAllyCategory, setNewAllyCategory] = useState('');
  const [newAllyImage, setNewAllyImage] = useState('');

  // Foundation Banners state (NO TEXT, pure visual images for the top of Inicio)
  const [foundationBanners, setFoundationBanners] = useState<FoundationBanner[]>([]);
  const [newBannerName, setNewBannerName] = useState('');
  const [newBannerImage, setNewBannerImage] = useState('');

  // Editing state for Ads
  const [editingAdId, setEditingAdId] = useState<string | null>(null);

  // Courses state
  const [courses, setCourses] = useState<CourseData[]>([]);
  const [newCourseTitle, setNewCourseTitle] = useState('');
  const [newCourseType, setNewCourseType] = useState<'curso' | 'tecnico'>('curso');
  const [newCourseSubtitle, setNewCourseSubtitle] = useState('');
  const [newCourseDesc, setNewCourseDesc] = useState('');
  const [newCourseImage, setNewCourseImage] = useState('');
  const [newCourseBadge, setNewCourseBadge] = useState('');
  const [newCourseDuration, setNewCourseDuration] = useState('');
  const [newCourseFeatures, setNewCourseFeatures] = useState('');

  // Ads state
  const [ads, setAds] = useState<AdData[]>([]);
  const [newAdTitle, setNewAdTitle] = useState('');
  const [newAdSponsor, setNewAdSponsor] = useState('');
  const [newAdDesc, setNewAdDesc] = useState('');
  const [newAdImage, setNewAdImage] = useState('');
  const [newAdCtaText, setNewAdCtaText] = useState('Ver Publicidad');
  const [newAdCtaLink, setNewAdCtaLink] = useState('https://wa.me/573169008561');
  const [newAdBadge, setNewAdBadge] = useState('Publicidad Oficial');

  // Images state
  const [siteImages, setSiteImages] = useState<SiteImagesData>({ heroImage: '' });
  const [customHeroUrl, setCustomHeroUrl] = useState('');

  useEffect(() => {
    if (isOpen) {
      const isAuth = checkAdminSession();
      setIsAuthenticated(isAuth);
      if (isAuth) {
        loadData();
      }
    }
  }, [isOpen]);

  const loadData = () => {
    const loadedBanners = getStoredFoundationBanners();
    const loadedAllies = getStoredAllies();
    const loadedCourses = getStoredCourses();
    const loadedAds = getStoredAds();
    const loadedImages = getStoredImages();
    setFoundationBanners(loadedBanners);
    setAllies(loadedAllies);
    setCourses(loadedCourses);
    setAds(loadedAds);
    setSiteImages(loadedImages);
    setCustomHeroUrl(loadedImages.heroImage);
  };

  const notify = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3500);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'ulep2026' || password === 'admin' || password === 'admin123') {
      setIsAuthenticated(true);
      setAdminSession(true);
      setAuthError('');
      loadData();
      notify('¡Acceso concedido al Panel de Administración en Pantalla Completa!');
    } else {
      setAuthError('Contraseña incorrecta. Utiliza: ulep2026');
    }
  };

  const handleLogout = () => {
    setAdminSession(false);
    setIsAuthenticated(false);
    setPassword('');
  };

  // Allies Logos Handlers
  const handleAddAlly = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAllyName.trim() || !newAllyImage.trim()) {
      notify('Por favor ingresa nombre y sube o pega el logo');
      return;
    }
    const newAlly: AllyLogo = {
      id: `ally-${Date.now()}`,
      name: newAllyName.trim(),
      category: newAllyCategory.trim() || 'Aliado Institucional',
      imageUrl: newAllyImage.trim(),
      active: true,
    };
    const updated = [newAlly, ...allies];
    setAllies(updated);
    saveStoredAllies(updated);
    setNewAllyName('');
    setNewAllyCategory('');
    setNewAllyImage('');
    notify('Logo de aliado agregado correctamente a la marquesina');
  };

  const handleToggleAlly = (id: string) => {
    const updated = allies.map((a) =>
      a.id === id ? { ...a, active: !a.active } : a
    );
    setAllies(updated);
    saveStoredAllies(updated);
    notify('Estado del logo actualizado');
  };

  const handleDeleteAlly = (id: string) => {
    if (window.confirm('¿Seguro que deseas eliminar este logo de la marquesina?')) {
      const updated = allies.filter((a) => a.id !== id);
      setAllies(updated);
      saveStoredAllies(updated);
      notify('Logo eliminado de la marquesina');
    }
  };

  // Convert uploaded file to base64 DataURL
  const handleFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    onComplete: (dataUrl: string) => void
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 3 * 1024 * 1024) {
      alert('La imagen es muy pesada. Por favor sube una imagen menor a 3MB.');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        onComplete(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  // Foundation Banner handlers (Edge-to-Edge, NO TEXT)
  const handleAddFoundationBanner = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBannerImage.trim()) {
      alert('Por favor selecciona o ingresa una imagen para el banner');
      return;
    }

    const item: FoundationBanner = {
      id: 'fnd-banner-' + Date.now(),
      name: newBannerName.trim() || `Banner Fundación #${foundationBanners.length + 1}`,
      imageUrl: newBannerImage.trim(),
      active: true,
    };

    const updated = [item, ...foundationBanners];
    setFoundationBanners(updated);
    saveStoredFoundationBanners(updated);

    setNewBannerName('');
    setNewBannerImage('');
    notify('¡Nueva imagen de la Fundación agregada al inicio de lado a lado!');
  };

  const handleToggleFoundationBanner = (id: string) => {
    const updated = foundationBanners.map((b) => (b.id === id ? { ...b, active: !b.active } : b));
    setFoundationBanners(updated);
    saveStoredFoundationBanners(updated);
    notify('Estado de visualización actualizado');
  };

  const handleDeleteFoundationBanner = (id: string) => {
    if (confirm('¿Eliminar esta imagen del banner principal?')) {
      const updated = foundationBanners.filter((b) => b.id !== id);
      setFoundationBanners(updated);
      saveStoredFoundationBanners(updated);
      notify('Imagen eliminada del banner');
    }
  };

  // Ads handlers
  const handleSaveAd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAdTitle.trim()) {
      alert('Por favor ingresa el título');
      return;
    }

    if (editingAdId) {
      const updated = ads.map((ad) => {
        if (ad.id === editingAdId) {
          return {
            ...ad,
            title: newAdTitle.trim(),
            sponsor: newAdSponsor.trim() || 'Fundación ULEP',
            description: newAdDesc.trim(),
            imageUrl: newAdImage.trim() || ad.imageUrl,
            ctaText: newAdCtaText.trim() || 'Ver Información',
            ctaLink: newAdCtaLink.trim() || 'https://wa.me/573169008561',
            badge: newAdBadge.trim() || 'Alianza Oficial',
          };
        }
        return ad;
      });
      setAds(updated);
      saveStoredAds(updated);
      setEditingAdId(null);
      notify('¡Alianza actualizada con éxito!');
    } else {
      const adItem: AdData = {
        id: 'ad-' + Date.now(),
        title: newAdTitle.trim(),
        sponsor: newAdSponsor.trim() || 'Fundación ULEP & Aliados',
        description: newAdDesc.trim() || 'Información publicitaria oficial para la comunidad de Fundación ULEP.',
        imageUrl: newAdImage.trim() || 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1600&q=80',
        ctaText: newAdCtaText.trim() || 'Ver Información',
        ctaLink: newAdCtaLink.trim() || 'https://wa.me/573169008561',
        badge: newAdBadge.trim() || 'Alianza Oficial',
        active: true,
      };

      const updated = [adItem, ...ads];
      setAds(updated);
      saveStoredAds(updated);
      notify(`¡Alianza "${adItem.title}" agregada!`);
    }

    setNewAdTitle('');
    setNewAdSponsor('');
    setNewAdDesc('');
    setNewAdImage('');
  };

  const handleDeleteAd = (id: string) => {
    if (confirm('¿Deseas eliminar este registro?')) {
      const updated = ads.filter((ad) => ad.id !== id);
      setAds(updated);
      saveStoredAds(updated);
      notify('Registro eliminado');
    }
  };

  // Course handlers
  const handleAddCourse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCourseTitle.trim()) {
      alert('Por favor escribe el nombre del curso');
      return;
    }

    const featureList = newCourseFeatures
      ? newCourseFeatures.split('\n').filter((f) => f.trim().length > 0)
      : [
          'Formación práctica aplicada',
          'Horarios flexibles adaptados a tu tiempo',
          'Certificación oficial emitida por Fundación ULEP'
        ];

    const courseItem: CourseData = {
      id: 'curso-' + Date.now(),
      title: newCourseTitle.trim(),
      type: newCourseType,
      subtitle: newCourseSubtitle.trim() || (newCourseType === 'curso' ? 'Capacitación práctica' : 'Técnico Laboral por competencias'),
      description: newCourseDesc.trim() || 'Programa académico enfocado en el desarrollo de competencias prácticas y empleabilidad.',
      imageUrl: newCourseImage.trim() || 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80',
      badge: newCourseBadge.trim() || (newCourseType === 'curso' ? 'Nuevo Curso' : 'Nuevo Técnico'),
      duration: newCourseDuration.trim() || 'Flexible',
      features: featureList,
    };

    const updated = [...courses, courseItem];
    setCourses(updated);
    saveStoredCourses(updated);

    setNewCourseTitle('');
    setNewCourseSubtitle('');
    setNewCourseDesc('');
    setNewCourseImage('');
    setNewCourseBadge('');
    setNewCourseDuration('');
    setNewCourseFeatures('');
    notify(`¡Curso "${courseItem.title}" agregado con éxito a la página!`);
  };

  const handleDeleteCourse = (id: string) => {
    if (confirm('¿Estás seguro de eliminar este curso/programa de la página?')) {
      const updated = courses.filter((c) => c.id !== id);
      setCourses(updated);
      saveStoredCourses(updated);
      notify('Curso eliminado con éxito');
    }
  };

  // Image handlers
  const handleSaveHeroImage = () => {
    if (!customHeroUrl.trim()) return;
    const updated: SiteImagesData = {
      ...siteImages,
      heroImage: customHeroUrl.trim(),
    };
    setSiteImages(updated);
    saveStoredImages(updated);
    notify('¡Imagen del banner principal actualizada en la página!');
  };

  const handleResetDefaults = () => {
    if (confirm('¿Restablecer todos los cursos, banners de la fundación e imágenes a su estado inicial?')) {
      resetAllAdminData();
      loadData();
      notify('Contenido restablecido a valores iniciales');
    }
  };

  if (!isOpen) return null;

  return (
    /* FULL SCREEN CONTAINER (ABRE EN TODA LA PANTALLA CON MÁXIMO Z-INDEX) */
    <div className="fixed inset-0 w-full h-full min-h-screen z-[100] bg-slate-900 flex flex-col overflow-hidden text-slate-900 animate-in fade-in duration-200">
      
      {/* Top Header Bar: Responsive for Mobile, Tablet, PC */}
      <header className="h-14 sm:h-16 px-3 sm:px-6 bg-slate-900 border-b border-slate-800 text-white flex items-center justify-between shrink-0 select-none shadow-md">
        <div className="flex items-center gap-2.5 sm:gap-3">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-[#0035ab] text-white flex items-center justify-center shadow-lg shadow-[#0035ab]/30 shrink-0">
            {isAuthenticated ? <Unlock className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400" /> : <Lock className="w-4 h-4 sm:w-5 sm:h-5" />}
          </div>
          <div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <h2 className="font-display font-black text-sm sm:text-base md:text-lg tracking-tight text-white leading-tight">
                Panel Admin ULEP
              </h2>
              <span className="text-[8px] sm:text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 shrink-0">
                Pantalla Completa
              </span>
            </div>
            <p className="text-[10px] sm:text-[11px] text-slate-400 hidden sm:block">
              Gestor de imágenes institucionales del inicio, cursos y contenidos
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {isAuthenticated && (
            <button
              type="button"
              onClick={handleLogout}
              className="px-2.5 sm:px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-red-500/20 text-slate-300 hover:text-red-400 border border-slate-700 transition-colors cursor-pointer text-xs font-bold flex items-center gap-1.5 min-h-[36px]"
              title="Cerrar sesión de administrador"
            >
              <LogOut className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">Cerrar Sesión</span>
            </button>
          )}

          <button
            type="button"
            onClick={onClose}
            className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-950 font-extrabold text-xs shadow-md transition-all cursor-pointer flex items-center gap-1.5 min-h-[36px]"
            aria-label="Cerrar panel de administración"
          >
            <X className="w-4 h-4 text-slate-900" />
            <span className="hidden xs:inline">Cerrar Panel</span>
            <span className="xs:hidden">Salir</span>
          </button>
        </div>
      </header>

      {/* Notification Toast */}
      {notification && (
        <div className="bg-emerald-600 text-white px-6 py-2.5 text-xs font-bold flex items-center justify-between shadow-lg shrink-0 animate-in slide-in-from-top-1">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4" />
            <span>{notification}</span>
          </div>
          <button onClick={() => setNotification(null)} className="text-white/80 hover:text-white">
            ✕
          </button>
        </div>
      )}

      {/* MAIN BODY AREA */}
      <div className="flex-1 bg-slate-100 overflow-hidden flex flex-col">
        
        {/* PASSWORD SCREEN (Si no está autenticado) */}
        {!isAuthenticated ? (
          <div className="flex-1 flex items-center justify-center p-6 overflow-y-auto">
            <div className="bg-white max-w-md w-full rounded-3xl p-8 shadow-2xl border border-slate-200 text-center space-y-6 animate-in zoom-in-95 duration-200">
              <div className="w-16 h-16 rounded-2xl bg-blue-50 border border-blue-200 text-[#0035ab] flex items-center justify-center mx-auto shadow-md">
                <Lock className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl font-black font-display text-slate-900">
                  Acceso de Administrador
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Ingresa tu clave de seguridad para administrar las imágenes panorámicas de la fundación, cursos y contenidos.
                </p>
              </div>

              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Contraseña de administrador..."
                    autoFocus
                    className="w-full px-4 py-3.5 bg-slate-50 border border-slate-300 rounded-2xl text-slate-900 text-center font-bold text-sm tracking-wider focus:outline-none focus:ring-2 focus:ring-[#0035ab] focus:border-[#0035ab] focus:bg-white transition-all shadow-inner"
                  />
                  {authError && (
                    <p className="text-red-600 text-xs font-bold mt-2 flex items-center justify-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{authError}</span>
                    </p>
                  )}
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-left text-xs text-amber-900 space-y-1">
                  <span className="font-extrabold uppercase text-[10px] tracking-wider block text-amber-800">
                    🔑 Contraseña por Defecto:
                  </span>
                  <p className="font-mono font-bold text-amber-950">
                    ulep2026 <span className="font-normal text-amber-800">(o admin)</span>
                  </p>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-[#0035ab] hover:bg-[#002477] text-white font-extrabold text-sm rounded-full shadow-xl shadow-[#0035ab]/25 transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <Unlock className="w-4 h-4 text-amber-300" />
                  <span>Desbloquear y Entrar al Panel</span>
                </button>
              </form>
            </div>
          </div>
        ) : (
          /* FULL SCREEN DASHBOARD CONTENT */
          <div className="flex-1 flex flex-col overflow-hidden">
            
            {/* Top Navigation Tabs */}
            <div className="bg-white border-b border-slate-200 px-6 sm:px-10 py-3 flex items-center justify-between gap-4 shrink-0 shadow-xs">
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
                
                <button
                  type="button"
                  onClick={() => setActiveTab('banners')}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer shrink-0 ${
                    activeTab === 'banners'
                      ? 'bg-[#0035ab] text-white shadow-md shadow-[#0035ab]/20'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <Layers className="w-4 h-4" />
                  <span>Banners de la Fundación (Inicio de lado a lado) ({foundationBanners.length})</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('logos')}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer shrink-0 ${
                    activeTab === 'logos'
                      ? 'bg-[#0035ab] text-white shadow-md shadow-[#0035ab]/20'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <Sparkles className="w-4 h-4 text-emerald-500" />
                  <span>Logos Aliados (Marquesina) ({allies.length})</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('cursos')}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer shrink-0 ${
                    activeTab === 'cursos'
                      ? 'bg-[#0035ab] text-white shadow-md shadow-[#0035ab]/20'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Cursos y Técnicos ({courses.length})</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('publicidad')}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer shrink-0 ${
                    activeTab === 'publicidad'
                      ? 'bg-[#0035ab] text-white shadow-md shadow-[#0035ab]/20'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <Megaphone className="w-4 h-4" />
                  <span>Alianzas (Alegra y ONG) ({ads.length})</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('imagenes')}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer shrink-0 ${
                    activeTab === 'imagenes'
                      ? 'bg-[#0035ab] text-white shadow-md shadow-[#0035ab]/20'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <ImageIcon className="w-4 h-4" />
                  <span>Foto del Hero</span>
                </button>

              </div>

              <div className="hidden lg:flex items-center gap-2 text-xs text-slate-500 font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Modo Pantalla Completa Activo</span>
              </div>
            </div>

            {/* Scrollable Workspace */}
            <div className="flex-1 overflow-y-auto p-6 sm:p-10 space-y-8">
              
              {/* TAB 1: LOGOS DE ALIADOS (MARQUESINA SIN BORDES NI CÍRCULOS) */}
              {activeTab === 'logos' && (
                <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-200">
                  
                  {/* Top Notice */}
                  <div className="bg-gradient-to-r from-blue-900 via-[#0035ab] to-indigo-900 text-white p-6 rounded-3xl shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-400 text-slate-950 font-black text-[10px] uppercase tracking-wider">
                        ★ Marquesina en Movimiento Lento
                      </div>
                      <h3 className="text-xl sm:text-2xl font-black font-display">
                        Gestor de Logos de Aliados Institucionales
                      </h3>
                      <p className="text-xs sm:text-sm text-blue-100 max-w-2xl leading-relaxed">
                        Los logos se proyectan de forma <strong>limpia, sin bordes de tarjeta y sin círculos</strong> en la marquesina de desplazamiento suave del inicio.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={onClose}
                      className="px-5 py-2.5 rounded-xl bg-white hover:bg-blue-50 text-[#0035ab] font-extrabold text-xs shadow-md transition-all shrink-0 flex items-center gap-1.5 cursor-pointer"
                    >
                      <Eye className="w-4 h-4" />
                      <span>Ver en la Página</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    
                    {/* Left: Form to Add New Logo (5 cols) */}
                    <div className="lg:col-span-5 bg-white border border-slate-200 rounded-3xl p-6 sm:p-7 shadow-lg space-y-5 h-fit">
                      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                        <div className="flex items-center gap-2">
                          <Plus className="w-5 h-5 text-[#0035ab]" />
                          <h4 className="font-display font-black text-base text-slate-900">
                            Agregar Nuevo Logo de Aliado
                          </h4>
                        </div>
                      </div>

                      <form onSubmit={handleAddAlly} className="space-y-4">
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            Nombre del Aliado o Institución *
                          </label>
                          <input
                            type="text"
                            required
                            value={newAllyName}
                            onChange={(e) => setNewAllyName(e.target.value)}
                            placeholder="Ej. Alegra / Sena / DIAN / Google for Education"
                            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0035ab] focus:bg-white"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            Categoría o Tipo de Alianza
                          </label>
                          <input
                            type="text"
                            value={newAllyCategory}
                            onChange={(e) => setNewAllyCategory(e.target.value)}
                            placeholder="Ej. Software Contable en la Nube / Respaldo Oficial"
                            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0035ab] focus:bg-white"
                          />
                        </div>

                        {/* Logo Image */}
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            Imagen o Logo (PNG / JPG / SVG) *
                          </label>
                          <div className="flex flex-col sm:flex-row gap-2">
                            <input
                              type="text"
                              required
                              value={newAllyImage}
                              onChange={(e) => setNewAllyImage(e.target.value)}
                              placeholder="URL del logo o sube un archivo"
                              className="flex-1 px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0035ab] focus:bg-white"
                            />
                            <label className="px-4 py-2.5 bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-bold rounded-xl cursor-pointer flex items-center justify-center gap-1.5 shrink-0 transition-colors">
                              <Upload className="w-3.5 h-3.5" />
                              <span>Subir Logo</span>
                              <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => handleFileUpload(e, (dataUrl) => setNewAllyImage(dataUrl))}
                              />
                            </label>
                          </div>

                          {/* Borderless Logo Preview */}
                          {newAllyImage && (
                            <div className="mt-3 p-4 bg-slate-50 rounded-2xl border border-dashed border-slate-300 flex flex-col items-center justify-center gap-2">
                              <span className="text-[10px] font-bold text-slate-400 uppercase">
                                Vista previa exacta en la marquesina (Solo logo)
                              </span>
                              <div className="h-12 flex items-center justify-center">
                                <img
                                  src={newAllyImage}
                                  alt="Preview"
                                  className="max-h-12 w-auto max-w-[160px] object-contain"
                                />
                              </div>
                            </div>
                          )}
                        </div>

                        <p className="text-[11px] text-slate-500 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-200">
                          ℹ️ En la página de inicio se mostrará <strong>únicamente el logo</strong>, de manera limpia, sin textos encima ni marcos circulares.
                        </p>

                        <button
                          type="submit"
                          className="w-full py-3.5 bg-[#0035ab] hover:bg-[#002477] text-white font-extrabold text-xs rounded-xl shadow-lg shadow-[#0035ab]/25 transition-all cursor-pointer flex items-center justify-center gap-2"
                        >
                          <Plus className="w-4 h-4 text-white" />
                          <span>Guardar Logo en la Marquesina</span>
                        </button>
                      </form>
                    </div>

                    {/* Right: Existing Allies Logos List (7 cols) */}
                    <div className="lg:col-span-7 space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="font-display font-black text-lg text-slate-900">
                          Logos Registrados ({allies.length})
                        </h4>
                        <span className="text-xs text-slate-500 font-medium">
                          Desplazamiento suave y continuo
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {allies.map((ally) => (
                          <div
                            key={ally.id}
                            className={`bg-white border rounded-2xl p-4 shadow-sm flex flex-col justify-between space-y-3 transition-all ${
                              ally.active ? 'border-slate-200 hover:border-[#0035ab]' : 'border-slate-200 opacity-60 bg-slate-50'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              {/* Logo without circle or border */}
                              <div className="h-10 w-16 flex items-center justify-center shrink-0">
                                <img
                                  src={ally.imageUrl}
                                  alt={ally.name}
                                  className="max-h-10 w-auto max-w-full object-contain"
                                />
                              </div>

                              <div className="min-w-0">
                                <h5 className="font-extrabold text-xs text-slate-900 truncate">
                                  {ally.name}
                                </h5>
                                <p className="text-[10px] text-slate-500 truncate">
                                  {ally.category}
                                </p>
                              </div>
                            </div>

                            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                              <button
                                type="button"
                                onClick={() => handleToggleAlly(ally.id)}
                                className={`px-3 py-1 rounded-lg font-bold text-xs cursor-pointer transition-colors ${
                                  ally.active
                                    ? 'bg-amber-50 text-amber-800 hover:bg-amber-100'
                                    : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
                                }`}
                              >
                                {ally.active ? 'Pausar' : 'Activar'}
                              </button>

                              <button
                                type="button"
                                onClick={() => handleDeleteAlly(ally.id)}
                                className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg cursor-pointer"
                                title="Eliminar logo"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>
                </div>
              )}

              {/* TAB 2: BANNERS DE LA FUNDACIÓN */}
              {activeTab === 'banners' && (
                <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-200">
                  
                  {/* Notice */}
                  <div className="bg-gradient-to-r from-blue-900 via-[#0035ab] to-indigo-900 text-white p-6 rounded-3xl shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-400 text-slate-950 font-black text-[10px] uppercase tracking-wider">
                        ★ Panel Principal de la Fundación (De Lado a Lado)
                      </div>
                      <h3 className="text-xl sm:text-2xl font-black font-display">
                        Imágenes Panorámicas de la Fundación (Sin Texto Encima)
                      </h3>
                      <p className="text-xs sm:text-sm text-blue-100 max-w-2xl leading-relaxed">
                        Estas imágenes se proyectan de <strong>extremo izquierdo a extremo derecho</strong> justo encima del título principal en el inicio. <strong>No llevan nada escrito por encima</strong>, mostrando limpiamente fotografías, afiches y actividades de la Fundación ULEP.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={onClose}
                      className="px-5 py-2.5 rounded-xl bg-white hover:bg-blue-50 text-[#0035ab] font-extrabold text-xs shadow-md transition-all shrink-0 flex items-center gap-1.5 cursor-pointer"
                    >
                      <Eye className="w-4 h-4" />
                      <span>Ver en la Página</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    
                    {/* Left: Upload New Foundation Banner (5 cols) */}
                    <div className="lg:col-span-5 bg-white border border-slate-200 rounded-3xl p-6 sm:p-7 shadow-lg space-y-5 h-fit">
                      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                        <div className="flex items-center gap-2">
                          <Plus className="w-5 h-5 text-[#0035ab]" />
                          <h4 className="font-display font-black text-base text-slate-900">
                            Agregar Nueva Imagen al Banner
                          </h4>
                        </div>
                      </div>

                      <form onSubmit={handleAddFoundationBanner} className="space-y-4">
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            Nombre o Descripción (Solo para referencia interna)
                          </label>
                          <input
                            type="text"
                            value={newBannerName}
                            onChange={(e) => setNewBannerName(e.target.value)}
                            placeholder="Ej. Fotos de Graduación / Taller de Sistemas / Campus"
                            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0035ab] focus:bg-white"
                          />
                        </div>

                        {/* Image Source */}
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            Fotografía o Afiche (Sin texto añadido por la web) *
                          </label>
                          <div className="flex flex-col sm:flex-row gap-2">
                            <input
                              type="text"
                              required
                              value={newBannerImage}
                              onChange={(e) => setNewBannerImage(e.target.value)}
                              placeholder="URL de imagen (https://...) o sube un archivo"
                              className="flex-1 px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0035ab] focus:bg-white"
                            />
                            <label className="px-4 py-2.5 bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-bold rounded-xl cursor-pointer flex items-center justify-center gap-1.5 shrink-0 transition-colors">
                              <Upload className="w-3.5 h-3.5" />
                              <span>Subir Foto</span>
                              <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => handleFileUpload(e, (dataUrl) => setNewBannerImage(dataUrl))}
                              />
                            </label>
                          </div>

                          {newBannerImage && (
                            <div className="mt-3 relative rounded-2xl overflow-hidden border border-slate-300 h-36">
                              <img
                                src={newBannerImage}
                                alt="Preview"
                                className="w-full h-full object-cover"
                              />
                              <span className="absolute bottom-2 left-2 bg-slate-950/80 text-white text-[10px] px-2.5 py-1 rounded-md font-bold">
                                Vista previa de imagen limpia
                              </span>
                            </div>
                          )}
                        </div>

                        <p className="text-[11px] text-slate-500 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-200">
                          ℹ️ Esta imagen se mostrará tal como la subes, en formato panorámico de lado a lado sin textos, botones o leyendas flotantes encima.
                        </p>

                        <button
                          type="submit"
                          className="w-full py-3.5 bg-[#0035ab] hover:bg-[#002477] text-white font-extrabold text-xs rounded-xl shadow-lg shadow-[#0035ab]/25 transition-all cursor-pointer flex items-center justify-center gap-2"
                        >
                          <Plus className="w-4 h-4 text-white" />
                          <span>Agregar al Banner del Inicio</span>
                        </button>
                      </form>
                    </div>

                    {/* Right: Existing Foundation Banners List (7 cols) */}
                    <div className="lg:col-span-7 space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="font-display font-black text-lg text-slate-900">
                          Imágenes en Rotación ({foundationBanners.length})
                        </h4>
                        <span className="text-xs text-slate-500 font-medium">
                          Rotan automáticamente cada 5 segundos
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {foundationBanners.map((banner, index) => (
                          <div
                            key={banner.id}
                            className={`bg-white border rounded-3xl p-4 shadow-md flex flex-col justify-between space-y-3 transition-all ${
                              banner.active ? 'border-slate-200 hover:border-[#0035ab]' : 'border-slate-200 opacity-60 bg-slate-50'
                            }`}
                          >
                            <div className="space-y-2">
                              <div className="h-36 rounded-2xl overflow-hidden border border-slate-200 relative">
                                <img
                                  src={banner.imageUrl}
                                  alt={banner.name}
                                  className="w-full h-full object-cover"
                                />
                                <span className="absolute top-2 left-2 bg-slate-950/80 text-white text-[10px] px-2 py-0.5 rounded font-black">
                                  Slide #{index + 1}
                                </span>
                              </div>

                              <div className="flex items-center justify-between">
                                <h5 className="font-extrabold text-xs text-slate-900 truncate max-w-[170px]">
                                  {banner.name}
                                </h5>
                                <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-full ${
                                  banner.active ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-600'
                                }`}>
                                  {banner.active ? 'Activa' : 'Pausada'}
                                </span>
                              </div>
                            </div>

                            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                              <button
                                type="button"
                                onClick={() => handleToggleFoundationBanner(banner.id)}
                                className={`px-3 py-1 rounded-lg font-bold text-xs cursor-pointer transition-colors ${
                                  banner.active
                                    ? 'bg-amber-50 text-amber-800 hover:bg-amber-100'
                                    : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
                                }`}
                              >
                                {banner.active ? 'Pausar' : 'Activar'}
                              </button>

                              <button
                                type="button"
                                onClick={() => handleDeleteFoundationBanner(banner.id)}
                                className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg cursor-pointer"
                                title="Eliminar imagen del banner"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>
                </div>
              )}

              {/* TAB 2: CURSOS NUEVOS */}
              {activeTab === 'cursos' && (
                <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-200">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    
                    {/* Left Form: Add Course (5 cols) */}
                    <div className="lg:col-span-5 bg-white border border-slate-200 rounded-3xl p-6 sm:p-7 shadow-lg space-y-5 h-fit">
                      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                        <div className="flex items-center gap-2">
                          <Plus className="w-5 h-5 text-[#0035ab]" />
                          <h4 className="font-display font-black text-base text-slate-900">
                            Publicar Nuevo Curso o Técnico
                          </h4>
                        </div>
                      </div>

                      <form onSubmit={handleAddCourse} className="space-y-4">
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            Nombre del Programa *
                          </label>
                          <input
                            type="text"
                            required
                            value={newCourseTitle}
                            onChange={(e) => setNewCourseTitle(e.target.value)}
                            placeholder="Ej. Curso de Facturación Electrónica"
                            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0035ab] focus:bg-white"
                          />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1">
                              Categoría *
                            </label>
                            <select
                              value={newCourseType}
                              onChange={(e) => setNewCourseType(e.target.value as any)}
                              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0035ab]"
                            >
                              <option value="curso">Curso para el Trabajo (Corto)</option>
                              <option value="tecnico">Técnico para el Trabajo (Laboral)</option>
                            </select>
                          </div>

                          <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1">
                              Insignia / Badge
                            </label>
                            <input
                              type="text"
                              value={newCourseBadge}
                              onChange={(e) => setNewCourseBadge(e.target.value)}
                              placeholder="Ej. Beca 50% / Convocatoria"
                              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0035ab]"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            Subtítulo / Módulo
                          </label>
                          <input
                            type="text"
                            value={newCourseSubtitle}
                            onChange={(e) => setNewCourseSubtitle(e.target.value)}
                            placeholder="Ej. Capacitación práctica intensiva"
                            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0035ab]"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            Descripción del Curso
                          </label>
                          <textarea
                            rows={3}
                            value={newCourseDesc}
                            onChange={(e) => setNewCourseDesc(e.target.value)}
                            placeholder="Objetivos y competencias prácticas..."
                            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0035ab]"
                          />
                        </div>

                        {/* Image */}
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            Foto de Portada del Curso
                          </label>
                          <div className="flex flex-col sm:flex-row gap-2">
                            <input
                              type="text"
                              value={newCourseImage}
                              onChange={(e) => setNewCourseImage(e.target.value)}
                              placeholder="URL de imagen o archivo"
                              className="flex-1 px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0035ab]"
                            />
                            <label className="px-3.5 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-bold rounded-xl cursor-pointer flex items-center justify-center gap-1.5 shrink-0 transition-colors">
                              <Upload className="w-3.5 h-3.5" />
                              <span>Subir</span>
                              <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => handleFileUpload(e, (dataUrl) => setNewCourseImage(dataUrl))}
                              />
                            </label>
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            Competencias Clave (Una por línea)
                          </label>
                          <textarea
                            rows={3}
                            value={newCourseFeatures}
                            onChange={(e) => setNewCourseFeatures(e.target.value)}
                            placeholder="Manejo de herramientas contables&#10;Modalidades virtual y presencial&#10;Certificación oficial ULEP"
                            className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-mono text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0035ab]"
                          />
                        </div>

                        <button
                          type="submit"
                          className="w-full py-3.5 bg-[#0035ab] hover:bg-[#002477] text-white font-extrabold text-xs rounded-xl shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2"
                        >
                          <Plus className="w-4 h-4 text-white" />
                          <span>Agregar Curso a la Oferta Académica</span>
                        </button>
                      </form>
                    </div>

                    {/* Right Side: Courses List (7 cols) */}
                    <div className="lg:col-span-7 space-y-4">
                      <h4 className="font-display font-black text-lg text-slate-900">
                        Cursos Registrados en la Página ({courses.length})
                      </h4>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {courses.map((course) => (
                          <div
                            key={course.id}
                            className="bg-white border border-slate-200 rounded-3xl p-4 shadow-md flex flex-col justify-between space-y-3"
                          >
                            <div className="space-y-3">
                              <div className="h-36 rounded-2xl overflow-hidden border border-slate-200">
                                <img
                                  src={course.imageUrl}
                                  alt={course.title}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-blue-50 text-[#0035ab] border border-blue-200 inline-block">
                                {course.type === 'curso' ? 'Curso Corto' : 'Técnico Laboral'}
                              </span>
                              <h5 className="font-display font-black text-base text-slate-900">
                                {course.title}
                              </h5>
                              <p className="text-xs text-slate-600 line-clamp-2">
                                {course.description}
                              </p>
                            </div>

                            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                              <span className="text-slate-500 font-bold text-[11px]">
                                {course.badge || 'Activo'}
                              </span>
                              <button
                                type="button"
                                onClick={() => handleDeleteCourse(course.id)}
                                className="text-red-500 hover:text-red-700 hover:bg-red-50 p-1.5 rounded-lg transition-colors cursor-pointer flex items-center gap-1 font-bold"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                                <span>Eliminar</span>
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>
                </div>
              )}

              {/* TAB 3: ALIANZAS Y PUBLICIDAD */}
              {activeTab === 'publicidad' && (
                <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-200">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    
                    {/* Left Form: Add / Edit Ad (5 cols) */}
                    <div className="lg:col-span-5 bg-white border border-slate-200 rounded-3xl p-6 sm:p-7 shadow-lg space-y-5 h-fit">
                      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                        <div className="flex items-center gap-2">
                          <Plus className="w-5 h-5 text-[#0035ab]" />
                          <h4 className="font-display font-black text-base text-slate-900">
                            Agregar Alianza o Convenio
                          </h4>
                        </div>
                      </div>

                      <form onSubmit={handleSaveAd} className="space-y-4">
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            Título de la Alianza *
                          </label>
                          <input
                            type="text"
                            required
                            value={newAdTitle}
                            onChange={(e) => setNewAdTitle(e.target.value)}
                            placeholder="Ej. Convenio con Alegra"
                            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0035ab] focus:bg-white"
                          />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1">
                              Aliado / Patrocinador
                            </label>
                            <input
                              type="text"
                              value={newAdSponsor}
                              onChange={(e) => setNewAdSponsor(e.target.value)}
                              placeholder="Ej. Alegra"
                              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0035ab] focus:bg-white"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1">
                              Insignia
                            </label>
                            <input
                              type="text"
                              value={newAdBadge}
                              onChange={(e) => setNewAdBadge(e.target.value)}
                              placeholder="Ej. Alianza Oficial"
                              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0035ab] focus:bg-white"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            Descripción
                          </label>
                          <textarea
                            rows={3}
                            value={newAdDesc}
                            onChange={(e) => setNewAdDesc(e.target.value)}
                            placeholder="Detalles del convenio..."
                            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0035ab] focus:bg-white"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            Imagen o Afiche
                          </label>
                          <div className="flex flex-col sm:flex-row gap-2">
                            <input
                              type="text"
                              value={newAdImage}
                              onChange={(e) => setNewAdImage(e.target.value)}
                              placeholder="URL de imagen o archivo"
                              className="flex-1 px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0035ab]"
                            />
                            <label className="px-3.5 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-bold rounded-xl cursor-pointer flex items-center justify-center gap-1.5 shrink-0 transition-colors">
                              <Upload className="w-3.5 h-3.5" />
                              <span>Subir</span>
                              <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => handleFileUpload(e, (dataUrl) => setNewAdImage(dataUrl))}
                              />
                            </label>
                          </div>
                        </div>

                        <button
                          type="submit"
                          className="w-full py-3.5 bg-[#0035ab] hover:bg-[#002477] text-white font-extrabold text-xs rounded-xl shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2"
                        >
                          <Plus className="w-4 h-4 text-white" />
                          <span>Guardar Alianza</span>
                        </button>
                      </form>
                    </div>

                    {/* Right: List of Ads (7 cols) */}
                    <div className="lg:col-span-7 space-y-4">
                      <h4 className="font-display font-black text-lg text-slate-900">
                        Alianzas y Convenios Registrados ({ads.length})
                      </h4>

                      <div className="space-y-3">
                        {ads.map((ad) => (
                          <div
                            key={ad.id}
                            className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm flex items-center justify-between gap-4"
                          >
                            <div className="flex items-center gap-3">
                              <img
                                src={ad.imageUrl}
                                alt={ad.title}
                                className="w-16 h-16 rounded-xl object-cover border border-slate-200 shrink-0"
                              />
                              <div>
                                <h5 className="font-extrabold text-sm text-slate-900">
                                  {ad.title}
                                </h5>
                                <p className="text-xs text-slate-500">{ad.sponsor}</p>
                              </div>
                            </div>

                            <button
                              type="button"
                              onClick={() => handleDeleteAd(ad.id)}
                              className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg cursor-pointer"
                              title="Eliminar"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>
                </div>
              )}

              {/* TAB 4: BANNER PRINCIPAL (HERO) */}
              {activeTab === 'imagenes' && (
                <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-200">
                  <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-lg space-y-5">
                    <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
                      <ImageIcon className="w-5 h-5 text-[#0035ab]" />
                      <h4 className="font-display font-black text-lg text-slate-900">
                        Foto del Hero de Estudiantes
                      </h4>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed">
                      Sube una fotografía de estudiantes para la sección de cabecera.
                    </p>

                    <div className="space-y-4">
                      <div className="flex flex-col sm:flex-row gap-3">
                        <input
                          type="text"
                          value={customHeroUrl}
                          onChange={(e) => setCustomHeroUrl(e.target.value)}
                          placeholder="Pega la URL de la imagen o selecciona un archivo..."
                          className="flex-1 px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0035ab] focus:bg-white"
                        />

                        <label className="px-5 py-3 bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-bold rounded-xl cursor-pointer flex items-center justify-center gap-2 shrink-0 transition-colors">
                          <Upload className="w-4 h-4" />
                          <span>Subir desde mi Equipo</span>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => handleFileUpload(e, (dataUrl) => setCustomHeroUrl(dataUrl))}
                          />
                        </label>
                      </div>

                      {customHeroUrl && (
                        <div className="relative rounded-2xl overflow-hidden border border-slate-300 h-64 shadow-inner">
                          <img
                            src={customHeroUrl}
                            alt="Hero Preview"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}

                      <button
                        type="button"
                        onClick={handleSaveHeroImage}
                        className="px-8 py-3.5 bg-[#0035ab] hover:bg-[#002477] text-white font-extrabold text-xs rounded-xl shadow-md transition-all cursor-pointer flex items-center gap-2"
                      >
                        <CheckCircle className="w-4 h-4" />
                        <span>Guardar Imagen</span>
                      </button>
                    </div>
                  </div>

                  {/* Reset defaults */}
                  <div className="pt-6 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
                    <span>¿Deseas volver al contenido predeterminado del sitio?</span>
                    <button
                      type="button"
                      onClick={handleResetDefaults}
                      className="text-slate-600 hover:text-red-600 hover:bg-red-50 px-4 py-2 rounded-xl font-bold flex items-center gap-1.5 transition-colors cursor-pointer border border-slate-300"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>Restablecer Todo a Valores Iniciales</span>
                    </button>
                  </div>
                </div>
              )}

            </div>

            {/* Bottom Status Bar */}
            <footer className="h-12 bg-white border-t border-slate-200 px-6 sm:px-10 flex items-center justify-between text-xs text-slate-500 shrink-0">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                Los cambios se guardan localmente y se actualizan al instante en la página.
              </span>
              <button
                type="button"
                onClick={onClose}
                className="font-bold text-[#0035ab] hover:underline cursor-pointer"
              >
                Volver a la Página Web →
              </button>
            </footer>

          </div>
        )}

      </div>
    </div>
  );
}
