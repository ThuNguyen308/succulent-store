import express from 'express';
import * as dotenv from 'dotenv';

//configure env
dotenv.config();

//router object
const router = express.Router();

router.get('/config', (req, res) => {
    return res.status(200).json({
        success: true,
        data: process.env.CLIENT_ID
    })
})

export default router