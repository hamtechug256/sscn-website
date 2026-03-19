import { Pool, neonConfig } from '@neondatabase/serverless'
import { PrismaNeon } from '@prisma/adapter-neon'
import { PrismaClient } from '@prisma/client'

// Configure Neon for serverless environments
// Don't use WebSocket - use HTTP fetch instead which works better in serverless
neonConfig.fetchComputeEndpoint = true

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

function createPrismaClient(): PrismaClient {
  const databaseUrl = process.env.DATABASE_URL
  
  if (!databaseUrl) {
    throw new Error('DATABASE_URL environment variable is not set')
  }

  // Create Neon connection pool with fetch-based connection
  const pool = new Pool({ 
    connectionString: databaseUrl,
  })
  
  // Create Prisma client with Neon adapter
  const adapter = new PrismaNeon(pool)
  
  return new PrismaClient({ 
    adapter,
  })
}

export const db = globalForPrisma.prisma ?? createPrismaClient()

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = db
}
