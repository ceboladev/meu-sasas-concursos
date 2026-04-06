-- CreateEnum
CREATE TYPE "public"."Nivel" AS ENUM ('fundamental', 'medio', 'superior');

-- AlterTable
ALTER TABLE "public"."Questao" ADD COLUMN     "nivel" TEXT NOT NULL DEFAULT 'medio';

-- CreateTable
CREATE TABLE "public"."Resposta" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "questaoId" TEXT NOT NULL,
    "alternativaId" TEXT NOT NULL,
    "correta" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Resposta_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Resposta" ADD CONSTRAINT "Resposta_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Resposta" ADD CONSTRAINT "Resposta_questaoId_fkey" FOREIGN KEY ("questaoId") REFERENCES "public"."Questao"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
