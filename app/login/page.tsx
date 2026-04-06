"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AuthPage() {
  const router = useRouter();

  const [isLogin, setIsLogin] = useState(true);
  const [erro, setErro] = useState("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErro("");

    const endpoint = isLogin ? "/api/login" : "/api/register";

    const body = isLogin
      ? { email, password }
      : { name, email, password };

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (!res.ok) {
        setErro(data.error || "Erro");
        return;
      }

      // Se for cadastro, depois pode logar automaticamente
      if (!isLogin) {
        alert("Cadastro realizado com sucesso! Faça login.");
        setIsLogin(true);
        return;
      }

      router.push("/dashboard");
    } catch (err) {
      console.error(err);
      setErro("Erro de conexão");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-md w-full max-w-sm space-y-4"
      >
        <h1 className="text-2xl font-bold text-center mb-6">
          {isLogin ? "Login" : "Cadastro"}
        </h1>

        {erro && (
          <div className="bg-red-100 text-red-700 p-2 rounded text-center">
            {erro}
          </div>
        )}

        {!isLogin && (
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
          {isLogin ? "Entrar" : "Cadastrar"}
        </button>

        <button
          type="button"
          onClick={() => {
            setIsLogin(!isLogin);
            setErro("");
          }}
          className="w-full text-sm text-blue-600 hover:underline"
        >
          {isLogin
            ? "Não tem conta? Cadastre-se"
            : "Já tem conta? Fazer login"}
        </button>
      </form>
    </div>
  );
}