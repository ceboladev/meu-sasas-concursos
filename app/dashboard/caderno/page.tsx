import { prisma } from "@/lib/prisma";

export default async function CadernoPage() {
  const respostas = await prisma.resposta.findMany({
    include: { questao: true },
    orderBy: { createdAt: "desc" }
  });

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">
        Meu Caderno de Respostas
      </h1>

      {respostas.map((r) => (
        <div key={r.id} className="bg-white p-4 rounded shadow mb-4">
          <p>{r.questao.enunciado}</p>
          <p className={r.correta ? "text-green-600" : "text-red-600"}>
            {r.correta ? "Acertou" : "Errou"}
          </p>
        </div>
      ))}
    </div>
  );
}