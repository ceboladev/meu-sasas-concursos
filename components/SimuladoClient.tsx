"use client";

import { useEffect, useState } from "react";
import QuestaoCard from "./QuestaoCard";

export default function SimuladoClient({ questoes }: any) {
  const [acertos, setAcertos] = useState(0);
  const [erros, setErros] = useState(0);
  const [tempo, setTempo] = useState(0);
  const [respondidas, setRespondidas] = useState<number[]>([]);
  const [finalizado, setFinalizado] = useState(false);

  useEffect(() => {
    const intervalo = setInterval(() => {
      setTempo((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(intervalo);
  }, []);

  function registrarResposta(id: number, acertou: boolean) {
    if (respondidas.includes(id)) return;

    setRespondidas((prev) => [...prev, id]);

    if (acertou) {
      setAcertos((prev) => prev + 1);
    } else {
      setErros((prev) => prev + 1);
    }

    if (respondidas.length + 1 === questoes.length) {
      setFinalizado(true);
    }
  }

  function reiniciar() {
    setAcertos(0);
    setErros(0);
    setTempo(0);
    setRespondidas([]);
    setFinalizado(false);
  }

  const total = acertos + erros;
  const porcentagem = total > 0 ? ((acertos / total) * 100).toFixed(1) : 0;

  const horas = String(Math.floor(tempo / 3600)).padStart(2, "0");
  const minutos = String(Math.floor((tempo % 3600) / 60)).padStart(2, "0");
  const segundos = String(tempo % 60).padStart(2, "0");

  return (
    
    <div className="space-y-6">

      <div className="flex justify-between bg-white dark:bg-zinc-900 p-4 rounded-xl shadow">
        <div>⏱ {horas}:{minutos}:{segundos}</div>
        <div>✅ {acertos}</div>
        <div>❌ {erros}</div>
        <div>📊 {porcentagem}%</div>
        <button
          onClick={reiniciar}
          className="bg-red-500 text-white px-3 py-1 rounded"
        >
          Reiniciar
        </button>
      </div>

      {questoes.map((q: any, index: number) => (
        <QuestaoCard
          key={q.id}
          questao={q}
          numero={index + 1}
          onResponder={registrarResposta}
        />
      ))}

      {finalizado && (
        <div className="bg-green-100 p-4 rounded-xl text-center font-semibold">
          🏆 Simulado Finalizado!
        </div>
      )}
    </div>
  );
}