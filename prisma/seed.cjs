const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient({
  datasourceUrl: process.env.DATABASE_URL,
});

async function main() {
  console.log('🌱 Populando banco de dados...');

  const q1 = await prisma.questao.create({
    data: {
      enunciado: 'No Linux Mint, qual comando é utilizado para gerenciar pacotes .deb manualmente via terminal?',
      disciplina: 'Informática',
      banca: 'FGV',
      ano: 2026,
      alternativas: {
        create: [
          { texto: 'apt-get', isCorreta: false },
          { texto: 'dpkg', isCorreta: true },
          { texto: 'rpm', isCorreta: false },
          { texto: 'brew', isCorreta: false },
        ],
      },
    },
  });

  console.log('✅ Sucesso! Questão criada com ID:', q1.id);
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });