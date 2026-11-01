# Site Isa Criativa — Professora Isabel

Site com várias páginas, 100% responsivo, feito em HTML + CSS + JavaScript puro
(sem frameworks, sem dependências para instalar). Basta abrir o `index.html` no navegador
(ou, melhor ainda, rodar um servidor local — veja "Como testar localmente").

## Estrutura de arquivos

```
index.html           → página inicial (Sobre, Livros, Música, Trajetória, Contato)
trabalhos.html        → aba "Meus Trabalhos" (banco de fotos da Isabel)
alule.html             → página do personagem Alule
aluleu.html            → página do personagem Aluleu

css/style.css          → todo o estilo do site inteiro (cores, tipografia, layout)

js/main.js              → menu mobile, rolagem suave, animações ao rolar a página
js/musica-player.js     → liga o player de música ao disco de vinil
js/galeria.js           → monta as galerias de fotos (trabalhos, Alule, Aluleu)

js/data-musica.js       → as 8 músicas do player (título + arquivo mp3 + cor)
js/data-trabalhos.js    → as fotos da aba "Meus Trabalhos"
js/data-alule.js        → as fotos da galeria do Alule
js/data-aluleu.js       → as fotos da galeria do Aluleu

assets/audio/           → os MP3 dos trechos de música (15s)
assets/img/trabalhos/   → fotos do banco de trabalhos
assets/img/alule/       → fotos do Alule
assets/img/aluleu/      → fotos do Aluleu
assets/img/livros/      → capas dos livros
```

## A ideia principal: mandar só o "bloco" que mudou

Cada tipo de mudança mexe em UM arquivo pequeno, não no site inteiro. Pra pedir um
ajuste, é só mandar o arquivo certo (ou o trecho dele):

| Quero mudar...                               | Edito só este arquivo          |
|-----------------------------------------------|---------------------------------|
| Título ou arquivo de uma música                | `js/data-musica.js`             |
| Fotos do banco "Meus Trabalhos"                 | `js/data-trabalhos.js`          |
| Fotos da galeria do Alule                       | `js/data-alule.js`              |
| Fotos da galeria do Aluleu                      | `js/data-aluleu.js`             |
| Texto de apresentação do Alule                  | `alule.html` (bloco `.character-bio`) |
| Texto de apresentação do Aluleu                 | `aluleu.html` (bloco `.character-bio`) |
| Título, sinopse ou link de compra de um livro   | `index.html` (seção `#livros`)  |
| Uma cor do site (fundo, verde, azul, amarelo…)  | `css/style.css` (bloco 1, bem no topo) |

Os blocos de CSS estão numerados e comentados (ex.: `8. COMPONENTS — player de
música`, `17. COMPONENTS — galeria de fotos`) — é só apontar o número do bloco se
quiser pedir um ajuste visual específico.

## O que precisa ser personalizado

Todo texto entre colchetes é um espaço reservado. Abra os arquivos num editor de
texto (VS Code, por exemplo) e use "localizar e substituir" para trocar:

- `[Nome]` → nome da professora (aparece no cabeçalho e rodapé de todas as páginas)
- `[X]` → números reais (anos de experiência, quantidade de crianças, turmas, etc.)
- `[Ano]` / `[ano]` → anos da linha do tempo
- `[Nome da escola]` → nome da escola atual
- `contato@exemplo.com`, `5511999999999`, `@tia.nome` → e-mail, WhatsApp e Instagram reais
- Texto entre colchetes em `alule.html` e `aluleu.html` → apresentação de cada personagem
- Os `href="#"` nos botões "Comprar o livro" (`index.html`) → link real de venda de cada livro

## Músicas (disco de vinil)

1. Corte um trecho de ~15s de cada música (ex.: https://mp3cut.net).
2. Salve os MP3s dentro de `assets/audio/` com os nomes indicados no
   `LEIA-ME.txt` daquela pasta (ou com o nome que preferir).
3. Abra `js/data-musica.js` e ajuste `titulo`, `arquivo` e `cor` de cada faixa.

Ao clicar numa faixa: ela toca, o ícone vira "pausar" e o disco de vinil gira —
tudo isso já está pronto, só falta colocar os MP3s.

## Fotos (galerias e livros)

1. Coloque os arquivos na pasta indicada (`assets/img/trabalhos/`,
   `assets/img/alule/`, `assets/img/aluleu/` ou `assets/img/livros/`).
2. Edite o arquivo `js/data-*.js` correspondente (ou, no caso dos livros, o
   `src` da imagem direto em `index.html`) com o nome do arquivo.
3. Enquanto não houver foto, o site mostra um ícone no lugar — nunca fica com
   "imagem quebrada".

## Como testar localmente

Dá pra abrir qualquer `.html` com duplo clique — funciona em qualquer navegador.
Para simular melhor a versão publicada (recomendado), com Python instalado:

```bash
cd pasta-do-site
python3 -m http.server 8000
```

Depois acesse `http://localhost:8000` no navegador.

## Como publicar o site (gratuito)

A forma mais simples é o **Netlify Drop**:

1. Acesse https://app.netlify.com/drop
2. Arraste a pasta inteira do site para a página.
3. Pronto — o Netlify gera um link público na hora, já com todas as páginas.

Outras opções gratuitas: GitHub Pages ou Vercel.

## Créditos opcionais

No fim de cada página, dentro do `<footer>`, tem uma linha comentada:

```html
<!-- <p class="footer__credit">Site desenvolvido por Augusto</p> -->
```

Se quiser deixar esse crédito visível no rodapé, é só remover o `<!--` e o `-->`
(em todas as páginas, se quiser que apareça em todo lugar).

## Sobre o responsivo

Layout com breakpoints em `1100px`/`991px` (tablets) e `767px` (celulares). O
menu vira um painel de tela cheia no celular, os grids de 2/3 colunas viram
1 coluna, e o submenu "Mundo da Isa Criativa" (Alule/Aluleu) aparece como lista
recuada dentro do menu do celular e como um mini-menu suspenso no computador.
