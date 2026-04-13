import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verificarToken } from "@/lib/auth";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
    }

    const decoded = verificarToken(token);

    const { questaoId } = await req.json();

    await prisma.caderno.create({
      data: {
        userId: decoded.userId,
        questaoId,
      },
    });

    return NextResponse.json({ message: "Salvo no caderno!" });

  } catch (error) {
    return NextResponse.json(
      { error: "Questão já salva ou erro interno" },
      { status: 400 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const { userId } = verificarToken(token);
    const { questaoId } = await req.json();

    await prisma.caderno.delete({
      where: {
        userId_questaoId: {
          userId,
          questaoId,
        },
      },
    });

    return NextResponse.json({ message: "Questão removida do caderno" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Erro ao remover" }, { status: 500 });
  }
}

