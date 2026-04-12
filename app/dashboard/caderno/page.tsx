import { cookies } from "next/headers";
import { verificarToken } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function CadernoPage() {

  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    throw new Error("Token não encontrado");
  }

  const decoded = verificarToken(token);

  const user = await prisma.user.findUnique({
    where: { id: decoded.userId },
  });

  return (
    <div>
      <h1>Meu Caderno</h1>
      <p>Bem-vindo, {user?.nome}</p>
    </div>
  );
}