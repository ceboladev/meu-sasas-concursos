import { prisma } from "@/lib/prisma";
import SimuladoClient from "@/components/SimuladoClient";




export default async function DashboardPage() {
  const questoes = await prisma.questao.findMany({
    include: { alternativas: true },
  });

  console.log("TOTAL QUESTOES:", questoes.length);

  return (
    <div className="p-10">
      <SimuladoClient questoes={questoes} />
    </div>
  );
}
  