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
    titulo: "Escravos de Jó - Isacriativa",
    estilo: "cantiga de roda",
    arquivo: "assets/audio/Escravos de jó-isaversion.mp3",
    cor: "green",
  },
  {
    titulo: "Acalmar o Coração - Isacriativa",
    estilo: "cantiga de roda",
    arquivo: "assets/audio/acalmar o coraçao.mp3",
    cor: "pink",
  },
  {
    titulo: "Dengue - Isacriativa",
    estilo: "cantiga de roda",
    arquivo: "assets/audio/dengue.mp3",
    cor: "yellow",
  },
  {
    titulo: "Quem é legal - Versão Dona Aranha",
    estilo: "cantiga de roda",
    arquivo: "assets/audio/Quem é legal-isaversion-donaaranha.mp3",
    cor: "blue",
  },
  {
    titulo: "Brincar de Eu vou",
    estilo: "cantiga de roda",
    arquivo: "assets/audio/quemqbrincar.mp3",
    cor: "purple",
  },
  {
    titulo: "Borboletinha - Isacriativa",
    estilo: "cantiga de roda",
    arquivo: "assets/audio/Borboletinha-isaversion.mp3",
    cor: "red",
  },
  {
    titulo: "Comida brasileira - Isacriativa",
    estilo: "cantiga de roda",
    arquivo: "assets/audio/Comida brasileira-isaversion.mp3",
    cor: "green",
  },
  {
    titulo: "Felicidade - Isacriativa",
    estilo: "cantiga de roda",
    arquivo: "assets/audio/Felicidade.mp3",
    cor: "pink",
  },
   {
    titulo: "A cobra não tem pé - Isacriativa",
    estilo: "cantiga de roda",
    arquivo: "assets/audio/A cobra não tem pé-isaversion.mp3",
    cor: "orange",
  },
   {
    titulo: "Monstro das cores - Isacriativa",
    estilo: "cantiga de roda",
    arquivo: "assets/audio/puxa vida.mp3",
    cor: "cyan",
  },
];
