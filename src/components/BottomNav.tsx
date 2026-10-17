import React from 'react';

export type TabKey = 'inicio' | 'artigos' | 'assistente-ia' | 'desmistificador';

interface BottomNavProps {
  activeTab: TabKey;
  onTabChange: (tab: TabKey) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    {
      id: 'inicio' as TabKey,
      label: 'Início',
      icon: 'home',
    },
    {
      id: 'artigos' as TabKey,
      label: 'Artigos',
      icon: 'menu_book',
    },
    {
      id: 'assistente-ia' as TabKey,
      label: 'Assistente IA',
      icon: 'health_and_safety',
    },
    {
      id: 'desmistificador' as TabKey,
      label: 'Mitos',
      icon: 'verified_user',
    },
  ];

  return (
    <nav
      className="fixed bottom-0 w-full z-50 pb-safe bg-surface/85 backdrop-blur-xl shadow-[0_-2px_12px_rgba(0,0,0,0.05)] border-t border-outline-variant/20"
      data-active-classes="text-primary font-bold"
    >
      <div className="flex justify-around items-center h-16 px-space-xs max-w-4xl mx-auto">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              aria-current={isActive ? 'page' : undefined}
              className={`flex flex-col items-center justify-center min-w-[64px] min-h-[44px] gap-0.5 transition-transform active:scale-95 cursor-pointer ${
                isActive
                  ? 'text-primary font-bold'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              <span className={`material-symbols-outlined text-2xl ${isActive ? 'fill-1' : ''}`}>
                {tab.icon}
              </span>
              <span className="font-label-sm text-label-sm">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
