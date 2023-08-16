import { Router } from "express";
import userRouter from './component/users/user.route.js'

const router = Router();

router.use('/user', userRouter)


export default router;