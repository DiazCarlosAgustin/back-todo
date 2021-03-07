import { Router } from 'express'
import { getTodosByUser, addTodo, updateTodo } from '../controllers/todoController'
import { isLog } from '../controllers/authController'

const router = Router()

router.use(isLog);
router.route("/")
    .put(updateTodo)
    .post(addTodo)
router.route("/:id")
    .get(getTodosByUser)


export default router