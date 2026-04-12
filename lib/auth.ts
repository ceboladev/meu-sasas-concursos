import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET!;

export function gerarToken(userId: string) {
  return jwt.sign({ userId }, SECRET, { expiresIn: "4h" });
}

export function verificarToken(token: string) {
  return jwt.verify(token, SECRET) as { userId: string };
}