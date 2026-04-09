/*
  Warnings:

  - You are about to drop the column `banca` on the `Questao` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Questao` table. All the data in the column will be lost.
  - You are about to drop the column `disciplina` on the `Questao` table. All the data in the column will be lost.
  - You are about to drop the column `nivel` on the `Questao` table. All the data in the column will be lost.
  - You are about to drop the `Resposta` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `bancaId` to the `Questao` table without a default value. This is not possible if the table is not empty.
  - Added the required column `disciplinaId` to the `Questao` table without a default value. This is not possible if the table is not empty.
  - Added the required column `escolaridade` to the `Questao` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Escolaridade" AS ENUM ('fundamental', 'medio', 'superior');

-- DropForeignKey
ALTER TABLE "Alternativa" DROP CONSTRAINT "Alternativa_questaoId_fkey";

-- DropForeignKey
ALTER TABLE "Resposta" DROP CONSTRAINT "Resposta_alternativaId_fkey";

-- DropForeignKey
ALTER TABLE "Resposta" DROP CONSTRAINT "Resposta_questaoId_fkey";

-- DropForeignKey
ALTER TABLE "Resposta" DROP CONSTRAINT "Resposta_userId_fkey";

-- DropIndex
DROP INDEX "Alternativa_questaoId_idx";

-- DropIndex
DROP INDEX "Questao_banca_idx";

-- DropIndex
DROP INDEX "Questao_disciplina_idx";

-- AlterTable
ALTER TABLE "Questao" DROP COLUMN "banca",
DROP COLUMN "createdAt",
DROP COLUMN "disciplina",
DROP COLUMN "nivel",
ADD COLUMN     "bancaId" TEXT NOT NULL,
ADD COLUMN     "disciplinaId" TEXT NOT NULL,
ADD COLUMN     "escolaridade" "Escolaridade" NOT NULL,
ADD COLUMN     "orgaoId" TEXT;

-- DropTable
DROP TABLE "Resposta";

-- DropTable
DROP TABLE "User";

-- DropEnum
DROP TYPE "Nivel";

-- CreateTable
CREATE TABLE "Banca" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,

    CONSTRAINT "Banca_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Disciplina" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,

    CONSTRAINT "Disciplina_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Orgao" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,

    CONSTRAINT "Orgao_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Banca_nome_key" ON "Banca"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "Disciplina_nome_key" ON "Disciplina"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "Orgao_nome_key" ON "Orgao"("nome");

-- CreateIndex
CREATE INDEX "Questao_bancaId_idx" ON "Questao"("bancaId");

-- CreateIndex
CREATE INDEX "Questao_disciplinaId_idx" ON "Questao"("disciplinaId");

-- CreateIndex
CREATE INDEX "Questao_escolaridade_idx" ON "Questao"("escolaridade");

-- AddForeignKey
ALTER TABLE "Questao" ADD CONSTRAINT "Questao_bancaId_fkey" FOREIGN KEY ("bancaId") REFERENCES "Banca"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Questao" ADD CONSTRAINT "Questao_disciplinaId_fkey" FOREIGN KEY ("disciplinaId") REFERENCES "Disciplina"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Questao" ADD CONSTRAINT "Questao_orgaoId_fkey" FOREIGN KEY ("orgaoId") REFERENCES "Orgao"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Alternativa" ADD CONSTRAINT "Alternativa_questaoId_fkey" FOREIGN KEY ("questaoId") REFERENCES "Questao"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
