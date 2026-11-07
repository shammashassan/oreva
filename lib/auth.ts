import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/oreva";

declare global {
  // eslint-disable-next-line no-var
  var _authMongoClientPromise: Promise<MongoClient> | undefined;
}

let authClient: MongoClient;
let authClientPromise: Promise<MongoClient>;

const options = {
  maxPoolSize: 5,
  minPoolSize: 0,
  maxIdleTimeMS: 30000,
  serverSelectionTimeoutMS: 5000,
  connectTimeoutMS: 10000,
};

if (process.env.NODE_ENV === "development") {
  if (!global._authMongoClientPromise) {
    authClient = new MongoClient(uri, options);
    global._authMongoClientPromise = authClient.connect();
  }
  authClientPromise = global._authMongoClientPromise;
} else {
  authClient = new MongoClient(uri, options);
  authClientPromise = authClient.connect();
}

// Prepare client & database instance for Better Auth
const dbClient = new MongoClient(uri, options);
const db = dbClient.db();

const socialProviders: Record<string, { clientId: string; clientSecret: string }> = {};

if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  socialProviders.google = {
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  };
}

export const auth = betterAuth({
  database: mongodbAdapter(db),
  baseURL: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  emailAndPassword: {
    enabled: true,
  },
  ...(Object.keys(socialProviders).length > 0 ? { socialProviders } : {}),
});

export type Session = typeof auth.$Infer.Session;
