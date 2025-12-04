import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis

const prisma = globalForPrisma.prisma ?? new PrismaClient()

// Middleware to enforce technologies field is explicitly provided
prisma.$use(async (params, next) => {
  if (params.model === 'Project' && params.action === 'create') {
    const techs = params.args.data?.technologies;
    if (!Array.isArray(techs) || techs.length === 0) {
      throw new Error('Technologies field is required and cannot be empty');
    }
  }
  return next(params);
});

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

export default prisma
