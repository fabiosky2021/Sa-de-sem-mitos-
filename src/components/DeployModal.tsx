import React, { useState } from 'react';
import { PILLARS, getCurrentDayPillar } from '../data/constants';
import { PillarDay } from '../types/content';

interface DeployModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectDayPillar?: (day: PillarDay) => void;
}

export const DeployModal: React.FC<DeployModalProps> = ({
  isOpen,
  onClose,
  onSelectDayPillar,
}) => {
  const [activeTab, setActiveTab] = useState<'status' | 'dias' | 'github' | 'vercel' | 'netlify'>('status');
  const [copiedText, setCopiedText] = useState<string | null>(null);

  if (!isOpen) return null;

  const todayPillar = getCurrentDayPillar();
  const todayInfo = PILLARS[todayPillar];

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 2500);
  };

  const GIT_COMMANDS = `git add .
git commit -m "fix: resolve esbuild peer dependency for Vercel npm install"
git push origin main`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div
        className="w-full max-w-2xl bg-surface rounded-2xl shadow-2xl border border-outline-variant/40 flex flex-col max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-outline-variant/30 flex items-center justify-between bg-surface-container/40">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary text-on-primary flex items-center justify-center shadow-sm">
              <span className="material-symbols-outlined text-2xl">cloud_sync</span>
            </div>
            <div>
              <h2 className="font-headline-sm text-base sm:text-lg font-bold text-on-surface flex items-center gap-2">
                <span>Central de Atualização & Deploy</span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold border border-emerald-500/20">
                  Pronto
                </span>
              </h2>
              <p className="font-body-sm text-xs text-on-surface-variant">
                Atualização dos 7 dias da semana e sincronização com GitHub, Netlify e Vercel
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full flex items-center justify-center text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition cursor-pointer"
          >
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-1 px-5 pt-3 border-b border-outline-variant/20 overflow-x-auto scrollbar-none bg-surface">
          <button
            onClick={() => setActiveTab('status')}
            className={`px-3 py-2 text-xs font-bold border-b-2 transition cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'status'
                ? 'border-primary text-primary'
                : 'border-transparent text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <span className="material-symbols-outlined text-base">dashboard</span>
            <span>Visão Geral</span>
          </button>
          <button
            onClick={() => setActiveTab('dias')}
            className={`px-3 py-2 text-xs font-bold border-b-2 transition cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'dias'
                ? 'border-primary text-primary'
                : 'border-transparent text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <span className="material-symbols-outlined text-base">calendar_month</span>
            <span>Dias da Semana (7)</span>
          </button>
          <button
            onClick={() => setActiveTab('github')}
            className={`px-3 py-2 text-xs font-bold border-b-2 transition cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'github'
                ? 'border-primary text-primary'
                : 'border-transparent text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <span className="material-symbols-outlined text-base">code</span>
            <span>GitHub CI/CD</span>
          </button>
          <button
            onClick={() => setActiveTab('vercel')}
            className={`px-3 py-2 text-xs font-bold border-b-2 transition cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'vercel'
                ? 'border-primary text-primary'
                : 'border-transparent text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <span className="material-symbols-outlined text-base">change_history</span>
            <span>Vercel Deploy</span>
          </button>
          <button
            onClick={() => setActiveTab('netlify')}
            className={`px-3 py-2 text-xs font-bold border-b-2 transition cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'netlify'
                ? 'border-primary text-primary'
                : 'border-transparent text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <span className="material-symbols-outlined text-base">bolt</span>
            <span>Netlify Deploy</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 overflow-y-auto space-y-4">
          {/* TAB 1: Status Overview */}
          {activeTab === 'status' && (
            <div className="space-y-4">
              {/* Today Status Card */}
              <div className="p-4 rounded-xl bg-gradient-to-r from-primary/10 via-primary-fixed/20 to-surface-container border border-primary/30 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary text-on-primary flex items-center justify-center">
                    <span className="material-symbols-outlined">{todayInfo.icon}</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-primary">
                        Dia da Semana Atual
                      </span>
                      <span className="w-2 h-2 rounded-full bg-primary animate-ping" />
                    </div>
                    <h3 className="font-headline-sm text-sm sm:text-base font-bold text-on-surface">
                      {todayInfo.dayName} — {todayInfo.theme}
                    </h3>
                  </div>
                </div>
                {onSelectDayPillar && (
                  <button
                    onClick={() => {
                      onSelectDayPillar(todayPillar);
                      onClose();
                    }}
                    className="px-3 py-1.5 rounded-lg bg-primary text-on-primary text-xs font-bold hover:opacity-90 active:scale-95 transition cursor-pointer shadow-sm"
                  >
                    Usar Hoje
                  </button>
                )}
              </div>

              {/* Platform Status Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* GitHub */}
                <div className="p-3.5 rounded-xl bg-surface-container-lowest border border-outline-variant/30 flex flex-col justify-between gap-2 shadow-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-label-lg text-xs font-bold text-on-surface flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-base">code</span>
                      GitHub
                    </span>
                    <span className="px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold">
                      Configurado
                    </span>
                  </div>
                  <p className="text-[11px] text-on-surface-variant">
                    Workflow de CI em <code>.github/workflows/ci.yml</code> para validação automática de build a cada push.
                  </p>
                  <button
                    onClick={() => setActiveTab('github')}
                    className="text-left text-[11px] font-bold text-primary hover:underline"
                  >
                    Ver comandos git &rarr;
                  </button>
                </div>

                {/* Vercel */}
                <div className="p-3.5 rounded-xl bg-surface-container-lowest border border-outline-variant/30 flex flex-col justify-between gap-2 shadow-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-label-lg text-xs font-bold text-on-surface flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-base">change_history</span>
                      Vercel
                    </span>
                    <span className="px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold">
                      Configurado
                    </span>
                  </div>
                  <p className="text-[11px] text-on-surface-variant">
                    <code>vercel.json</code> com SPA rewrites e Serverless Functions em <code>/api</code> com suporte TypeScript.
                  </p>
                  <button
                    onClick={() => setActiveTab('vercel')}
                    className="text-left text-[11px] font-bold text-primary hover:underline"
                  >
                    Instruções Vercel &rarr;
                  </button>
                </div>

                {/* Netlify */}
                <div className="p-3.5 rounded-xl bg-surface-container-lowest border border-outline-variant/30 flex flex-col justify-between gap-2 shadow-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-label-lg text-xs font-bold text-on-surface flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-base">bolt</span>
                      Netlify
                    </span>
                    <span className="px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold">
                      Configurado
                    </span>
                  </div>
                  <p className="text-[11px] text-on-surface-variant">
                    <code>netlify.toml</code> com build para pasta <code>dist</code> e Netlify Functions em <code>netlify/functions/</code>.
                  </p>
                  <button
                    onClick={() => setActiveTab('netlify')}
                    className="text-left text-[11px] font-bold text-primary hover:underline"
                  >
                    Instruções Netlify &rarr;
                  </button>
                </div>
              </div>

              {/* Quick Git Push Action */}
              <div className="p-4 rounded-xl bg-surface-container-lowest border border-outline-variant/30 flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-on-surface flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-base text-primary">terminal</span>
                    Comando rápido para atualizar no GitHub / Netlify / Vercel:
                  </span>
                  <button
                    onClick={() => handleCopy(GIT_COMMANDS, 'git-all')}
                    className="px-2.5 py-1 rounded bg-surface-container hover:bg-surface-container-high text-xs font-bold text-primary transition cursor-pointer flex items-center gap-1"
                  >
                    <span className="material-symbols-outlined text-sm">
                      {copiedText === 'git-all' ? 'check' : 'content_copy'}
                    </span>
                    <span>{copiedText === 'git-all' ? 'Copiado!' : 'Copiar'}</span>
                  </button>
                </div>
                <pre className="p-3 rounded-lg bg-surface-container text-xs font-mono text-on-surface overflow-x-auto leading-relaxed border border-outline-variant/20">
                  {GIT_COMMANDS}
                </pre>
              </div>
            </div>
          )}

          {/* TAB 2: Dias da Semana */}
          {activeTab === 'dias' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-headline-sm text-sm font-bold text-on-surface">
                    Cronograma dos 7 Dias da Semana
                  </h3>
                  <p className="text-xs text-on-surface-variant">
                    Selecione qualquer dia da semana para abrir diretamente o estúdio com a pauta científica daquele dia:
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {Object.values(PILLARS).map((pillar) => {
                  const isToday = pillar.id === todayPillar;
                  return (
                    <div
                      key={pillar.id}
                      onClick={() => {
                        if (onSelectDayPillar) {
                          onSelectDayPillar(pillar.id);
                          onClose();
                        }
                      }}
                      className={`p-3 rounded-xl border transition cursor-pointer flex items-center justify-between gap-3 ${
                        isToday
                          ? 'bg-primary-fixed/20 border-primary ring-1 ring-primary/40'
                          : 'bg-surface-container-lowest border-outline-variant/30 hover:border-primary/40'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                          isToday ? 'bg-primary text-on-primary' : 'bg-surface-container text-primary'
                        }`}>
                          <span className="material-symbols-outlined text-lg">{pillar.icon}</span>
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5">
                            <span className="font-bold text-xs text-on-surface">
                              {pillar.dayName}
                            </span>
                            {isToday && (
                              <span className="px-1.5 py-0.2 rounded-full bg-primary text-on-primary text-[9px] font-extrabold uppercase">
                                Hoje
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-on-surface-variant truncate">
                            {pillar.theme}
                          </p>
                        </div>
                      </div>
                      <span className="material-symbols-outlined text-sm text-primary shrink-0">
                        arrow_forward
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 3: GitHub Details */}
          {activeTab === 'github' && (
            <div className="space-y-3">
              <h3 className="font-headline-sm text-sm font-bold text-on-surface flex items-center gap-1.5">
                <span className="material-symbols-outlined text-primary text-base">code</span>
                Passo a Passo para GitHub
              </h3>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                O repositório já está configurado com <code>.gitignore</code>, <code>README.md</code> completo e o workflow <code>.github/workflows/ci.yml</code> que compila e valida o projeto com Node 20.
              </p>

              <div className="p-3 rounded-xl bg-surface-container-lowest border border-outline-variant/30 space-y-2">
                <span className="text-xs font-bold text-on-surface">Comandos para subir ao GitHub:</span>
                <pre className="p-3 rounded-lg bg-surface-container text-xs font-mono text-on-surface overflow-x-auto">
{`git init
git add .
git commit -m "feat: lancamento do estúdio com 7 dias da semana"
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/saude-sem-mitos.git
git push -u origin main`}
                </pre>
                <button
                  onClick={() => handleCopy(`git init\ngit add .\ngit commit -m "feat: lancamento do estúdio com 7 dias da semana"\ngit branch -M main\ngit remote add origin https://github.com/SEU_USUARIO/saude-sem-mitos.git\ngit push -u origin main`, 'git-init')}
                  className="px-3 py-1.5 rounded-lg bg-primary text-on-primary text-xs font-bold flex items-center gap-1 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-sm">content_copy</span>
                  <span>{copiedText === 'git-init' ? 'Copiado!' : 'Copiar Comandos'}</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 4: Vercel Details */}
          {activeTab === 'vercel' && (
            <div className="space-y-3">
              <h3 className="font-headline-sm text-sm font-bold text-on-surface flex items-center gap-1.5">
                <span className="material-symbols-outlined text-primary text-base">change_history</span>
                Configuração Vercel
              </h3>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                O arquivo <code>vercel.json</code> foi corrigido e validado. O build cria a pasta <code>dist</code> e os arquivos em <code>api/</code> funcionam nativamente como Serverless Functions.
              </p>

              <div className="p-3.5 rounded-xl bg-surface-container-lowest border border-outline-variant/30 space-y-2">
                <span className="text-xs font-bold text-on-surface">Deploy via Vercel CLI:</span>
                <pre className="p-3 rounded-lg bg-surface-container text-xs font-mono text-on-surface overflow-x-auto">
{`npm i -g vercel
vercel
vercel --prod`}
                </pre>
                <div className="pt-1 text-xs text-on-surface-variant">
                  <strong>Ou importe via Dashboard da Vercel:</strong> Conecte seu repositório GitHub e clique em <em>Deploy</em> (o preset Vite é detectado automaticamente).
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: Netlify Details */}
          {activeTab === 'netlify' && (
            <div className="space-y-3">
              <h3 className="font-headline-sm text-sm font-bold text-on-surface flex items-center gap-1.5">
                <span className="material-symbols-outlined text-primary text-base">bolt</span>
                Configuração Netlify
              </h3>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                O arquivo <code>netlify.toml</code> publica a pasta <code>dist</code>, aplica regras de SPA redirect (<code>/* -&gt; /index.html</code>) e inclui Netlify Functions em <code>netlify/functions/</code>.
              </p>

              <div className="p-3.5 rounded-xl bg-surface-container-lowest border border-outline-variant/30 space-y-2">
                <span className="text-xs font-bold text-on-surface">Deploy via Netlify CLI:</span>
                <pre className="p-3 rounded-lg bg-surface-container text-xs font-mono text-on-surface overflow-x-auto">
{`npm i -g netlify-cli
netlify login
netlify init
netlify deploy --prod`}
                </pre>
                <div className="pt-1 text-xs text-on-surface-variant">
                  <strong>Ou importe via Dashboard do Netlify:</strong> Conecte o repositório GitHub e o Netlify lerá o <code>netlify.toml</code> sem nenhuma configuração extra.
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-outline-variant/20 bg-surface-container/20 flex items-center justify-between">
          <span className="text-[11px] text-on-surface-variant">
            Pronto para GitHub • Netlify • Vercel
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-primary text-on-primary text-xs font-bold hover:opacity-90 active:scale-95 transition cursor-pointer"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
