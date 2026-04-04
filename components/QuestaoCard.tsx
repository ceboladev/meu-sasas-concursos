"use client";

import { useState } from "react";

export default function QuestaoCard({
  questao,
  numero,
  onResponder,
}: any) {
  const [respondida, setRespondida] = useState(false);

  function responder(isCorreta: boolean) {
    if (respondida) return;

    setRespondida(true);
    onResponder(questao.id, isCorreta);
  }

  return (
    <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl shadow space-y-4">
      <div className="text-sm text-zinc-500">
        Questão {numero} • {questao.banca} • {questao.ano}
      </div>

      <h2 className="font-medium">{questao.enunciado}</h2>

      <div className="space-y-2">
        {questao.alternativas.map((alt: any, index: number) => {
          let estilo =
            "w-full text-left p-3 rounded-lg border cursor-pointer";

          return (
            <button
              key={alt.id}
              onClick={() => responder(alt.isCorreta)}
              className={estilo}
            >
              {String.fromCharCode(65 + index)}) {alt.texto}
            </button>
          );
        })}
      </div>
    </div>
  );
}