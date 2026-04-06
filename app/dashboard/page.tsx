import { prisma } from "@/lib/prisma";
import SimuladoClient from "@/components/SimuladoClient";

export default async function DashboardPage() {
  const questoes = await prisma.questao.findMany({
    include: { alternativas: true },
  });

  const totalQuestoes = questoes.length;

  const totalDisciplinas = new Set(
    questoes.map((q) => q.disciplina)
  ).size;

  return (
    <div className="space-y-8">
      
      {/* Título */}
      <div>
        <h1 className="text-2xl font-bold">Simulado</h1>
        <p className="text-gray-500 text-sm">
          Treine com questões reais
        </p>
      </div>

      {/* Cards de estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl shadow-md p-6">
          <p className="text-sm text-gray-500">Total de Questões</p>
          <h2 className="text-3xl font-bold mt-2">
            {totalQuestoes}
          </h2>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6">
          <p className="text-sm text-gray-500">Disciplinas</p>
          <h2 className="text-3xl font-bold mt-2">
            {totalDisciplinas}
          </h2>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6">
          <p className="text-sm text-gray-500">Modo Atual</p>
          <h2 className="text-3xl font-bold mt-2 text-green-600">
            Simulado
          </h2>
        </div>
      </div>

      {/* Aqui continua exatamente seu sistema atual */}
      <div className="bg-white rounded-2xl shadow-md p-6">
        <SimuladoClient questoes={questoes} />
      </div>
    </div>
  );
}