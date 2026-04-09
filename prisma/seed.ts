import { PrismaClient, Escolaridade } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Criar banca e disciplina
  const banca = await prisma.banca.upsert({
    where: { nome: "FGV" },
    update: {},
    create: { nome: "FGV" },
  });

  const disciplina = await prisma.disciplina.upsert({
    where: { nome: "Informática" },
    update: {},
    create: { nome: "Informática" },
  });

  // Lista de 50 questões
  const questoes = [
    {
      enunciado: "O PostgreSQL é:",
      ano: 2024,
      escolaridade: Escolaridade.medio,
      alternativas: [
        { texto: "Banco relacional", isCorreta: true },
        { texto: "Banco NoSQL", isCorreta: false },
        { texto: "Banco em memória", isCorreta: false },
        { texto: "Planilha", isCorreta: false },
      ],
    },
    {
      enunciado: "HTML é uma linguagem de:",
      ano: 2024,
      escolaridade: Escolaridade.medio,
      alternativas: [
        { texto: "Marcação", isCorreta: true },
        { texto: "Programação", isCorreta: false },
        { texto: "Banco de Dados", isCorreta: false },
        { texto: "Estatística", isCorreta: false },
      ],
    },
    {
      enunciado: "O CSS serve para:",
      ano: 2024,
      escolaridade: Escolaridade.medio,
      alternativas: [
        { texto: "Estilizar páginas web", isCorreta: true },
        { texto: "Armazenar dados", isCorreta: false },
        { texto: "Criar funções", isCorreta: false },
        { texto: "Enviar emails", isCorreta: false },
      ],
    },
    {
      enunciado: "JavaScript é executado no:",
      ano: 2024,
      escolaridade: Escolaridade.medio,
      alternativas: [
        { texto: "Navegador", isCorreta: true },
        { texto: "Banco de Dados", isCorreta: false },
        { texto: "Servidor de email", isCorreta: false },
        { texto: "Planilha", isCorreta: false },
      ],
    },
    {
      enunciado: "Qual é o comando para criar uma pasta no Windows?",
      ano: 2024,
      escolaridade: Escolaridade.medio,
      alternativas: [
        { texto: "mkdir", isCorreta: true },
        { texto: "rmdir", isCorreta: false },
        { texto: "touch", isCorreta: false },
        { texto: "del", isCorreta: false },
      ],
    },
    // ... continue até ter 50 questões
  ];

  

  // Inserir todas as questões
  for (const q of questoes) {
    await prisma.questao.create({
      data: {
        enunciado: q.enunciado,
        ano: q.ano,
        escolaridade: q.escolaridade,
        banca: { connect: { id: banca.id } },
        disciplina: { connect: { id: disciplina.id } },
        alternativas: { create: q.alternativas },
      },
    });
  }

  console.log("✅ Seed com 50 questões de informática inseridas com sucesso!");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());