import { Router } from 'express'
import { getFriends, addFriend, updateSolicitud } from '../controllers/friendsController'
import { isLog } from '../controllers/authController'

const router = Router()

router.use(isLog);
router.route("/:id")
    .get(getFriends)
    .post(updateSolicitud)
router.route("/")
    .post(addFriend)

export default router