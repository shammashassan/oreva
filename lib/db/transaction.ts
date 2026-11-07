import { ClientSession, Db } from "mongodb";
import { getMongoClient, getDb } from "./client";

/**
 * Executes operations in an ACID transaction with automatic rollback on replica sets,
 * and graceful sequential execution fallback on standalone MongoDB instances.
 */
export async function runInTransaction<T>(
  operation: (session: ClientSession | null, db: Db) => Promise<T>
): Promise<T> {
  const client = await getMongoClient();
  const db = await getDb();

  let session: ClientSession | null = null;
  try {
    session = client.startSession();
  } catch (err: unknown) {
    // If sessions/transactions are not supported in environment
    console.warn("MongoDB sessions not supported, falling back to non-transactional:", err);
    return operation(null, db);
  }

  try {
    let result: T | undefined;
    await session.withTransaction(async () => {
      result = await operation(session, db);
    });
    return result as T;
  } catch (err: unknown) {
    // Check if error is due to standalone instance not supporting transactions
    const errorMsg = err instanceof Error ? err.message : String(err);
    if (
      errorMsg.includes("Transaction numbers are only allowed on a replica set member") ||
      errorMsg.includes("standalone")
    ) {
      console.warn("Replica set transactions not available, executing sequentially:", errorMsg);
      return operation(null, db);
    }
    throw err;
  } finally {
    if (session) {
      await session.endSession();
    }
  }
}
