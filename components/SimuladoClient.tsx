"use client";

import { useEffect, useState } from "react";
import QuestaoCard from "@/components/QuestaoCard";

export default function DashboardPage() {
  const [usuarioNome, setUsuarioNome] = useState("");
  const [usuarioPic, setUsuarioPic] = useState("");
  const [questoes, setQuestoes] = useState<any[]>([]);
  const [disciplina, setDisciplina] = useState("todos");
  const [banca, setBanca] = useState("");

  const [acertos, setAcertos] = useState(0);
  const [erros, setErros] = useState(0);
  const [tempo, setTempo] = useState(0);
  const [verificadas, setVerificadas] = useState<number[]>([]);

  // Cronômetro
  useEffect(() => {
    const intervalo = setInterval(() => setTempo((prev) => prev + 1), 1000);
    return () => clearInterval(intervalo);
  }, []);

  // Verificar login
  useEffect(() => {
    const nome = localStorage.getItem("usuarioNome");
    const pic = localStorage.getItem("usuarioPic");

    if (!nome) {
      window.location.href = "/login";
    } else {
      setUsuarioNome(nome);
      setUsuarioPic(pic || "");
      buscarQuestoes();
    }
  }, []);

  async function buscarQuestoes() {
    try {
      const res = await fetch(
        `/api/questoes?disciplina=${disciplina}&banca=${banca}`
      );
      if (!res.ok) throw new Error("Erro na API");

      const data = await res.json();
      setQuestoes(data);
      reiniciar();
    } catch (err) {
      console.error(err);
    }
  }

  function reiniciar() {
    setAcertos(0);
    setErros(0);
    setTempo(0);
    setVerificadas([]);
  }

  function verificarResposta(id: number, acertou: boolean) {
    if (verificadas.includes(id)) return;

    setVerificadas((prev) => [...prev, id]);

    if (acertou) setAcertos((prev) => prev + 1);
    else setErros((prev) => prev + 1);
  }

  function logout() {
    localStorage.clear();
    window.location.href = "/login";
  }

  const total = acertos + erros;
  const porcentagem = total > 0 ? ((acertos / total) * 100).toFixed(0) : 0;
  const horas = String(Math.floor(tempo / 3600)).padStart(2, "0");
  const minutos = String(Math.floor((tempo % 3600) / 60)).padStart(2, "0");
  const segundos = String(tempo % 60).padStart(2, "0");

  return (
    <div className="min-h-screen bg-gray-100">
      {/* HEADER */}
      <header className="bg-[#2c3e50] text-white px-6 py-4 flex justify-between items-center shadow">
        <h1 className="text-xl font-bold">Dan Concursos</h1>
        <div className="flex items-center gap-3">
          <img
            src={usuarioPic}
            alt="Foto"
            className="w-8 h-8 rounded-full"
          />
          <span>{usuarioNome}</span>
          <button
            onClick={logout}
            className="bg-red-500 px-3 py-1 rounded text-white"
          >
            Sair
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto mt-6 grid grid-cols-12 gap-6 px-4">
        {/* SIDEBAR */}
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
          {/* PLACAR */}
          <div className="flex justify-around items-center bg-[#2c3e50] text-white p-4 rounded-lg shadow">
            <div>✅ Acertos: {acertos}</div>
            <div>❌ Erros: {erros}</div>
            <div>📊 {porcentagem}%</div>
            <div>⏱ {horas}:{minutos}:{segundos}</div>
            <button onClick={reiniciar} className="text-xl" title="Reiniciar">
              🔄
            </button>
          </div>

          {/* QUESTÕES */}
          {questoes.map((q, index) => (
            <QuestaoCard
              key={q.id}
              questao={q}
              numero={index + 1}
              onVerificar={verificarResposta}
              jaVerificada={verificadas.includes(q.id)}
              mostrarCorreta
            />
          ))}
        </section>
      </main>
    </div>
  );
}