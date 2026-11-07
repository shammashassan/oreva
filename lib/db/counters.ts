import { ClientSession } from "mongodb";
import { getCollection, COLLECTIONS } from "./client";

interface CounterDoc {
  _id: string;
  seq: number;
}

/**
 * Generates monotonic document and SKU sequences via atomic counters collection.
 */
export async function getNextSequence(
  sequenceName: string,
  session?: ClientSession | null
): Promise<number> {
  const collection = await getCollection<CounterDoc>(COLLECTIONS.COUNTERS);

  const result = await collection.findOneAndUpdate(
    { _id: sequenceName },
    { $inc: { seq: 1 } },
    {
      upsert: true,
      returnDocument: "after",
      session: session ?? undefined,
    }
  );

  return result?.seq ?? 1;
}
