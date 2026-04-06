import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
   const name = body.name;
const email = body.email.trim().toLowerCase();
const password = body.password;

    // Checa se já existe
    const existe = await prisma.user.findUnique({ where: { email } });
    if (existe) return NextResponse.json({ error: "Email já cadastrado" }, { status: 400 });

    const hash = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: { name, email, password: hash },
    });

    return NextResponse.json({ name: user.name, email: user.email });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Erro ao cadastrar usuário" }, { status: 500 });
  }
}