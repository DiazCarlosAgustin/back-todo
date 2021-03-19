import { Router } from 'express'
import { getFriends, addFriend, updateSolicitud } from '../controllers/friendsController'
import { isLog } from '../controllers/authController'

const router = Router()

router.use(isLog);
router.route("/:id")
    .get(getFriends)

router.route("/")
    .post(addFriend)
    .put(updateSolicitud)


export default router