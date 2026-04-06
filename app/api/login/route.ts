import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    const user = await prisma.user.findUnique({
      where: { email: email.trim().toLowerCase() },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Usuário não encontrado" },
        { status: 401 }
      );
    }

    const senhaValida = await bcrypt.compare(password, user.password);

    if (!senhaValida) {
      return NextResponse.json(
        { error: "Senha incorreta" },
        { status: 401 }
      );
    }

    const response = NextResponse.json({
      name: user.name,
      email: user.email,
    });

    response.cookies.set("auth", "true", {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 4,
    });

    return response;
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}