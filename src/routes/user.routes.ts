import { Router } from 'express'
import { getUserLog, getUsersToAdd } from '../controllers/userController'
import { isLog } from '../controllers/authController'
const router = Router()

router.use(isLog)
router.route('/loged')
    .get(getUserLog)
router.route("/:id")
    .get(getUsersToAdd)

export default router