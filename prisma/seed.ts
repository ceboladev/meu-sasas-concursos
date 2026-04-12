import { PrismaClient, Escolaridade } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Iniciando seed profissional...");

  // =============================
  // 1️⃣ BANCAS
  // =============================

  const bancaFGV = await prisma.banca.upsert({
    where: { nome: "FGV" },
    update: {},
    create: { nome: "FGV" },
  });

  // =============================
  // 2️⃣ DISCIPLINAS
  // =============================

  const disciplinasLista = [
    "Matemática",
    "Português",
    "Informática",
    "Direito Constitucional",
  ];

  for (const nome of disciplinasLista) {
    await prisma.disciplina.upsert({
      where: { nome },
      update: {},
      create: { nome },
    });
  }

  // =============================
  // 3️⃣ QUESTÕES
  // =============================

  const questoes = [
    // ================= MATEMÁTICA =================

    {
      disciplina: "Matemática",
      enunciado:
        "O gráfico abaixo representa a quantidade de livros lidos por alunos de quatro turmas durante o mês de março. Com base nos dados apresentados, identifique a turma que apresentou o melhor desempenho.",
      ano: 2024,
      escolaridade: Escolaridade.medio,
      graficoJson: [
        { nome: "Turma A", valor: 12 },
        { nome: "Turma B", valor: 18 },
        { nome: "Turma C", valor: 15 },
        { nome: "Turma D", valor: 10 },
      ],
      comentario:
        "A Turma B apresentou o maior valor (18 livros).",
      alternativas: [
        { texto: "Turma A", isCorreta: false },
        { texto: "Turma B", isCorreta: true },
        { texto: "Turma C", isCorreta: false },
        { texto: "Turma D", isCorreta: false },
      ],
    },

    {
      disciplina: "Matemática",
      enunciado:
        "Observe o gráfico que demonstra o faturamento de uma empresa durante quatro meses consecutivos. Qual foi o aumento do primeiro para o último mês?",
      ano: 2024,
      escolaridade: Escolaridade.medio,
      graficoJson: [
        { nome: "Janeiro", valor: 2000 },
        { nome: "Fevereiro", valor: 2500 },
        { nome: "Março", valor: 3000 },
        { nome: "Abril", valor: 3500 },
      ],
      comentario:
        "3500 - 2000 = 1500.",
      alternativas: [
        { texto: "R$ 500", isCorreta: false },
        { texto: "R$ 1.000", isCorreta: false },
        { texto: "R$ 1.500", isCorreta: true },
        { texto: "R$ 2.000", isCorreta: false },
      ],
    },

    {
      disciplina: "Matemática",
      enunciado:
        "O gráfico apresenta a quantidade de alunos aprovados em quatro disciplinas. Qual é a média de alunos aprovados?",
      ano: 2024,
      escolaridade: Escolaridade.medio,
      graficoJson: [
        { nome: "Português", valor: 30 },
        { nome: "Matemática", valor: 20 },
        { nome: "História", valor: 25 },
        { nome: "Geografia", valor: 25 },
      ],
      comentario:
        "Soma = 100. Média = 100 ÷ 4 = 25.",
      alternativas: [
        { texto: "20", isCorreta: false },
        { texto: "25", isCorreta: true },
        { texto: "30", isCorreta: false },
        { texto: "35", isCorreta: false },
      ],
    },

    // ================= PORTUGUÊS =================

    {
      disciplina: "Português",
      enunciado:
        "Assinale a alternativa em que a palavra está corretamente acentuada segundo as regras da Língua Portuguesa.",
      ano: 2024,
      escolaridade: Escolaridade.medio,
      comentario:
        "A palavra 'saída' é acentuada por apresentar hiato.",
      alternativas: [
        { texto: "Saida", isCorreta: false },
        { texto: "Saída", isCorreta: true },
        { texto: "Saìda", isCorreta: false },
        { texto: "Sáida", isCorreta: false },
      ],
    },

    {
      disciplina: "Português",
      enunciado:
        "Em qual alternativa há erro de concordância verbal?",
      ano: 2024,
      escolaridade: Escolaridade.medio,
      comentario:
        "O correto seria: 'Faz dois anos...'.",
      alternativas: [
        { texto: "Houve muitos problemas.", isCorreta: false },
        { texto: "Fazem dois anos que não o vejo.", isCorreta: true },
        { texto: "Existem boas soluções.", isCorreta: false },
        { texto: "Choveu ontem.", isCorreta: false },
      ],
    },

    // ================= INFORMÁTICA =================

    {
      disciplina: "Informática",
      enunciado:
        "No contexto da segurança da informação, o firewall tem como principal função:",
      ano: 2024,
      escolaridade: Escolaridade.medio,
      comentario:
        "Firewall controla o tráfego de rede, protegendo contra acessos não autorizados.",
      alternativas: [
        { texto: "Armazenar arquivos", isCorreta: false },
        { texto: "Controlar tráfego de rede", isCorreta: true },
        { texto: "Criar planilhas", isCorreta: false },
        { texto: "Compactar dados", isCorreta: false },
      ],
    },

    {
      disciplina: "Informática",
      enunciado:
        "Qual dispositivo é responsável por interligar redes diferentes, permitindo a comunicação entre elas?",
      ano: 2024,
      escolaridade: Escolaridade.medio,
      comentario:
        "O roteador interliga redes distintas.",
      alternativas: [
        { texto: "Switch", isCorreta: false },
        { texto: "Hub", isCorreta: false },
        { texto: "Roteador", isCorreta: true },
        { texto: "Teclado", isCorreta: false },
      ],
    },

    // ================= DIREITO CONSTITUCIONAL =================

    {
      disciplina: "Direito Constitucional",
      enunciado:
        "De acordo com a Constituição Federal de 1988, são Poderes da União:",
      ano: 2024,
      escolaridade: Escolaridade.medio,
      comentario:
        "Art. 2º da CF/88: Legislativo, Executivo e Judiciário.",
      alternativas: [
        { texto: "Executivo, Legislativo e Judiciário", isCorreta: true },
        { texto: "Executivo, Moderador e Judiciário", isCorreta: false },
        { texto: "Legislativo, Militar e Executivo", isCorreta: false },
        { texto: "Judiciário, Eleitoral e Militar", isCorreta: false },
      ],
    },

    {
      disciplina: "Direito Constitucional",
      enunciado:
        "Segundo a Constituição Federal, a soberania é considerada:",
      ano: 2024,
      escolaridade: Escolaridade.medio,
      comentario:
        "Art. 1º da CF: soberania é fundamento da República.",
      alternativas: [
        { texto: "Direito social", isCorreta: false },
        { texto: "Fundamento da República", isCorreta: true },
        { texto: "Garantia individual", isCorreta: false },
        { texto: "Cláusula pétrea implícita", isCorreta: false },
      ],
    },

    {
      disciplina: "Direito Constitucional",
      enunciado:
        "É direito fundamental previsto no artigo 5º da Constituição Federal:",
      ano: 2024,
      escolaridade: Escolaridade.medio,
      comentario:
        "Liberdade de expressão está prevista no art. 5º.",
      alternativas: [
        { texto: "Censura prévia", isCorreta: false },
        { texto: "Liberdade de expressão", isCorreta: true },
        { texto: "Supremacia militar", isCorreta: false },
        { texto: "Voto facultativo universal", isCorreta: false },
      ],
    },
  ];

  // =============================
  // 4️⃣ INSERIR QUESTÕES
  // =============================

  for (const q of questoes) {
    const disciplina = await prisma.disciplina.findUnique({
      where: { nome: q.disciplina },
    });

    await prisma.questao.create({
      data: {
        enunciado: q.enunciado,
        ano: q.ano,
        escolaridade: q.escolaridade,
        banca: { connect: { id: bancaFGV.id } },
        disciplina: { connect: { id: disciplina!.id } },
        graficoJson: q.graficoJson,
        comentario: q.comentario,
        alternativas: {
          create: q.alternativas,
        },
      },
    });
  }

  console.log("✅ Seed profissional executado com sucesso!");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());