"use client";

import { useState } from "react";

export default function QuestaoCard({
  questao,
  numero,
  onVerificar,
  jaVerificada,
}: any) {
  const [selecionada, setSelecionada] = useState<string | null>(null);
  const [resultado, setResultado] = useState<"certo" | "errado" | null>(null);

  function verificar() {
    if (!selecionada || jaVerificada) return;

    const alternativaEscolhida = questao.alternativas.find(
      (alt: any) => alt.id === selecionada
    );

    const acertou = alternativaEscolhida?.isCorreta === true;

    setResultado(acertou ? "certo" : "errado");
    onVerificar(questao.id, acertou);
  }

  return (
    <div className="bg-white p-5 rounded shadow border">
      <h4 className="font-semibold mb-3">
        {numero}) {questao.enunciado}
      </h4>

      {questao.alternativas?.map((alt: any) => {
        const isCorreta = alt.isCorreta;
        const isSelecionada = alt.id === selecionada;

        let classe = "";

        if (jaVerificada) {
          if (isCorreta) classe = "bg-green-200"; // sempre mostra correta
          else if (isSelecionada && !isCorreta) classe = "bg-red-200";
        }

        return (
          <label
            key={alt.id}
            className={`block mb-2 p-2 rounded cursor-pointer ${classe}`}
          >
            <input
              type="radio"
              name={`q-${questao.id}`}
              value={alt.id}
              disabled={jaVerificada}
              onChange={() => setSelecionada(alt.id)}
              className="mr-2"
            />
            {alt.texto}
          </label>
        );
      })}

      <button
        onClick={verificar}
        disabled={jaVerificada || !selecionada}
        className="mt-3 bg-[#2c3e50] text-white px-4 py-1 rounded"
      >
        Verificar Resposta
      </button>

      {resultado === "certo" && (
        <p className="text-green-600 mt-2 font-semibold">✅ Você acertou!</p>
      )}
      {resultado === "errado" && (
        <p className="text-red-600 mt-2 font-semibold">❌ Você errou!</p>
      )}
    </div>
  );
}