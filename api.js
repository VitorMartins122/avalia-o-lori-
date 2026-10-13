const STORAGE_KEY = 'techpulse-signals';

const seedSignals = [
  { id: 1, title: 'Agentes de IA colaborativos', category: 'IA & Dados', level: 'Alta', score: 94, summary: 'Sistemas que dividem tarefas complexas em fluxos autônomos e auditáveis.', detail: 'A nova geração de agentes conecta raciocínio, ferramentas e memória. O diferencial está em desenhar limites claros, observabilidade e pontos de aprovação humana.', tags: ['Automação', 'LLM'], accent: 'violet', saved: true },
  { id: 2, title: 'Computação espacial no trabalho', category: 'Produto', level: 'Média', score: 78, summary: 'Interfaces 3D começam a sair do laboratório e entram em operações remotas.', detail: 'Headsets mais leves e colaboração imersiva estão criando novas formas de treinar equipes, visualizar dados e prototipar produtos.', tags: ['XR', 'Design'], accent: 'cyan', saved: false },
  { id: 3, title: 'Passkeys como padrão', category: 'Segurança', level: 'Alta', score: 88, summary: 'O login sem senha evolui de tendência para requisito de confiança digital.', detail: 'Passkeys combinam criptografia de chave pública com biometria local. A adoção exige bons fluxos de recuperação e suporte a múltiplos dispositivos.', tags: ['Identidade', 'WebAuthn'], accent: 'lime', saved: false },
  { id: 4, title: 'Edge computing sustentável', category: 'Infraestrutura', level: 'Média', score: 71, summary: 'Processamento mais perto da origem reduz latência e custo energético.', detail: 'Arquiteturas distribuídas estão usando modelos menores e hardware especializado para entregar inteligência onde os dados nascem.', tags: ['Edge', 'Green IT'], accent: 'orange', saved: false },
  { id: 5, title: 'Interfaces de voz naturais', category: 'Produto', level: 'Baixa', score: 64, summary: 'A voz se torna camada de controle para experiências digitais mais inclusivas.', detail: 'O avanço em modelos multimodais torna a conversa útil para navegar por dados, configurar ferramentas e acessar serviços sem depender apenas da tela.', tags: ['Acessibilidade', 'UX'], accent: 'pink', saved: false },
  { id: 6, title: 'Dados sintéticos verificáveis', category: 'IA & Dados', level: 'Alta', score: 83, summary: 'Times criam dados artificiais com rastreabilidade para acelerar testes e treino.', detail: 'Quando dados reais são escassos ou sensíveis, conjuntos sintéticos bem avaliados permitem experimentar sem abrir mão de privacidade.', tags: ['Privacidade', 'MLOps'], accent: 'blue', saved: false },
];

const wait = (ms = 360) => new Promise(resolve => setTimeout(resolve, ms));
const getSignals = () => JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null') || seedSignals;
const saveSignals = (signals) => localStorage.setItem(STORAGE_KEY, JSON.stringify(signals));

export async function request(method, path, body) {
  await wait();
  if (path === '/signals' && method === 'GET') return { data: getSignals(), status: 200 };
  if (path === '/signals' && method === 'POST') {
    if (!body?.title || !body?.category) throw new Error('Título e categoria são obrigatórios.');
    const signals = getSignals();
    const created = { ...body, id: Date.now(), score: 60, level: 'Nova', summary: body.summary || 'Sinal enviado pela comunidade.', detail: body.summary || 'Este sinal ainda está em análise pela curadoria.', tags: ['Comunidade'], accent: 'cyan', saved: false };
    saveSignals([created, ...signals]);
    return { data: created, status: 201 };
  }
  const match = path.match(/^\/signals\/(\d+)$/);
  if (match && method === 'PATCH') {
    const id = Number(match[1]);
    const signals = getSignals();
    const updated = signals.find(signal => signal.id === id);
    if (!updated) throw new Error('Sinal não encontrado.');
    const next = { ...updated, ...body };
    saveSignals(signals.map(signal => signal.id === id ? next : signal));
    return { data: next, status: 200 };
  }
  if (match && method === 'DELETE') {
    const id = Number(match[1]);
    const signals = getSignals();
    if (!signals.some(signal => signal.id === id)) throw new Error('Sinal não encontrado.');
    saveSignals(signals.filter(signal => signal.id !== id));
    return { data: { id }, status: 204 };
  }
  throw new Error('Rota da API não encontrada.');
}

export const api = {
  listSignals: () => request('GET', '/signals'),
  createSignal: (payload) => request('POST', '/signals', payload),
  updateSignal: (id, payload) => request('PATCH', `/signals/${id}`, payload),
  deleteSignal: (id) => request('DELETE', `/signals/${id}`),
};
