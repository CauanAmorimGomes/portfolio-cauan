# Portfólio — Cauan Amorim Gomes

Portfólio de desenvolvedor back-end com abertura 3D (Three.js) e cards animados para cada stack.

## Como abrir
Abra o `index.html` no navegador (precisa de internet para carregar as fontes e o Three.js).

## Arquivos
- `index.html` — estrutura da página e conteúdo dos cards
- `style.css` — cores, layout e animações de cada stack
- `script.js` — cena 3D, filtros, inclinação dos cards, botão de copiar e-mail e troca de fundo

## Personalizar
- Stacks: edite os `<article class="card">` no `index.html` e a lista `STACKS` no início do `script.js` (mesmos ids).
- Fundo da abertura: use o botão "Trocar fundo" na própria página. Para deixar uma imagem fixa, coloque o arquivo na pasta
  e adicione em `style.css`: `.bg-img{background-image:url("fundo.jpg");opacity:1}` e `.hero #scene{mix-blend-mode:screen}`.

## Publicar grátis
GitHub Pages: crie um repositório, envie estes arquivos e ative Pages em Settings → Pages.
