import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;

console.log("MONGODB_URI:", uri ? "set" : "NOT SET");

if (!uri) {
  throw new Error(
    "Missing MONGODB_URI. Add it to your .env.local file (see SETUP.md)."
  );
}

declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === "development") {
  // In dev, Next.js hot-reloads the module, which would otherwise open a
  // new connection on every save. Cache it on the global object instead.
  if (!global._mongoClientPromise) {
    const client = new MongoClient(uri);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  const client = new MongoClient(uri);
  clientPromise = client.connect();
}

export default clientPromise;

// Single place to change the database name later if you ever need to.
export async function getDb() {
  const client = await clientPromise;
  return client.db("womens-point");
}