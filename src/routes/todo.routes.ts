import { Router } from 'express'
import { getTodosByUser, addTodo, updateTodo } from '../controllers/todoController'
import { isLog } from '../controllers/authController'

const router = Router()

router.use(isLog);
router.route("/")
    .put(updateTodo)
router.route("/:id")
    .get(getTodosByUser)

router.route("/addTodo")
    .post(addTodo)

export default router