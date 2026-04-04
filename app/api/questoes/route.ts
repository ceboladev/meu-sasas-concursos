import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const disciplina = searchParams.get("disciplina");
    const banca = searchParams.get("banca");

    const questoes = await prisma.questao.findMany({
      where: {
        disciplina:
          disciplina && disciplina !== "todos"
            ? disciplina
            : undefined,
        banca: banca
          ? { contains: banca, mode: "insensitive" }
          : undefined,
      },
      include: {
        alternativas: true,
      },
    });

    return NextResponse.json(questoes);

  } catch (error) {
    console.error("Erro na API:", error);
    return NextResponse.json(
      { error: "Erro ao buscar questões" },
      { status: 500 }
    );
  }
}