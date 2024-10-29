import mongoose, { Mongoose } from 'mongoose';
// b5mFaitDeRaDDR4V

const MONGO_URL = process.env.MONGODB_URL;


interface MongooseConnection {
    conn: Mongoose | null;
    promise: Promise<Mongoose> | null;
}

// declare a cached connection variable
// to maintain the connection state accross modules

let cached: MongooseConnection = (global as any).mongoose;

if (!cached) {
    cached = (global as any).mongoose = {
        conn: null,
        promise: null,
    };
}

export const connectToDatabase = async () => {
    if (cached.conn) return cached.conn;

    if (!MONGO_URL) throw new Error("Missing MongoDB_URL");

    cached.promise =
      cached.promise ||
      mongoose.connect(MONGO_URL, {
        dbName: "ProteinBind",
        bufferCommands: false,
      });

    cached.conn = await cached.promise;

    return cached.conn;
}