import { PrismaNeon } from '@prisma/adapter-neon'
import { PrismaClient } from '@prisma/client'
import { Pool } from '@neondatabase/serverless'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

function createPrismaClient(): PrismaClient {
  // Check if we have a Neon database URL
  const databaseUrl = process.env.DATABASE_URL
  
  if (databaseUrl?.includes('neon.tech') || databaseUrl?.includes('postgresql://')) {
    // Use Neon adapter for PostgreSQL
    const pool = new Pool({ connectionString: databaseUrl })
    const adapter = new PrismaNeon(pool)
    return new PrismaClient({ adapter })
  }
  
  // Fallback for SQLite (local development)
  return new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query'] : [],
  })
}

export const db = globalForPrisma.prisma ?? createPrismaClient()

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = db
}
