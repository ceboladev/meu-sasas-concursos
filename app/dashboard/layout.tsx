"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [menuAberto, setMenuAberto] = useState(false);

  function sair() {
    localStorage.removeItem("logado");
    localStorage.removeItem("usuarioNome");
    localStorage.removeItem("usuarioEmail");
    localStorage.removeItem("usuarioPic");
    router.push("/login");
  }

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* OVERLAY MOBILE */}
      {menuAberto && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setMenuAberto(false)}
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`
          fixed md:static z-50
          w-64 bg-gray-900 text-white
          h-full md:h-auto
          transform transition-transform duration-300
          ${menuAberto ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        <div className="flex flex-col h-full p-6">

          {/* Logo */}
          <h2 className="text-2xl font-bold mb-10">
            Dan Concursos
          </h2>

          {/* Navegação */}
          <nav className="flex flex-col gap-3 text-sm">

            <a
              href="/dashboard"
              className="p-3 rounded-lg hover:bg-gray-800 transition"
            >
              📊 Dashboard
            </a>

            <a
              href="/dashboard/simulados"
              className="p-3 rounded-lg hover:bg-gray-800 transition"
            >
              📝 Simulados
            </a>

            <a
              href="/dashboard/historico"
              className="p-3 rounded-lg hover:bg-gray-800 transition"
            >
              📈 Histórico
            </a>

            <a
              href="/dashboard/favoritas"
              className="p-3 rounded-lg hover:bg-gray-800 transition"
            >
              ⭐ Favoritas
            </a>

          </nav>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Botão sair */}
          <button
            onClick={sair}
            className="bg-red-500 hover:bg-red-600 transition p-3 rounded-lg text-sm"
          >
            Sair
          </button>
        </div>
      </aside>

      {/* CONTEÚDO */}
      <div className="flex-1 flex flex-col">

        {/* HEADER */}
        <header className="bg-white shadow-sm p-4 flex items-center justify-between">

          {/* Botão mobile */}
          <button
            className="md:hidden text-xl"
            onClick={() => setMenuAberto(!menuAberto)}
          >
            ☰
          </button>

          <h1 className="font-semibold text-gray-700">
            Painel do Aluno
          </h1>

          <div className="text-sm text-gray-500">
            Bem-vindo 👋
          </div>

        </header>

        {/* MAIN */}
        <main className="flex-1 p-4 sm:p-6 md:p-8">
          {children}
        </main>

      </div>
    </div>
  );
}