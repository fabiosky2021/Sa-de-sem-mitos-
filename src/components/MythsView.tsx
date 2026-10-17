import React, { useState } from 'react';
import { GeneratedArticle, PillarDay } from '../types/content';

interface MythsViewProps {
  onSelectArticle: (article: GeneratedArticle) => void;
  onOpenStudioWithPrompt: (prompt: string, pillar: PillarDay) => void;
  articles: GeneratedArticle[];
}

export const MythsView: React.FC<MythsViewProps> = ({
  onSelectArticle,
  onOpenStudioWithPrompt,
  articles,
}) => {
  const [search, setSearch] = useState('');

  const MYTH_CATALOG = [
    {
      title: 'Água morna com limão em jejum queima gordura e alcaliniza o sangue',
      myth: 'Beber água morna com limão toda manhã dissolve gordura da barriga e altera o pH do organismo.',
      reality: 'O pH sanguíneo é tamponado pelos rins e pulmões (7.35 a 7.45). Limão tem vitamina C, mas não dissolve adipócitos.',
      verdict: 'DESMISTIFICADO',
      source: 'Sociedade Brasileira de Alimentação e Nutrição (SBAN)',
      prompt: 'Água morna com limão em jejum queima gordura e alcaliniza o organismo ou é mito?',
      pillar: 'sabado' as PillarDay,
    },
    {
      title: 'Sucos detox eliminam as toxinas acumuladas no fígado',
      myth: 'Tomar sucos verdes concentrados desintoxica o fígado após exageros alimentares.',
      reality: 'O fígado e os rins realizam a depuração contínua do corpo 24h por dia. Sucos ricos em frutose podem sobrecarregar o fígado.',
      verdict: 'DESMISTIFICADO',
      source: 'Hepatology International Guidelines',
      prompt: 'Sucos detox realmente limpam o fígado ou nossos órgãos já fazem isso?',
      pillar: 'sabado' as PillarDay,
    },
    {
      title: 'Carboidratos à noite viram gordura automaticamente',
      myth: 'Comer qualquer tipo de carboidrato após as 18h faz o corpo estocar gordura imediatamente.',
      reality: 'O balanço calórico total de 24h determina perda ou ganho de peso. Carboidratos complexos ajudam na produção de serotonina e melatonina.',
      verdict: 'DESMISTIFICADO',
      source: 'International Society of Sports Nutrition (ISSN)',
      prompt: 'Carboidratos à noite engordam ou ajudam na síntese de melatonina para o sono?',
      pillar: 'segunda' as PillarDay,
    },
    {
      title: 'Chá verde em qualquer quantidade é benéfico e sem contraindicação',
      myth: 'Por ser natural, posso tomar mais de 2 litros de chá verde ao dia sem nenhum risco.',
      reality: 'Doses excessivas de epigalocatequina galato (EGCG) em jejum podem provocar hepatotoxicidade e gastrite.',
      verdict: 'PARCIALMENTE VERDADEIRO COM RESSALVAS',
      source: 'European Medicines Agency (EMA)',
      prompt: 'Qual a dose diária segura de chá verde e quais os riscos de sobrecarga no fígado?',
      pillar: 'quarta' as PillarDay,
    },
  ];

  const filteredMyths = MYTH_CATALOG.filter(
    (m) =>
      m.title.toLowerCase().includes(search.toLowerCase()) ||
      m.myth.toLowerCase().includes(search.toLowerCase()) ||
      m.reality.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-space-lg w-full pb-10">
      {/* Header */}
      <div className="w-full bg-[#FFFBEB] p-space-lg rounded-2xl border border-[#FDE68A] shadow-sm flex flex-col gap-space-xs">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[#B45309] text-xl font-bold">
            verified_user
          </span>
          <span className="font-label-sm text-label-sm uppercase font-bold text-[#B45309] tracking-wider">
            Sábados Sem Mitos
          </span>
        </div>
        <h1 className="font-headline-lg-mobile sm:text-headline-lg font-bold text-[#92400E]">
          Desmistificador de Crenças Populares & Modismos
        </h1>
        <p className="font-body-sm text-body-sm text-[#78350F] leading-relaxed">
          Avaliamos as principais afirmações virais de redes sociais sob o rigor de ensaios clínicos e diretrizes das sociedades médicas.
        </p>

        {/* Search Bar */}
        <div className="relative mt-2">
          <span className="material-symbols-outlined text-outline absolute left-3 top-1/2 -translate-y-1/2 text-lg">
            search
          </span>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Pesquise um mito (ex: limão, detox, glúten, chá)..."
            className="w-full bg-surface-container-lowest border border-[#FDE68A] rounded-xl pl-9 pr-4 py-2 font-body-sm text-on-surface placeholder-on-surface-variant/60 focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
      </div>

      {/* Myths Cards List */}
      <div className="flex flex-col gap-space-sm">
        <div className="flex items-center justify-between">
          <span className="font-label-lg text-label-lg font-bold text-on-surface">
            Catálogo de Desmistificações ({filteredMyths.length})
          </span>
          <span className="font-label-sm text-on-surface-variant">Base científica atualizada</span>
        </div>

        <div className="grid grid-cols-1 gap-space-sm">
          {filteredMyths.map((item, idx) => (
            <div
              key={idx}
              className="p-space-md rounded-xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm flex flex-col gap-space-sm"
            >
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-headline-sm text-sm sm:text-base font-bold text-on-surface">
                  {item.title}
                </h3>
                <span
                  className={`px-2 py-0.5 rounded-full font-label-sm text-[10px] font-bold uppercase shrink-0 ${
                    item.verdict.includes('DESMISTIFICADO')
                      ? 'bg-error-container text-on-error-container'
                      : 'bg-[#FEF3C7] text-[#92400E]'
                  }`}
                >
                  {item.verdict}
                </span>
              </div>

              {/* Myth & Reality comparison */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 rounded-lg bg-surface-container-low border border-outline-variant/20 flex flex-col gap-1">
                  <span className="font-label-sm text-tertiary font-bold flex items-center gap-1 uppercase text-[10px]">
                    <span className="material-symbols-outlined text-sm">cancel</span>
                    O que dizem:
                  </span>
                  <p className="text-on-surface-variant italic">"{item.myth}"</p>
                </div>

                <div className="p-2.5 rounded-lg bg-[#F0FDF4] border border-primary/20 flex flex-col gap-1">
                  <span className="font-label-sm text-[#166534] font-bold flex items-center gap-1 uppercase text-[10px]">
                    <span className="material-symbols-outlined text-sm">check_circle</span>
                    O que a ciência prova:
                  </span>
                  <p className="text-[#166534] font-medium">{item.reality}</p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-outline-variant/20 text-xs">
                <span className="font-label-sm text-outline truncate text-[11px]">
                  Fonte: {item.source}
                </span>
                <button
                  onClick={() => onOpenStudioWithPrompt(item.prompt, item.pillar)}
                  className="font-label-sm text-primary font-bold flex items-center gap-1 hover:underline cursor-pointer shrink-0"
                >
                  <span>Gerar artigo no Estúdio</span>
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
