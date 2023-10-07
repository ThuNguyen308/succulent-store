import mongoose from 'mongoose';
import colors from 'colors'

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGGO_URL)
        console.log(`Connected to MongoDb ${conn.connection.host}`.bgMagenta.white)
    } catch (err) {
        console.error(`Error in Mongodb ${err}`.bgRed.white);
    }
}

export default connectDB