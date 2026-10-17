import React from 'react';
import { ASSETS } from '../data/constants';

interface HeaderProps {
  currentTabLabel?: string;
  onProfileClick?: () => void;
  onLogoClick?: () => void;
  onVoiceSettingsClick?: () => void;
  isDarkMode?: boolean;
  onToggleDarkMode?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTabLabel = 'Artigos',
  onProfileClick,
  onLogoClick,
  onVoiceSettingsClick,
  isDarkMode = true,
  onToggleDarkMode,
}) => {
  return (
    <header className="fixed top-0 w-full z-50 pt-safe bg-surface/85 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.06)] border-b border-outline-variant/30">
      <div className="h-16 px-gutter flex items-center justify-between max-w-4xl mx-auto">
        {/* Brand Identity */}
        <div
          onClick={onLogoClick}
          className="flex items-center gap-space-sm cursor-pointer select-none group"
        >
          <img
            alt="Saúde Sem Mitos Logo"
            className="h-8 w-auto object-contain transition-transform group-hover:scale-105"
            src={ASSETS.logo}
          />
          <div className="flex flex-col">
            <div className="flex items-center gap-space-xs">
              <span className="font-headline-sm text-headline-sm text-on-surface font-bold">
                Saúde Sem Mitos
              </span>
            </div>
            <div className="flex items-center gap-1">
              <span className="font-label-sm text-label-sm text-primary uppercase font-bold tracking-wider">
                Evidência Científica
              </span>
              <span className="text-outline/40 text-[10px]">•</span>
              <span className="font-label-sm text-label-sm text-on-surface-variant">
                {currentTabLabel}
              </span>
            </div>
          </div>
        </div>

        {/* User Profile, Theme Toggle & Voice Settings */}
        <div className="flex items-center gap-1 sm:gap-2">
          {/* Dark Mode Toggle Button */}
          {onToggleDarkMode && (
            <button
              onClick={onToggleDarkMode}
              title={isDarkMode ? 'Mudar para Modo Claro' : 'Ativar Modo Escuro'}
              aria-label="Alternar modo escuro ou claro"
              className="w-10 h-10 flex items-center justify-center rounded-full text-on-surface-variant hover:text-primary hover:bg-surface-container transition-colors active:scale-95 cursor-pointer"
            >
              <span className="material-symbols-outlined text-xl">
                {isDarkMode ? 'light_mode' : 'dark_mode'}
              </span>
            </button>
          )}

          {onVoiceSettingsClick && (
            <button
              onClick={onVoiceSettingsClick}
              title="Configurar Voz Neural Realista 2026 da Assistente"
              className="w-10 h-10 flex items-center justify-center rounded-full text-on-surface-variant hover:text-primary hover:bg-surface-container transition-colors active:scale-95 cursor-pointer"
            >
              <span className="material-symbols-outlined text-xl">record_voice_over</span>
            </button>
          )}

          <div className="relative flex items-center justify-center">
            <button
              onClick={onProfileClick}
              className="w-11 h-11 flex items-center justify-center rounded-full text-on-surface-variant hover:text-on-surface transition-colors active:scale-95 cursor-pointer"
            >
              <img
                alt="Profile"
                className="w-8 h-8 rounded-full object-cover border border-outline-variant/30"
                src={ASSETS.profile}
              />
            </button>
            <span className="absolute bottom-1.5 right-1.5 w-2.5 h-2.5 bg-primary rounded-full ring-2 ring-surface animate-pulse" />
          </div>
        </div>
      </div>
    </header>
  );
};
