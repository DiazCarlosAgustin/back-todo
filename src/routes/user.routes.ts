import { Router } from 'express'
import { crearUsuario } from '../controllers/userController'

const router = Router()

router.route('/register')
    .post(crearUsuario)

export default router