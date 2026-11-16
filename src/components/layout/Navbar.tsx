import React from 'react';
import { Scissors, Calendar, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export const Navbar: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-grizzly-black/90 border-b border-grizzly-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-grizzly-card border border-grizzly-border flex items-center justify-center text-grizzly-amber shadow-inner">
            <Scissors className="w-5 h-5 -rotate-45" />
          </div>
          <div>
            <span className="text-lg font-black tracking-wider text-grizzly-bone uppercase">
              Grizzly <span className="text-grizzly-amber">Barber</span>
            </span>
            <span className="block text-[10px] tracking-widest text-grizzly-muted uppercase font-medium">
              Cortes & Barba Clásica
            </span>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-1.5 text-xs text-grizzly-muted px-2.5 py-1 rounded bg-grizzly-card border border-grizzly-border">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            <span>OpenSpec SDD</span>
          </div>
          <Button variant="primary" size="sm">
            <Calendar className="w-4 h-4" />
            <span>Reservar Turno</span>
          </Button>
        </div>
      </div>
    </header>
  );
};
