# Portfólio — Professora de Educação Infantil

Site de página única (one page), 100% responsivo, feito em HTML + CSS + JavaScript puro
(sem frameworks, sem dependências para instalar). Basta abrir o `index.html` no navegador.

## Estrutura de arquivos

```
index.html        → conteúdo do site
css/style.css      → todo o estilo (cores, tipografia, layout, responsividade)
js/main.js         → menu mobile, rolagem suave, animações ao rolar a página
assets/img/        → pasta para colocar as fotos reais
```

## O que precisa ser personalizado

Todo texto entre colchetes é um espaço reservado. Abra o `index.html` num editor de
texto (VS Code, por exemplo) e use "localizar e substituir" para trocar:

- `[Nome]` → nome da professora (aparece no cabeçalho, rodapé, título da página etc.)
- `[X]` → números reais (anos de experiência, quantidade de crianças, turmas, etc.)
- `[Ano]` / `[ano]` → anos da linha do tempo (formação, primeira turma, especialização)
- `[Nome da escola]` → nome da escola atual
- `contato@exemplo.com`, `5511999999999`, `@tia.nome` → e-mail, WhatsApp e Instagram reais
- `[XXh às XXh]` → horário de atendimento

## Como colocar fotos reais

1. Coloque os arquivos de foto dentro de `assets/img/` (ex.: `foto-hero.jpg`,
   `foto-sobre.jpg`).
2. No `index.html`, cada `<img>` já está com o caminho certo — é só garantir que o
   nome do arquivo bate com o que está no `src`.
3. Enquanto não houver foto, o site mostra automaticamente um ícone de silhueta no
   lugar (não fica com "imagem quebrada").

## Como testar localmente

Basta dar duplo clique no `index.html` — ele abre em qualquer navegador.
Se preferir rodar com um servidor local (opcional, útil para simular a versão
publicada), com Python instalado:

```bash
cd pasta-do-site
python3 -m http.server 8000
```

Depois acesse `http://localhost:8000` no navegador.

## Como publicar o site (gratuito)

A forma mais simples é o **Netlify Drop**:

1. Acesse https://app.netlify.com/drop
2. Arraste a pasta inteira do site para a página.
3. Pronto — o Netlify gera um link público na hora.

Outras opções gratuitas: GitHub Pages ou Vercel (ambas exigem só arrastar a pasta
ou conectar um repositório do GitHub).

## Créditos opcionais

No fim do `index.html`, dentro do `<footer>`, tem uma linha comentada:

```html
<!-- <p class="footer__credit">Site desenvolvido por Augusto</p> -->
```

Se quiser deixar esse crédito visível no rodapé, é só remover o `<!--` e o `-->`.

## Sobre o responsivo

O layout foi construído com breakpoints em `991px` (tablets) e `767px` (celulares),
seguindo a mesma estrutura de seções que já existia no SCSS enviado (`.about`,
`.books`, `.music-section`, `.timeline`, `.contact`, `.footer`). O menu vira um
painel de tela cheia no celular, o menu fixo some, os grids de 2/3 colunas viram
1 coluna, e a linha do tempo passa a ficar alinhada à esquerda em vez de alternada.
