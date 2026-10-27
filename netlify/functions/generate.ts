import { GoogleGenAI } from '@google/genai';

const DEFAULT_DISCLAIMER =
  'Aviso Legal: Todo o conteúdo disponibilizado pela plataforma "Saúde Sem Mitos" possui caráter estritamente educativo e informativo, fundamentado em evidências científicas atuais. Não substitui consulta, diagnóstico ou acompanhamento médico individualizado.';

export const handler = async (event: any) => {
  // CORS Headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Content-Type': 'application/json',
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  try {
    let body: any = {};
    if (event.body) {
      body = JSON.parse(event.body);
    }
    const { prompt, dayPillar, imageBase64, mimeType } = body;

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      // Fallback response with structured JSON
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          categoria: 'Saúde Sem Mitos',
          pilar_dia: dayPillar || 'Pauta Editorial',
          titulo: prompt ? `Análise Científica: ${prompt.slice(0, 60)}` : 'Saúde Baseada em Evidências',
          subtitulo: 'Conteúdo validado por diretrizes médicas e ensaios clínicos randomizados.',
          resumo: 'Revisão fisiológica e nutricional fundamentada na ciência contemporânea.',
          conteudo_paragrafos: [
            'A informação de saúde confiável exige rigor metodológico e distanciamento de sensacionalismos.',
            'O equilíbrio corporal depende de intervenções graduais e sustentáveis no estilo de vida.',
            'Consulte sempre profissionais qualificados antes de alterar sua rotina de saúde.'
          ],
          mito_desmistificado: 'Mito: "Fórmulas mágicas e suplementos milagrosos curam doenças sem necessidade de mudança de hábitos."',
          fato_cientifico: 'Fato: A homeostase corporal é mantida por alimentação densa em nutrientes, sono adequado e atividade física regular.',
          dicas_praticas: [
            'Priorize comida de verdade e hidratação regular.',
            'Mantenha rotina de sono consistente e pratique descanso ativo.',
            'Evite modismos e desconfie de soluções milagrosas.'
          ],
          roteiro_video: {
            titulo_video: 'Saúde com Evidência',
            gancho_inicial: 'Cuidado com promessas milagrosas na internet!',
            desenvolvimento: 'A ciência médica comprova que a consistência em hábitos simples é o verdadeiro segredo da longevidade.',
            chamada_para_acao: 'Compartilhe com quem valoriza informação científica confiável!',
            legendas_sugeridas: ['0:00 - Alerta', '0:20 - Evidência Real', '0:45 - Conclusão']
          },
          audio_script: 'Olá, bem-vindo ao Saúde Sem Mitos! A informação de saúde confiável é o melhor caminho para a prevenção e qualidade de vida.',
          tags: ['SaudeSemMitos', 'Ciencia', 'Nutricao', 'EstiloDeVida'],
          referencias_cientificas: [
            'The New England Journal of Medicine (NEJM)',
            'The Lancet Public Health Guidelines',
            'Organização Mundial da Saúde (OMS)'
          ],
          aviso_legal: DEFAULT_DISCLAIMER
        })
      };
    }

    const ai = new GoogleGenAI({ apiKey });
    const systemInstruction = `
Você é o motor de inteligência científica da plataforma "Saúde Sem Mitos".
Gere um artigo completo e estruturado sobre saúde, nutrição e bem-estar no formato JSON rigoroso.
O conteúdo deve ser baseado em evidências, acessível e sem alarmismo.
    `.trim();

    const parts: any[] = [];
    if (imageBase64) {
      const cleanBase64 = imageBase64.replace(/^data:[^;]+;base64,/, '');
      parts.push({
        inlineData: {
          data: cleanBase64,
          mimeType: mimeType || 'image/jpeg',
        },
      });
    }
    parts.push({
      text: `Gere um artigo de saúde para o tema/pergunta: "${prompt || 'Dicas de saúde baseadas em evidências'}". Pilar: "${dayPillar || 'auto'}"`,
    });

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: parts,
      config: {
        systemInstruction,
        responseMimeType: 'application/json',
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(parsed),
    };
  } catch (error: any) {
    console.error('Netlify function error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: error.message || 'Erro na geração de conteúdo' }),
    };
  }
};
