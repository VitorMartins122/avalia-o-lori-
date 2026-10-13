# CoreBench — Comparador de PCs

Aplicação web responsiva para entender o processamento de um computador e comparar um PC normal com um PC gamer. Projeto desenvolvido para demonstrar arquitetura de front-end, consumo de API REST mockada, acessibilidade e organização de código.

## Executar no VS Code

```bash
npm install
npm run dev
```

Abra o endereço exibido pelo Vite. Para validar a versão de produção:

```bash
npm run build
npm run preview
```

## Requisitos contemplados

- 3 telas: Visão geral, Comparar PCs e Montar configuração.
- Componentes reutilizáveis: `ComparisonCard`, `SpecList`, `ScoreBar`, `StatCard`, `Badge`, `Modal` e `Toast`.
- Interações: navegação, busca/filtros, favoritos, modal de análise, exclusão e formulário.
- Formulário com mais de 5 campos, validação obrigatória e mensagens acessíveis.
- API REST mockada em `src/services/api.js`: `GET`, `POST`, `PATCH` e `DELETE`, com estados de carregamento e erro.
- Layout responsivo, foco visível, landmarks, labels, contraste e suporte a `prefers-reduced-motion`.
- Histórico Git com commits organizados por etapa.

## Arquitetura

- `src/main.jsx`: aplicação, rotas por hash e componentes de interface.
- `src/styles.css`: tokens visuais e responsividade.
- `src/services/api.js`: camada de API mockada usando `localStorage` para persistência local.
- `public/manus-routes.json`: mapa de rotas da aplicação.

## Publicação na Vercel

1. Crie um repositório no GitHub e faça push deste diretório.
2. Importe o repositório em [vercel.com](https://vercel.com).
3. Use `npm run build` como comando de build e `dist` como diretório de saída.
4. Em SPA, configure fallback para `index.html` caso troque o roteamento por URL.

## Apresentação

Demonstre: filtro por categoria, busca, abrir detalhes, favoritar um sinal, alternar o tema, preencher o formulário com erro e depois sucesso. Explique que a camada `api.js` simula o back-end e mantém as operações HTTP explícitas.
