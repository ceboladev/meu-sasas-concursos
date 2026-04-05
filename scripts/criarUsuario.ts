import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

async function main() {
  const senhaHash = await bcrypt.hash("123456", 10);

  const user = await prisma.user.create({
    data: {
      name: "Daniel",
      email: "daniel@email.com",
      password: senhaHash,
    },
  });

  console.log("Usuário criado:", user);
}

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());