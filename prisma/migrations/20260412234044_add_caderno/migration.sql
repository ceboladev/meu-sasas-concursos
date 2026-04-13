-- CreateTable
CREATE TABLE "Caderno" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "questaoId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Caderno_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Caderno_userId_questaoId_key" ON "Caderno"("userId", "questaoId");

-- AddForeignKey
ALTER TABLE "Caderno" ADD CONSTRAINT "Caderno_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Caderno" ADD CONSTRAINT "Caderno_questaoId_fkey" FOREIGN KEY ("questaoId") REFERENCES "Questao"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
