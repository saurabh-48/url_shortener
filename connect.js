import mongoose from 'mongoose';

async function connectToMongoDb(url) {
    return mongoose.connect(url)
}

export default connectToMongoDb;