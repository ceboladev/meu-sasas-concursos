"use client";

export default function CadernoClient({ questoes }: any) {

  async function remover(questaoId: string) {
    await fetch("/api/caderno", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ questaoId }),
    });

    location.reload();
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Meu Caderno</h1>

      {questoes.map((item: any) => (
        <div key={item.id} className="border p-4 rounded mb-3">
          <h3>{item.questao.enunciado}</h3>

          <button
            onClick={() => remover(item.questaoId)}
            className="mt-2 bg-red-500 text-white px-3 py-1 rounded"
          >
            Remover
          </button>
        </div>
      ))}
    </div>
  );
}