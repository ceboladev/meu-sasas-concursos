"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import GraficoBarras from "@/components/GraficoBarras";

export default function SimuladoClient({ questoes }: any) {
  const router = useRouter();

  const [indice, setIndice] = useState(0);
  const [selecionada, setSelecionada] = useState<string | null>(null);
  const [mostrarComentario, setMostrarComentario] = useState(false);
  const [acertos, setAcertos] = useState(0);

  const [disciplina, setDisciplina] = useState("");
  const [banca, setBanca] = useState("");
  const [ano, setAno] = useState("");
  const [nivel, setNivel] = useState("");

  // Listas únicas
  const disciplinas = [...new Set(questoes.map((q: any) => q.disciplina))];
  const bancas = [...new Set(questoes.map((q: any) => q.banca))];
  const anos = [...new Set(questoes.map((q: any) => q.ano))];

  // Filtro
  const questoesFiltradas = questoes.filter((q: any) => {
    return (
      (!disciplina || q.disciplina === disciplina) &&
      (!banca || q.banca === banca) &&
      (!ano || q.ano === Number(ano)) &&
      (!nivel || q.nivel === nivel)
    );
  });

  // Evita índice inválido
  useEffect(() => {
    if (indice >= questoesFiltradas.length) {
      setIndice(0);
    }
  }, [questoesFiltradas]);

  const questao = questoesFiltradas[indice];

  async function selecionarAlternativa(alt: any) {
    if (selecionada) return;

    await fetch("/api/resposta", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        questaoId: questao.id,
        alternativaId: alt.id,
        correta: alt.isCorreta,
      }),
    });

    setSelecionada(alt.id);

    if (alt.isCorreta) {
      setAcertos((prev) => prev + 1);
    }
  }

  function proxima() {
    if (indice < questoesFiltradas.length - 1) {
      setSelecionada(null);
      setMostrarComentario(false);
      setIndice((prev) => prev + 1);
    }
  }

  function anterior() {
    if (indice > 0) {
      setSelecionada(null);
      setMostrarComentario(false);
      setIndice((prev) => prev - 1);
    }
  }

  const progresso =
    questoesFiltradas.length > 0
      ? ((indice + 1) / questoesFiltradas.length) * 100
      : 0;

  if (questoesFiltradas.length === 0) {
    return (
      <div className="bg-white p-6 rounded-xl shadow-sm border">
        Nenhuma questão encontrada com esses filtros.
      </div>
    );
  }

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm border">
        <h1 className="text-xl font-bold text-[#2c3e50]">
          Banco de Questões
        </h1>

        <div className="flex gap-3">
          <button
            onClick={() => router.push("/dashboard/caderno")}
            className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition"
          >
            📒 Meu Caderno
          </button>

          <button
            onClick={() => {
              localStorage.removeItem("logado");
              router.push("/login");
            }}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
          >
            Sair
          </button>
        </div>
      </div>

      {/* FILTROS */}
     {/* <div className="bg-white p-4 rounded-xl shadow-sm border">
        <div className="grid md:grid-cols-4 gap-4">
          <select
            value={disciplina}
            onChange={(e) => {
              setDisciplina(e.target.value);
              setIndice(0);
            }}
            className="border p-2 rounded"
          >
            <option value="">Disciplina</option>
            {disciplinas.map((d: any) => (
              <option key={d}>{d}</option>
            ))}
          </select>

          <select
            value={banca}
            onChange={(e) => {
              setBanca(e.target.value);
              setIndice(0);
            }}
            className="border p-2 rounded"
          >
            <option value="">Banca</option>
            {bancas.map((b: any) => (
              <option key={b}>{b}</option>
            ))}
          </select>

          <select
            value={ano}
            onChange={(e) => {
              setAno(e.target.value);
              setIndice(0);
            }}
            className="border p-2 rounded"
          >
            <option value="">Ano</option>
            {anos.map((a: any) => (
              <option key={a}>{a}</option>
            ))}
          </select>

          <select
            value={nivel}
            onChange={(e) => {
              setNivel(e.target.value);
              setIndice(0);
            }}
            className="border p-2 rounded"
          >
            <option value="">Nível</option>
            <option value="fundamental">Fundamental</option>
            <option value="medio">Médio</option>
            <option value="superior">Superior</option>
          </select>

          <button
            onClick={() => {
              setDisciplina("");
              setBanca("");
              setAno("");
              setNivel("");
              setIndice(0);
            }}
            className="bg-gray-200 rounded px-4"
          >
            Limpar
          </button>
        </div>
      </div>
*/}
      {/* BARRA DE PROGRESSO */}
      <div>
        <div className="flex justify-between text-sm text-gray-500 mb-1">
          <span>
            Questão {indice + 1} de {questoesFiltradas.length}
          </span>
          <span>{Math.round(progresso)}%</span>
        </div>
        <div className="w-full bg-gray-200 h-2 rounded-full">
          <div
            className="bg-[#2c3e50] h-2 rounded-full"
            style={{ width: `${progresso}%` }}
          />
        </div>
      </div>

      {/* ESTATÍSTICAS */}
      <div className="flex gap-6 text-sm">
        <span>✅ Acertos: {acertos}</span>
        <span>❌ Erros: {indice + 1 - acertos}</span>
      </div>

      {/* QUESTÃO */}
      <div className="bg-white p-6 rounded-xl shadow-sm border">
        <p className="text-xs text-gray-500 mb-2">
          {questao.disciplina} • {questao.banca} • {questao.ano}
        </p>

        {questao.textoBase && (
          <p className="mb-4 whitespace-pre-line">
            {questao.textoBase}
          </p>
        )}

        {questao.imagem && (
          <img
            src={questao.imagem}
            alt="Imagem da questão"
            className="my-4 max-h-80 object-contain"
          />
        )}

        <h2 className="font-medium mb-6">
          {questao.enunciado}

          {questao.graficoJson && (
  <GraficoBarras dados={questao.graficoJson} />
)}
        </h2>

        

        <div className="space-y-3">
          {questao.alternativas.map((alt: any) => {
            let estilo = "border hover:bg-gray-50";

            if (selecionada) {
              if (alt.isCorreta) {
                estilo = "bg-green-100 border-green-500";
              } else if (alt.id === selecionada) {
                estilo = "bg-red-100 border-red-500";
              }
            }

            return (
              <button
                key={alt.id}
                onClick={() => selecionarAlternativa(alt)}
                className={`w-full text-left p-3 rounded-lg border transition ${estilo}`}
              >
                {alt.texto}
              </button>
            );
          })}
        </div>

        {selecionada && (
          <div className="mt-6">
            <button
              onClick={() => setMostrarComentario(!mostrarComentario)}
              className="text-[#2c3e50] font-medium text-sm"
            >
              {mostrarComentario
                ? "Ocultar comentário"
                : "Mostrar comentário"}
            </button>

            {mostrarComentario && (
              <div className="mt-3 p-4 bg-gray-50 rounded-lg text-sm">
                {questao.comentario || "Sem comentário disponível"}
              </div>
            )}
          </div>
        )}
      </div>

      {/* NAVEGAÇÃO */}
      <div className="flex justify-between">
        <button
          disabled={indice === 0}
          onClick={anterior}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Anterior
        </button>

        <button
          disabled={indice === questoesFiltradas.length - 1}
          onClick={proxima}
          className="px-4 py-2 bg-[#2c3e50] text-white rounded disabled:opacity-50"
        >
          Próxima
        </button>
      </div>
    </div>
  );
}