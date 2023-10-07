import express from 'express';
import colors from 'colors';
import * as dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';

import connectDB from './config/db.js';
import authRoutes from './routes/authRoute.js'
import categoryRoutes from './routes/categoryRoute.js'
import productRoutes from './routes/productRoute.js'
import paymentRoutes from './routes/paymentRoute.js'



//configure env
dotenv.config();

//database config
connectDB();

//rest object
const app = express();

//middlewares
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(morgan('dev'))
app.use(cors())


//routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/category', categoryRoutes);
app.use('/api/v1/product', productRoutes);
app.use('/api/v1/payment', paymentRoutes);

//rest api
app.get('/', (req, res) => {
    res.send('<h1>Welcome</h1>')
})

//PORT
const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
    console.log(`Server is running on mode ${process.env.DEV_MODE} on port ${PORT}`.bgCyan.white)
})