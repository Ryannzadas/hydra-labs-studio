# Hydra Labs

Site do estúdio independente de João Ryan: https://hydra-labs-studio.vercel.app

Feito com Next.js 16, TypeScript e Tailwind CSS v4.

## Como os projetos entram no site

Todo repositório público de [@Ryannzadas](https://github.com/Ryannzadas) com o tópico **`hydra-labs`** aparece na seção Projetos. O site busca a lista na API do GitHub e atualiza a cada 1 hora.

- **Capa:** um `preview.png` na raiz do repositório.
- **Botão "Abrir site":** o campo *Website* do repositório.

## Selo "Desenvolvido por Hydra Labs"

Os selos ficam em `public/selo/`, em duas versões: escura e clara. A seção Selo do site tem o HTML pronto pra copiar.

## Marca

A pasta `brand/` tem os arquivos originais da marca:

- logo em SVG, em versão clara, escura e ícone;
- vinhetas em vídeo.

## Rodando localmente

```bash
npm install
npm run dev
```

`GITHUB_TOKEN` é opcional e sobe o limite da API do GitHub. Veja o `.env.example`.
