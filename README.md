# 🌿 Saúde Sem Mitos — Estúdio Multimodal de Criação Científica

> Plataforma profissional de produção de conteúdo sobre saúde preventiva, nutrição baseada em evidências e desmistificação científica, equipada com estúdio multimodal (texto, microfone/voz ativa, fotos/rótulos) e cronograma editorial completo para todos os **7 dias da semana**.

---

## 📅 Cronograma Editorial dos 7 Dias da Semana

| Dia | Pilar Temático | Foco Científico |
| :--- | :--- | :--- |
| **Segunda-feira** | 🥗 **Alimentação & Nutrição Consciente** | Pratos balanceados (regra dos 50% de vegetais), macronutrientes e reeducação alimentar sem modismos. |
| **Terça-feira** | 🧠 **Saúde Mental & Neurociência** | Eixo intestino-cérebro, modulação de cortisol, foco, regulação da ansiedade e neurotransmissores (GABA/serotonina). |
| **Quarta-feira** | 🍵 **Chás & Infusões** | Fitoterapia clínica, flavonoides, biodisponibilidade, dosagens seguras e prevenção de hepatotoxicidade. |
| **Quinta-feira** | ⚡ **Metabolismo & Longevidade** | Sensibilidade insulínica, autofagia, estabilidade glicêmica, mitocôndrias e envelhecimento celular ativo. |
| **Sexta-feira** | 😴 **Hábitos Saudáveis** | Ritmo circadiano, arquitetura do sono reparador, hidratação celular e manejo do estresse. |
| **Sábado** | ❌ **Sábados Sem Mitos** | Desmistificação rigorosa de fakes virais de dietas milagrosas (água com limão, shots "detox" e pseudociência). |
| **Domingo** | 🍱 **Recuperação & Planejamento** | Descanso ativo, meal prep semanal com conservação prolongada de vegetais e restauração parassimpática. |

---

## 🚀 Como Executar Localmente

### Pré-requisitos
- Node.js 18+ ou 20+
- NPM ou Bun

### Passos
```bash
# 1. Instalar dependências
npm install

# 2. Iniciar servidor de desenvolvimento (Porta 3000)
npm run dev

# 3. Testar compilação para produção
npm run build
```

---

## 🐙 Guia de Deploy: GitHub

O projeto já inclui workflow do GitHub Actions em `.github/workflows/ci.yml` pronto para testar e validar o build automaticamente a cada commit ou pull request.

### Inicializar e Subir para o GitHub:
```bash
# 1. Inicializar repositório (caso ainda não inicializado)
git init

# 2. Adicionar arquivos
git add .

# 3. Criar commit de atualização
git commit -m "feat: suporte completo aos 7 dias da semana e preparacao para Vercel e Netlify"

# 4. Vincular com o seu repositório remoto
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/saude-sem-mitos.git

# 5. Enviar para o GitHub
git push -u origin main
```

---

## 🌐 Guia de Deploy: Vercel

O projeto está 100% configurado para a **Vercel** através de `vercel.json` e funções serverless em `/api`.

### Opção A: Deploy via GitHub (Recomendado)
1. Acesse [vercel.com](https://vercel.com) e clique em **Add New Project**.
2. Conecte sua conta do GitHub e selecione o repositório `saude-sem-mitos`.
3. Framework Preset: **Vite**.
4. Root Directory: `./`.
5. Em **Environment Variables**, adicione (opcional se for utilizar a chave no backend):
   - `GEMINI_API_KEY`: sua chave de API do Google Gemini.
6. Clique em **Deploy**. A Vercel detectará automaticamente o build (`npm run build`), a pasta `dist` e as Serverless Functions em `/api`.

### Opção B: Deploy via Vercel CLI
```bash
npm i -g vercel
vercel
vercel --prod
```

---

## ⚡ Guia de Deploy: Netlify

O projeto conta com `netlify.toml` e Netlify Functions configuradas em `netlify/functions/`.

### Opção A: Deploy via GitHub (Recomendado)
1. Acesse [netlify.com](https://app.netlify.com) e clique em **Add new site > Import an existing project**.
2. Escolha **GitHub** e selecione o repositório `saude-sem-mitos`.
3. O Netlify lerá o arquivo `netlify.toml` automaticamente:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
   - **Functions directory**: `netlify/functions`
4. Em **Site configuration > Environment variables**, adicione (opcional):
   - `GEMINI_API_KEY`: sua chave de API do Google Gemini.
5. Clique em **Deploy site**.

### Opção B: Deploy via Netlify CLI
```bash
npm i -g netlify-cli
netlify login
netlify init
netlify deploy --prod
```

---

## 🎙️ Configurações de Narração e Vozes

- Vozes disponíveis para escolha com amostras em áudio:
  - **Dra. Camila Duarte** (Nutricionista & Fisiologista)
  - **Dr. Thiago Mello** (Médico Fisiologista)
  - **Helena Rios** (Fisiologista e Educadora em Saúde)
- Controle de velocidade (0.75x, 1x, 1.25x, 1.5x) e sincronização de legendas em tempo real.

---

## 📄 Licença e Aviso Legal
Todo o conteúdo possui caráter estritamente educativo e informativo baseado em evidências científicas atuais, não substituindo consultas e diagnósticos médicos individualizados.
