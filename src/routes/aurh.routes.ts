import { Router } from 'express'
import { login } from '../controllers/authController'
import { crearUsuario } from '../controllers/userController'

const router = Router()

router.route("/login")
    .post(login)

router.route("/register")
    .post(crearUsuario)

export default router