import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

function createPrismaClient(): PrismaClient {
  const databaseUrl = process.env.DATABASE_URL
  
  if (!databaseUrl) {
    throw new Error('DATABASE_URL environment variable is not set')
  }

  // Use standard Prisma client with Neon's pooled connection
  // Neon pooled URLs work with standard PostgreSQL drivers
  return new PrismaClient({
    log: ['error'],
    datasources: {
      db: {
        url: databaseUrl,
      },
    },
  })
}

export const db = globalForPrisma.prisma ?? createPrismaClient()

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = db
}
