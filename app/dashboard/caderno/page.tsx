import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { verificarToken } from "@/lib/auth";
import CadernoClient from "./CadernoClient";

export default async function CadernoPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) throw new Error("Não autorizado");

  const { userId } = verificarToken(token);

  const questoes = await prisma.caderno.findMany({
    where: { userId },
    include: {
      questao: true,
    },
  });

  return <CadernoClient questoes={questoes} />;
}