import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Button } from '@/components/ui/Button';
import { 
  Scissors, 
  Calendar, 
  Clock, 
  Sparkles, 
  CheckCircle2, 
  Flame, 
  ShieldCheck, 
  Layers 
} from 'lucide-react';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-grizzly-black text-grizzly-bone flex flex-col">
      {/* Barra de Navegación */}
      <Navbar />

      {/* Hero Section */}
      <main className="flex-1">
        <section className="relative overflow-hidden py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto text-center">
          {/* Luz de fondo sutil */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-grizzly-amber/10 rounded-full blur-3xl pointer-events-none -z-10" />

          {/* Badge superior */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-grizzly-card border border-grizzly-border text-grizzly-amber text-xs font-semibold tracking-wide uppercase mb-6 animate-pulse">
            <Flame className="w-3.5 h-3.5 text-grizzly-amber" />
            <span>Barbería Tradicional & Moderna</span>
          </div>

          {/* Título Principal */}
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-grizzly-bone mb-6 leading-tight">
            Cortes Clásicos, Barba Impecable, <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-grizzly-amber to-amber-200">
              Estilo Legendario.
            </span>
          </h1>

          {/* Subtítulo */}
          <p className="max-w-2xl mx-auto text-base sm:text-lg text-grizzly-muted mb-10 leading-relaxed">
            La experiencia auténtica de barbería en tu ciudad. Elige tu barbero de confianza, selecciona tu servicio y asegura tu turno en 3 simples pasos.
          </p>

          {/* Botones de Acción */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto mb-16">
            <Button variant="primary" size="lg" className="w-full sm:w-auto">
              <Calendar className="w-5 h-5" />
              <span>Agendar mi Cita</span>
            </Button>
            <Button variant="secondary" size="lg" className="w-full sm:w-auto">
              <Scissors className="w-5 h-5 text-grizzly-amber" />
              <span>Ver Servicios & Precios</span>
            </Button>
          </div>

          {/* Tarjetas de Características Destacadas */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left max-w-5xl mx-auto mb-16">
            <div className="p-6 rounded-xl bg-grizzly-card border border-grizzly-border hover:border-grizzly-amber/50 transition-colors">
              <div className="w-12 h-12 rounded-lg bg-grizzly-black border border-grizzly-border flex items-center justify-center text-grizzly-amber mb-4">
                <Scissors className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-grizzly-bone mb-2">Cortes & Barba Clásica</h3>
              <p className="text-sm text-grizzly-muted leading-relaxed">
                Técnicas tradicionales con navaja, toalla caliente y productos premium para el cuidado masculino.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-grizzly-card border border-grizzly-border hover:border-grizzly-amber/50 transition-colors">
              <div className="w-12 h-12 rounded-lg bg-grizzly-black border border-grizzly-border flex items-center justify-center text-grizzly-amber mb-4">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-grizzly-bone mb-2">Sin Esperas Innecesarias</h3>
              <p className="text-sm text-grizzly-muted leading-relaxed">
                Reserva tu franja exacta en tiempo real. Tu barbero te estará esperando puntualmente en tu sillón.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-grizzly-card border border-grizzly-border hover:border-grizzly-amber/50 transition-colors">
              <div className="w-12 h-12 rounded-lg bg-grizzly-black border border-grizzly-border flex items-center justify-center text-grizzly-amber mb-4">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-grizzly-bone mb-2">Confirmación Directa</h3>
              <p className="text-sm text-grizzly-muted leading-relaxed">
                Resumen instantáneo de tu cita y confirmación directa con la barbería a través de WhatsApp.
              </p>
            </div>
          </div>

          {/* Estado del Sistema (Verificación de Infraestructura) */}
          <div className="p-6 rounded-xl bg-grizzly-card/60 border border-grizzly-border max-w-3xl mx-auto text-left">
            <div className="flex items-center gap-2 mb-4">
              <Layers className="w-5 h-5 text-grizzly-amber" />
              <h4 className="text-sm font-bold tracking-wide uppercase text-grizzly-bone">
                Infraestructura del Proyecto (Verificada)
              </h4>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-grizzly-muted">React 18 + Vite 6</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-grizzly-muted">Tailwind CSS 3.4</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-grizzly-muted">TypeScript Estricto</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-grizzly-muted">OpenSpec (SDD)</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-grizzly-border py-6 text-center text-xs text-grizzly-muted bg-grizzly-card/30">
        <div className="flex items-center justify-center gap-1.5 mb-1 text-grizzly-bone font-medium">
          <ShieldCheck className="w-4 h-4 text-grizzly-amber" />
          <span>Grizzly Barber &copy; {new Date().getFullYear()}</span>
        </div>
        <p>Desarrollado con arquitectura moderna, Firebase Cloud Firestore y Firebase Hosting.</p>
      </footer>
    </div>
  );
};

export default App;
