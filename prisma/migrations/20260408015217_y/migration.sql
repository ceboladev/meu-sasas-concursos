-- DropForeignKey
ALTER TABLE "Alternativa" DROP CONSTRAINT "Alternativa_questaoId_fkey";

-- DropForeignKey
ALTER TABLE "Resposta" DROP CONSTRAINT "Resposta_questaoId_fkey";

-- DropForeignKey
ALTER TABLE "Resposta" DROP CONSTRAINT "Resposta_userId_fkey";

-- AlterTable
ALTER TABLE "Questao" ADD COLUMN     "textoBase" TEXT;

-- CreateIndex
CREATE INDEX "Alternativa_questaoId_idx" ON "Alternativa"("questaoId");

-- CreateIndex
CREATE INDEX "Questao_disciplina_idx" ON "Questao"("disciplina");

-- CreateIndex
CREATE INDEX "Questao_banca_idx" ON "Questao"("banca");

-- CreateIndex
CREATE INDEX "Questao_ano_idx" ON "Questao"("ano");

-- CreateIndex
CREATE INDEX "Resposta_userId_idx" ON "Resposta"("userId");

-- CreateIndex
CREATE INDEX "Resposta_questaoId_idx" ON "Resposta"("questaoId");

-- CreateIndex
CREATE INDEX "Resposta_alternativaId_idx" ON "Resposta"("alternativaId");

-- AddForeignKey
ALTER TABLE "Alternativa" ADD CONSTRAINT "Alternativa_questaoId_fkey" FOREIGN KEY ("questaoId") REFERENCES "Questao"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Resposta" ADD CONSTRAINT "Resposta_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Resposta" ADD CONSTRAINT "Resposta_questaoId_fkey" FOREIGN KEY ("questaoId") REFERENCES "Questao"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Resposta" ADD CONSTRAINT "Resposta_alternativaId_fkey" FOREIGN KEY ("alternativaId") REFERENCES "Alternativa"("id") ON DELETE CASCADE ON UPDATE CASCADE;
