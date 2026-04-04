"use client";

import { useEffect, useState } from "react";
import QuestaoCard from "./QuestaoCard";

export default function SimuladoClient({ questoes: iniciais }: any) {
  const [questoes, setQuestoes] = useState(iniciais);
  const [disciplina, setDisciplina] = useState("todos");
  const [banca, setBanca] = useState("");

  const [acertos, setAcertos] = useState(0);
  const [erros, setErros] = useState(0);
  const [tempo, setTempo] = useState(0);
  const [respondidas, setRespondidas] = useState<number[]>([]);
  const [verificadas, setVerificadas] = useState<number[]>([]);

  // ===== CRONÔMETRO IGUAL AO HTML =====
  useEffect(() => {
    const intervalo = setInterval(() => {
      setTempo((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(intervalo);
  }, []);

  async function buscarQuestoes() {
  try {
    const res = await fetch(
      `/api/questoes?disciplina=${disciplina}&banca=${banca}`
    );

    if (!res.ok) {
      console.error("Erro na API:", res.status);
      return;
    }

    const data = await res.json();

    setQuestoes(data);
    reiniciar();
  } catch (error) {
    console.error("Erro ao buscar questões:", error);
  }
}

  // ===== VERIFICAR RESPOSTA =====
  function verificarResposta(id: number, acertou: boolean) {
    if (verificadas.includes(id)) return;

    setVerificadas((prev) => [...prev, id]);

    if (acertou) {
      setAcertos((prev) => prev + 1);
    } else {
      setErros((prev) => prev + 1);
    }
  }

  function reiniciar() {
    setAcertos(0);
    setErros(0);
    setTempo(0);
    setRespondidas([]);
    setVerificadas([]);
  }

  const total = acertos + erros;
  const porcentagem =
    total > 0 ? ((acertos / total) * 100).toFixed(0) : 0;

  const horas = String(Math.floor(tempo / 3600)).padStart(2, "0");
  const minutos = String(Math.floor((tempo % 3600) / 60)).padStart(2, "0");
  const segundos = String(tempo % 60).padStart(2, "0");

  return (
    <div className="min-h-screen bg-gray-100">

      {/* HEADER IGUAL AO HTML */}
      <header className="bg-[#2c3e50] text-white px-6 py-4 flex justify-between items-center shadow">
        <h1 className="text-xl font-bold">Dan Concursos</h1>
      </header>

      <main className="max-w-7xl mx-auto mt-6 grid grid-cols-12 gap-6 px-4">

        {/* SIDEBAR FILTROS */}
        <aside className="col-span-12 md:col-span-3 bg-white p-5 rounded-lg shadow space-y-4 h-fit">
          <h3 className="font-semibold">Filtros</h3>

          <div>
            <label>Disciplina:</label>
            <select
              value={disciplina}
              onChange={(e) => setDisciplina(e.target.value)}
              className="w-full border p-2 rounded mt-1"
            >
              <option value="todos">Todas</option>
              <option value="portugues">Português</option>
              <option value="informatica">Informática</option>
              <option value="direito">Direito Constitucional</option>
            </select>
          </div>

          <div>
            <label>Banca:</label>
            <input
              type="text"
              value={banca}
              onChange={(e) => setBanca(e.target.value)}
              placeholder="Ex: FGV, IBADE..."
              className="w-full border p-2 rounded mt-1"
            />
          </div>

          <button
            onClick={buscarQuestoes}
            className="w-full bg-[#2c3e50] text-white py-2 rounded mt-2"
          >
            FILTRAR QUESTÕES
          </button>
        </aside>

        {/* FEED */}
        <section className="col-span-12 md:col-span-9 space-y-6">

          {/* PLACAR IGUAL AO HTML */}
          <div className="flex justify-around items-center bg-[#2c3e50] text-white p-4 rounded-lg shadow">
            <div>✅ Acertos: {acertos}</div>
            <div>❌ Erros: {erros}</div>
            <div>📊 {porcentagem}%</div>
            <div>⏱ {horas}:{minutos}:{segundos}</div>
            <button
              onClick={reiniciar}
              className="text-xl"
              title="Reiniciar"
            >
              🔄
            </button>
          </div>

          {/* QUESTÕES */}
          {questoes.map((q: any, index: number) => (
            <QuestaoCard
              key={q.id}
              questao={q}
              numero={index + 1}
              onVerificar={verificarResposta}
              jaVerificada={verificadas.includes(q.id)}
            />
          ))}
        </section>
      </main>
    </div>
  );
}