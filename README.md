# Instituto de Educação e Liderança

Site do Instituto de Educação e Liderança: uma página única, feita em Next.js 16
(App Router), pronta para publicar na Vercel. Veio do site da Jamilla Salviano
(`/instituto-de-educacao-e-lideranca`), com o mesmo conteúdo e o mesmo visual.

## Requisitos

- Node 22 (é o que o campo `engines` do `package.json` pede) e npm.

## Comandos

| Comando                       | O que faz                                                       |
| ----------------------------- | --------------------------------------------------------------- |
| `npm ci`                      | Instala as dependências do `package-lock.json`.                 |
| `npm run dev`                 | Sobe o site em modo de desenvolvimento (http://localhost:3000). |
| `npm run build` / `npm start` | Faz o build de produção e o serve.                              |
| `npm run lint`                | Roda o oxlint.                                                  |

## Onde fica cada coisa

| Arquivo                                   | Conteúdo                                                           |
| ----------------------------------------- | ------------------------------------------------------------------ |
| `app/page.tsx`                            | A página e os dados estruturados (JSON-LD).                        |
| `components/institute-landing.tsx`        | Todas as seções da página.                                         |
| `components/institute-content.ts`         | Textos compartilhados: descrição, áreas, perguntas frequentes.     |
| `components/institute-landing.module.css` | Visual da página.                                                  |
| `lib/site-config.ts`                      | WhatsApp, Instagram e pendências (links legais, prazo de retorno). |
| `lib/seo.ts`                              | Título, descrição e endereço do site.                              |
| `public/images`                           | Imagens da página, já em WebP no tamanho de uso.                   |
| `assets/originais`                        | Fotos originais (não vão para o site), para gerar novas versões.   |
| `assets/og`                               | Modelo da imagem de compartilhamento (WhatsApp e redes sociais).   |

## Publicar na Vercel

1. Suba esta pasta para um repositório no GitHub.
2. Na Vercel, importe o repositório. O `vercel.json` já define o build.
3. Aponte o domínio do Instituto para o projeto (Settings → Domains).

O endereço oficial do site (canonical, sitemap e imagem de compartilhamento) é
`https://institutoel.com.br`, definido em `lib/seo.ts`. Para usar outro
endereço sem mexer no código, defina a variável `NEXT_PUBLIC_SITE_URL` (veja
`.env.example`).

## Imagem de compartilhamento

É a imagem que aparece quando o link do site é enviado no WhatsApp e em outras
redes: `app/opengraph-image.jpg` e `app/twitter-image.jpg` (1200x630). O modelo
dela fica em `assets/og/compartilhamento.html`, com as instruções para gerar de
novo no começo do arquivo.

## Depois de publicar

No projeto do site da Jamilla, preencha `SITE_CONFIG.instituteUrl` em
`lib/site-config.ts` com o endereço deste site. A partir daí, o cartão do
Instituto na página de produtos e o endereço antigo
(`/instituto-de-educacao-e-lideranca`) passam a levar para cá.
