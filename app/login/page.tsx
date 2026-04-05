"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [erro, setErro] = useState("");

  useEffect(() => {
    if (localStorage.getItem("logado") === "true") {
      router.push("/dashboard");
    }
  }, [router]);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setErro("");

    try {
      const res = await fetch(`/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErro(data.error || "Erro ao logar");
        return;
      }

      localStorage.setItem("logado", "true");
      localStorage.setItem("usuarioNome", data.name);
      localStorage.setItem("usuarioEmail", data.email);
      localStorage.setItem("usuarioPic", "https://i.pravatar.cc/38");

     router.push("/dashboard");
    } catch (err) {
      console.error(err);
      setErro("Erro de conexão");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-xl shadow-md w-full max-w-sm space-y-4"
      >
        <h1 className="text-2xl font-bold text-center mb-6">Dan Concursos</h1>

        {erro && (
          <div className="bg-red-100 text-red-700 p-2 rounded text-center">
            {erro}
          </div>
        )}

        <div>
          <label className="block font-medium">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-2 border rounded mt-1"
          />
        </div>

        <div>
          <label className="block font-medium">Senha</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-2 border rounded mt-1"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-[#2c3e50] text-white py-2 rounded hover:bg-[#1b2733] transition"
        >
          Entrar
        </button>

        <button
          type="button"
          onClick={() => router.push("/register")}
          className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition"
        >
          Cadastrar Novo Usuário
        </button>
      </form>
    </div>
  );
}