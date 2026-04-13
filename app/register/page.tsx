"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    setErro("");
    setSucesso("");

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErro(data.error || "Erro ao cadastrar");
        return;
      }

      setSucesso("Usuário cadastrado com sucesso! Redirecionando...");
      setTimeout(() => router.push("/login"), 2000);
    } catch (err) {
      console.error(err);
      setErro("Erro de conexão");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleRegister}
        className="bg-white p-8 rounded-xl shadow-md w-full max-w-sm space-y-4"
      >
        <h1 className="text-2xl font-bold text-center mb-6">Cadastrar Usuário</h1>

        {erro && (
          <div className="bg-red-100 text-red-700 p-2 rounded text-center">
            {erro}
          </div>
        )}

        {sucesso && (
          <div className="bg-green-100 text-green-700 p-2 rounded text-center">
            {sucesso}
          </div>
        )}

        <div>
          <label className="block font-medium">Nome</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full p-2 border rounded mt-1"
          />
        </div>

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
          Cadastrar
        </button>
      </form>
    </div>
  );
}
  