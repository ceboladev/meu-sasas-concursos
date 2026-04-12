"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function FiltroQuestoes() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [busca, setBusca] = useState(searchParams.get("busca") || "");
  const [banca, setBanca] = useState(searchParams.get("banca") || "");
  const [disciplina, setDisciplina] = useState(searchParams.get("disciplina") || "");
  const [orgao, setOrgao] = useState(searchParams.get("orgao") || "");
  const [escolaridade, setEscolaridade] = useState(searchParams.get("escolaridade") || "");

  function aplicarFiltro() {
    const params = new URLSearchParams();

    if (busca) params.set("busca", busca);
    if (banca) params.set("banca", banca);
    if (disciplina) params.set("disciplina", disciplina);
    if (orgao) params.set("orgao", orgao);
    if (escolaridade) params.set("escolaridade", escolaridade);

    params.set("page", "1");

    router.push(`/dashboard?${params.toString()}`);
  }

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md space-y-4">

      <h2 className="text-lg font-semibold">Filtrar Questões</h2>

      <input
        type="text"
        placeholder="Buscar no enunciado..."
        value={busca}
        onChange={(e) => setBusca(e.target.value)}
        className="w-full border rounded-lg p-2 text-sm"
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        <select
          value={banca}
          onChange={(e) => setBanca(e.target.value)}
          className="border rounded-lg p-2 text-sm"
        >
          <option value="">Todas Bancas</option>
          <option value="FGV">FGV</option>
          <option value="IBADE">IBADE</option>
          <option value="AOCP">AOCP</option>
        </select>

        <select
          value={disciplina}
          onChange={(e) => setDisciplina(e.target.value)}
          className="border rounded-lg p-2 text-sm"
        >
          <option value="">Todas Disciplinas</option>
          <option value="Português">Português</option>
          <option value="Informática">Informática</option>
          <option value="Direito Constitucional">Direito Constitucional</option>
          <option value="Matemática">Matemática</option>
        </select>

        <select
          value={orgao}
          onChange={(e) => setOrgao(e.target.value)}
          className="border rounded-lg p-2 text-sm"
        >
          <option value="">Todos Órgãos</option>
          <option value="Prefeitura">Prefeitura</option>
          <option value="TRT">TRT</option>
        </select>

        <select
          value={escolaridade}
          onChange={(e) => setEscolaridade(e.target.value)}
          className="border rounded-lg p-2 text-sm"
        >
          <option value="">Escolaridade</option>
          <option value="fundamental">Fundamental</option>
          <option value="medio">Médio</option>
          <option value="superior">Superior</option>
        </select>
      </div>

      <button
        onClick={aplicarFiltro}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm"
      >
        Aplicar Filtros
      </button>
    </div>
  );
}