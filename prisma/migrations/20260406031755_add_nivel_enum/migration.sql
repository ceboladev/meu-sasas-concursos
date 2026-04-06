/*
  Warnings:

  - The `nivel` column on the `Questao` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "public"."Questao" DROP COLUMN "nivel",
ADD COLUMN     "nivel" "public"."Nivel" NOT NULL DEFAULT 'medio';
