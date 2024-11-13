import mongoose from "mongoose";

const MONGODB_URI = process.env.NEXT_PUBLIC_DATABASE_URL as string;

if (!MONGODB_URI) {
  throw new Error(
    "Please define the DATABASE_URL environment variable in .env.local"
  );
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { connection: null, promise: null };
}

const dbConnect = async (): Promise<void> => {
  if (cached.connection) {
    console.log("Using cached connection");
    return;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI).then((mongoose) => mongoose);
  }

  cached.connection = await cached.promise;
  console.log("Connected to the Database");
};

export default dbConnect;
