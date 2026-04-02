export interface Alternativa {
  id: string;
  texto: string;
  isCorreta: boolean;
}

export interface Questao {
  id: string;
  enunciado: string;
  disciplina: string;
  banca: string;
  ano: number;
  alternativas: Alternativa[];
  comentario?: string;
}