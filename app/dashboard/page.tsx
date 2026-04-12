import { prisma } from "@/lib/prisma";
import SimuladoClient from "@/components/SimuladoClient";
import FiltroQuestoes from "@/components/FiltroQuestoes";

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<any>;
}) {
  const params = await searchParams;

  const page = Number(params.page || 1);
  const limit = 10;

  const where: any = {};

  if (params.banca) {
    where.banca = { nome: params.banca };
  }

  if (params.disciplina) {
    where.disciplina = { nome: params.disciplina };
  }

  if (params.orgao) {
    where.orgao = { nome: params.orgao };
  }

  if (params.escolaridade) {
    where.escolaridade = params.escolaridade;
  }

  if (params.busca) {
    where.enunciado = {
      contains: params.busca,
      mode: "insensitive",
    };
  }




  const questoes = await prisma.questao.findMany({
    where,
    include: { alternativas: true },
    skip: (page - 1) * limit,
    take: limit,
  });

  const total = await prisma.questao.count({ where });
  const totalPages = Math.ceil(total / limit);

  return (
    <div className="space-y-6">

      <FiltroQuestoes />

      <SimuladoClient questoes={questoes} />

      {/* Paginação */}
      <div className="flex justify-center gap-2">
        {Array.from({ length: totalPages }).map((_, i) => (
          <a
            key={i}
            href={`?page=${i + 1}`}
            className="px-3 py-1 border rounded text-sm"
          >
            {i + 1}
          </a>
        ))}
      </div>

    </div>
  );
}