import { Router } from "express";
import controller from './user.controller.js'
import jwtAuthorize from "../../middlewares/jwtAuthorize.js";
import isAdmin from "../../middlewares/verifyAdmin.js";

const router = Router();

router.post('/login', controller.userLogin)
router.post('/', controller.registerUser)
router.get('/',isAdmin, controller.userList)
router.delete('/:userId',isAdmin, controller.deleteUser)
router.use(jwtAuthorize)
router.get('/:userId', controller.user)



export default router