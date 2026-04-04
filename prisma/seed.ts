import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Iniciando seed...");

  await prisma.alternativa.deleteMany();
  await prisma.questao.deleteMany();

  await prisma.questao.create({
    data: {
      disciplina: "Português",
      banca: "FGV",
      ano: 2023,
      enunciado: "Assinale a alternativa em que a palavra está corretamente acentuada.",
      comentario: "A palavra 'lâmpada' recebe acento por ser proparoxítona.",
      alternativas: {
        create: [
          { texto: "Lampada", isCorreta: false },
          { texto: "Lâmpada", isCorreta: true },
          { texto: "Lampáda", isCorreta: false },
          { texto: "Lampađa", isCorreta: false },
        ],
      },
    },
  });

  await prisma.questao.create({
    data: {
      disciplina: "Informática",
      banca: "IBADE",
      ano: 2022,
      enunciado: "Qual linguagem é usada para estilização na web?",
      comentario: "CSS é responsável pela estilização.",
      alternativas: {
        create: [
          { texto: "HTML", isCorreta: false },
          { texto: "CSS", isCorreta: true },
          { texto: "Java", isCorreta: false },
          { texto: "C++", isCorreta: false },
        ],
      },
    },
  });

  await prisma.questao.create({
    data: {
      disciplina: "Direito Constitucional",
      banca: "AOCP",
      ano: 2021,
      enunciado: "A Constituição Federal foi promulgada em qual ano?",
      comentario: "A Constituição vigente é de 1988.",
      alternativas: {
        create: [
          { texto: "1985", isCorreta: false },
          { texto: "1988", isCorreta: true },
          { texto: "1990", isCorreta: false },
          { texto: "2000", isCorreta: false },
        ],
      },
    },
  });

  console.log("✅ Seed finalizado com sucesso!");
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });