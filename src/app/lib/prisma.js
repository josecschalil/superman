import { PrismaClient } from "../../generated/prisma/client";

let globalForPrisma = global;

// Prevent multiple Prisma Client instances during development
const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

export default prisma;
