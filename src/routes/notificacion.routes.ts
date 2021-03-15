import { Router } from 'express'
import { getNotificaciones } from '../controllers/notificacionesController'
import { isLog } from '../controllers/authController'

const router = Router()

router.use(isLog)

router.route("/:id")
    .get(getNotificaciones)

export default router