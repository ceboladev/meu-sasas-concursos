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
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-[#2c3e50] text-white p-6 flex flex-col">
        <h2 className="text-xl font-bold mb-8">Dan Concursos</h2>

        <nav className="space-y-4 text-sm">
          <p className="hover:text-gray-300 cursor-pointer">Questões</p>
          <p className="hover:text-gray-300 cursor-pointer">Simulados</p>
          <p className="hover:text-gray-300 cursor-pointer">Desempenho</p>
        </nav>

        <button
          onClick={sair}
          className="mt-auto bg-red-500 hover:bg-red-600 text-white py-2 rounded text-sm"
        >
          Sair
        </button>
      </aside>

      <main className="flex-1 flex flex-col">
        <header className="bg-white shadow-sm p-4">
          <h1 className="font-semibold">Banco de Questões</h1>
        </header>

        <div className="p-8">{children}</div>
      </main>
    </div>
  );
}