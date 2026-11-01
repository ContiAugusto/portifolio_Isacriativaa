/* =========================================================================
   DADOS — MÚSICAS
   Esta é a ÚNICA coisa que precisa mudar quando a Isabel mandar os MP3s
   reais. Cada objeto da lista é uma faixa do player. NÃO mexa em mais
   nenhum arquivo para trocar música — só aqui.

   Campos de cada faixa:
   - titulo: nome da música (aparece em negrito na lista)
   - estilo: linha pequena embaixo do título (ex.: "cantiga de roda")
   - arquivo: caminho do MP3 (o trecho já cortado, uns 15s), dentro de
     assets/audio/. Dá pra cortar um trecho com o site gratuito
     https://mp3cut.net ou com o próprio celular.
   - cor: "green" | "yellow" | "pink" | "blue" | "purple" | "red"
     (cor de destaque do ícone e do disco enquanto essa faixa toca)

   Se mandar menos de 8 músicas, é só apagar os objetos extras da lista —
   o player se ajusta sozinho. Se mandar mais, é só copiar um bloco
   { ... } e colar com os dados novos.
   ========================================================================= */
window.DADOS_MUSICA = [
  {
    titulo: "Cabeça, Ombro, Joelho e Pé",
    estilo: "cantiga de roda",
    arquivo: "assets/audio/01-cabeca-ombro-joelho-pe.mp3",
    cor: "green",
  },
  {
    titulo: "Ciranda Cirandinha",
    estilo: "cantiga de roda",
    arquivo: "assets/audio/02-ciranda-cirandinha.mp3",
    cor: "pink",
  },
  {
    titulo: "A Barata diz que tem",
    estilo: "cantiga de roda",
    arquivo: "assets/audio/03-a-barata-diz-que-tem.mp3",
    cor: "yellow",
  },
  {
    titulo: "Título da música 4",
    estilo: "cantiga de roda",
    arquivo: "assets/audio/04-titulo-da-musica.mp3",
    cor: "blue",
  },
  {
    titulo: "Título da música 5",
    estilo: "cantiga de roda",
    arquivo: "assets/audio/05-titulo-da-musica.mp3",
    cor: "purple",
  },
  {
    titulo: "Título da música 6",
    estilo: "cantiga de roda",
    arquivo: "assets/audio/06-titulo-da-musica.mp3",
    cor: "red",
  },
  {
    titulo: "Título da música 7",
    estilo: "cantiga de roda",
    arquivo: "assets/audio/07-titulo-da-musica.mp3",
    cor: "green",
  },
  {
    titulo: "Título da música 8",
    estilo: "cantiga de roda",
    arquivo: "assets/audio/08-titulo-da-musica.mp3",
    cor: "pink",
  },
];
