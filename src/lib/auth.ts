
import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { jwt } from "better-auth/plugins";

const client = new MongoClient(process.env.MONGODB_URI!);

const db = client.db("Book-Nook");

export const auth = betterAuth({
  database: mongodbAdapter(db, { client }),

  emailAndPassword: {
    enabled: true,
  },

  secret: process.env.BETTER_AUTH_SECRET,

  baseURL: process.env.BETTER_AUTH_URL,

  plugins: [jwt()],
});

console.log("MongoDB URI found:", Boolean(process.env.MONGODB_URI));
console.log("Auth Secret found:", Boolean(process.env.BETTER_AUTH_SECRET));
