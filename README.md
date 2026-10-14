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
- Fundo da abertura: use o botão "Trocar fundo" na própria página (fica salvo no seu navegador).
  Para deixar uma imagem fixa: coloque o arquivo na pasta (ex.: `fundo.jpg`), adicione no fim do `style.css`
  `.bg-img{background-image:url("fundo.jpg")}` e troque no `index.html` `<header class="hero" id="topo">`
  por `<header class="hero has-bg" id="topo">`. A cena 3D passa a mostrar só os blocos das stacks.

## Publicar grátis
GitHub Pages: crie um repositório, envie estes arquivos e ative Pages em Settings → Pages.
