import { Router } from 'express'
import { getFriends, addFriend } from '../controllers/friendsController'
import { isLog } from '../controllers/authController'

const router = Router()

router.use(isLog);
router.route("/:id")
    .get(getFriends)
router.route("/")
    .post(addFriend)

export default router