import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { verificarToken } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { questaoId, alternativaId } = body;

    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        { error: "Não autorizado" },
        { status: 401 }
      );
    }

    const { userId } = verificarToken(token);

    // 🔥 Busca a alternativa para descobrir se é correta
    const alternativa = await prisma.alternativa.findUnique({
      where: { id: alternativaId },
    });

    if (!alternativa) {
      return NextResponse.json(
        { error: "Alternativa não encontrada" },
        { status: 404 }
      );
    }

    const resposta = await prisma.resposta.create({
      data: {
        userId,
        questaoId,
        alternativaId,
        isCorreta: alternativa.isCorreta, // ✅ obrigatório no schema
      },
    });

    return NextResponse.json(resposta);

  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Erro ao salvar resposta" },
      { status: 500 }
    );
  }
}