import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const page = Number(searchParams.get("page") ?? 1);
  const limit = 10;

  const where: any = {};

  const banca = searchParams.get("banca");
  const disciplina = searchParams.get("disciplina");
  const orgao = searchParams.get("orgao");
  const escolaridade = searchParams.get("escolaridade");
  const busca = searchParams.get("busca");

  if (banca) where.banca = { nome: banca };
  if (disciplina) where.disciplina = { nome: disciplina };
  if (orgao) where.orgao = { nome: orgao };
  if (escolaridade) where.escolaridade = escolaridade;

  if (busca) {
    where.OR = [
      { enunciado: { contains: busca, mode: "insensitive" } },
      { textoBase: { contains: busca, mode: "insensitive" } },
    ];
  }

  const total = await prisma.questao.count({ where });

  const questoes = await prisma.questao.findMany({
    where,
    include: {
      alternativas: true,
      banca: true,
      disciplina: true,
      orgao: true,
    },
    skip: (page - 1) * limit,
    take: limit,
    orderBy: { ano: "desc" },
  });

  return NextResponse.json({
    questoes,
    total,
    page,
    totalPages: Math.ceil(total / limit),
  });
}