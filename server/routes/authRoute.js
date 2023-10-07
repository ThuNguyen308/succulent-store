import express from 'express';
import { forgotPasswordController, loginController, registerController, testController, updateProfileController } from '../controllers/authController.js';
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js';

//router object
const router = express.Router();

//routing
//REGISTER || METHOD POST
router.post('/register', registerController)

//LOGIN || METHOD POST
router.post('/login', loginController)

//FORGOT-PASSWORD || METHOD POST
router.post('/forgot-password', forgotPasswordController)

//test controller
router.get('/test', requireSignIn, isAdmin, testController)

//protected User route auth
router.get("/user-auth", requireSignIn, (req, res) => {
    res.status(200).send({ok: true})
})

//protected Admin route auth
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
    res.status(200).send({ok: true})
})

//update profile
router.put("/update-profile", requireSignIn, updateProfileController)


export default router