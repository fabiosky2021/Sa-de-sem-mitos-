import React from 'react';
import { ASSETS } from '../data/constants';

interface SponsorBannerProps {
  className?: string;
}

export const SponsorBanner: React.FC<SponsorBannerProps> = ({ className = '' }) => {
  return (
    <div className={`w-full bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex flex-col gap-space-xs border border-outline-variant/30 ${className}`}>
      <div className="flex items-center justify-between">
        <span className="font-label-sm text-label-sm text-outline uppercase tracking-wider font-bold">
          Apoio Educativo Independente
        </span>
        <span className="material-symbols-outlined text-outline text-sm">verified_user</span>
      </div>

      <div className="flex items-center gap-space-sm pt-1">
        <img
          alt="Associação Brasileira de Fitoterapia & Ervas"
          className="w-12 h-12 rounded-lg object-contain bg-surface-container-low p-1 border border-outline-variant/20 shrink-0"
          src={ASSETS.sponsorBadge}
        />
        <div className="flex flex-col min-w-0">
          <span className="font-label-lg text-label-lg text-on-surface font-bold truncate">
            Associação Brasileira de Fitoterapia & Ervas
          </span>
          <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2">
            Promovendo o uso racional e baseado em evidências de recursos botânicos no Brasil.
          </p>
        </div>
      </div>

      <span className="font-label-sm text-[10px] text-outline mt-1 italic">
        *Este apoio não interfere na curadoria editorial ou nas conclusões científicas aqui expostas.
      </span>
    </div>
  );
};
