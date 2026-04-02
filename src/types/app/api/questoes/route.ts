import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const banca = searchParams.get('banca');

  // Simulando dados que viriam do banco
  const todasQuestoes = [
    { id: '1', enunciado: "O que é um PWA?", banca: "FGV", ano: 2025 },
    { id: '2', enunciado: "Comando para listar arquivos no Linux?", banca: "FCC", ano: 2024 },
  ];

  // Filtro básico
  const filtradas = banca 
    ? todasQuestoes.filter(q => q.banca === banca) 
    : todasQuestoes;

  return NextResponse.json(filtradas);
}