import { auth } from "@/auth";

export default async function Home() {
  const session = await auth();

  if (!session) {
    return (
      <div>
        Você precisa estar logado.
        <a href="/login">Ir para login</a>
      </div>
    );
  }

  return <div>Usuário logado 🎉</div>;
}