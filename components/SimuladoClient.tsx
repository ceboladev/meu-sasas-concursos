"use client";

import { useEffect, useState } from "react";

interface Alternativa {
  id: string;
  texto: string;
  isCorreta: boolean;
}

interface Questao {
  id: string;
  enunciado: string;
  disciplina: string;
  banca: string;
  ano: number;
  comentario: string | null;
  alternativas: Alternativa[];
}

interface Props {
  questoes: Questao[];
}

export default function SimuladoClient({ questoes: iniciais }: Props) {
  const [questoes, setQuestoes] = useState<Questao[]>(iniciais);
  const [disciplina, setDisciplina] = useState("todos");
  const [banca, setBanca] = useState("");
  const [acertos, setAcertos] = useState(0);
  const [erros, setErros] = useState(0);
  const [tempo, setTempo] = useState(0);
  const [respondidas, setRespondidas] = useState<string[]>([]);

  // Cronômetro
  useEffect(() => {
    const intervalo = setInterval(() => setTempo((prev) => prev + 1), 1000);
    return () => clearInterval(intervalo);
  }, []);

  // Buscar questões filtradas
  async function buscarQuestoes() {
    try {
      const res = await fetch(
        `/api/questoes?disciplina=${disciplina}&banca=${banca}`
      );
      if (!res.ok) return;
      const data: Questao[] = await res.json();
      setQuestoes(data);
      reiniciar();
    } catch (err) {
      console.error(err);
    }
  }

  function verificarResposta(questaoId: string, alt: Alternativa) {
    if (respondidas.includes(questaoId)) return;

    setRespondidas((prev) => [...prev, questaoId]);

    if (alt.isCorreta) setAcertos((prev) => prev + 1);
    else setErros((prev) => prev + 1);
  }

  function reiniciar() {
    setAcertos(0);
    setErros(0);
    setTempo(0);
    setRespondidas([]);
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
        <button
          onClick={logout}
          className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
        >
          Sair
        </button>
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
            <div
              key={q.id}
              className="bg-white p-4 rounded-lg shadow space-y-2"
            >
              <h4 className="font-semibold">
                {index + 1}. {q.enunciado}
              </h4>

              {q.alternativas.map((alt) => {
                const jaRespondida = respondidas.includes(q.id);
                const correta = alt.isCorreta;

                return (
                  <label
                    key={alt.id}
                    className={`block mb-2 p-2 rounded border cursor-pointer ${
                      jaRespondida
                        ? correta
                          ? "bg-green-200 border-green-500"
                          : "bg-red-100 border-red-300"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    <input
                      type="radio"
                      name={`questao-${q.id}`}
                      disabled={jaRespondida}
                      onChange={() => verificarResposta(q.id, alt)}
                      className="mr-2"
                    />
                    {alt.texto}
                  </label>
                );
              })}

              {respondidas.includes(q.id) && q.comentario && (
                <div className="text-sm text-gray-600 mt-2">
                  💡 {q.comentario}
                </div>
              )}
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}