"use client";

import { useRouter } from "next/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  function sair() {
    localStorage.removeItem("logado");
    localStorage.removeItem("usuarioNome");
    localStorage.removeItem("usuarioEmail");
    localStorage.removeItem("usuarioPic");
    router.push("/login");
  }

  return (
     <div className="flex min-h-screen">
      
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white p-6">
        <h2 className="text-2xl font-bold mb-8">
          Meu SaaS
        </h2>

        <nav className="space-y-4">
          <a
            href="/dashboard"
            className="block hover:bg-gray-700 p-2 rounded-lg"
          >
            📊 Dashboard
          </a>

          <a
            href="/dashboard/simulados"
            className="block hover:bg-gray-700 p-2 rounded-lg"
          >
            📝 Simulados
          </a>

          <a
            href="/dashboard/historico"
            className="block hover:bg-gray-700 p-2 rounded-lg"
          >
            📈 Histórico
          </a>

          <a
            href="/dashboard/favoritas"
            className="block hover:bg-gray-700 p-2 rounded-lg"
          >
            ⭐ Favoritas
          </a>
        </nav>
      

        <button
          onClick={sair}
          className="mt-auto bg-red-500 hover:bg-red-600 text-white py-2 rounded text-sm"
        >
          Sair
        </button>
      </aside>

      <main className="flex-1 flex flex-col">
        <header className="bg-gray-900 shadow-sm p-4">
          <h1 className="font-semibold text-white-600">Dan Concursos</h1>
        </header>

        <div className="p-8">{children}</div>
      </main>
    </div>
  );
}