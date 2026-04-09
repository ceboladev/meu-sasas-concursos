import { prisma } from "@/lib/prisma";
import SimuladoClient from "@/components/SimuladoClient";
import FiltroQuestoes from "@/components/FiltroQuestoes";

export default async function DashboardPage({ searchParams }: any) {

  const page = Number(searchParams.page || 1);
  const limit = 10;

  const where: any = {};

  if (searchParams.banca) {
    where.banca = { nome: searchParams.banca };
  }

  if (searchParams.disciplina) {
    where.disciplina = { nome: searchParams.disciplina };
  }

  if (searchParams.orgao) {
    where.orgao = { nome: searchParams.orgao };
  }

  if (searchParams.escolaridade) {
    where.escolaridade = searchParams.escolaridade;
  }

  if (searchParams.busca) {
    where.enunciado = {
      contains: searchParams.busca,
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