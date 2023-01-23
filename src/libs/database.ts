import mongoose from 'mongoose';
import { DATABASE_URL } from '../utils/constant';



if (!DATABASE_URL) {
    throw new Error(
        'Please difine the DATABASE_URL environment variable inside .env.local'
    );
}
mongoose.set('strictQuery',false);


/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
// @ts-ignore

let globalWithMongoose = global as typeof globalThis & {
    mongoose: any;
};
let cached = globalWithMongoose.mongoose;

if (!cached) {
    cached = globalWithMongoose.mongoose = { conn: null, promise: null };
}

const connectToDatabase = async () => {
    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        const opts = {
            bufferCommands: true,
            useUnifiedTopology: true,
            useNewUrlParser: true,
            connectTimeoutMS: 30000,
        };

        cached.promise = mongoose.connect(`${DATABASE_URL}`, opts).then((mongoose) => {
            return mongoose;
        });
    }
    cached.conn = await cached.promise;
    return cached.conn;
};

export default connectToDatabase;
