import { Request, Response } from 'express'
import { getRepository } from 'typeorm'
import { todo } from '../entity/todo'

/**
 * 
 * @param req 
 * @param res 
 */
export async function getTodosByUser(req: Request, res: Response): Promise<any> {
    try {
        let userID: any = req.params.id

        if (userID > 0 && userID != null) {
            const result = await getRepository(todo)
                .find({
                    relations: ["user", "fromUser"],
                    where: { user: userID },
                })
            res.json({
                status: "Ok",
                todo: result
            })
        }
    } catch (error) {
        console.error(error);
        res.status(404).json(error)
    }
}

/**
 * 
 * @param req 
 * @param res 
 */
export async function addTodo(req: Request, res: Response): Promise<any> {
    try {
        const newTodo = req.body

        if (newTodo != null) {
            await getRepository(todo)
                .save(newTodo)
                .then(result => {
                    res.json({
                        status: "Ok",
                        msg: "El ToDo se agrego correctamente.",
                        todo: result[0]
                    })
                })
                .catch(err => {
                    console.error(err);

                    res.json({
                        status: "Fail",
                        msg: "Algo fallo, intentanuevamente."
                    })
                })
        }
    } catch (error) {
        console.error(error);
        res.json({
            status: "Fail",
            msg: "Algo fallo, intentanuevamente."
        })
    }
}

/**
 * 
 * @param req 
 * @param res 
 */
export async function updateTodo(req: Request, res: Response): Promise<any> {
    try {
        const { id, titulo, descripcion, progreso } = req.body
        await getRepository(todo)
            .createQueryBuilder("Todo")
            .update({ titulo, descripcion, progreso })
            .where("id = :id", { id: id })
            .execute()
            .then(async result => {
                const todoUpdated = await getRepository(todo)
                    .find({ where: { id: id } })
                    .catch(error => {
                        res.json({ error, "status": "Fail", "msg": "No se pudieron guardar los cambios correctamente, intent nuevamente." })
                    })
                if (result.raw.affectedRows > 0 && result.raw.warningCount === 0) {
                    res.json({ todo: todoUpdated, "status": "Ok", "msg": "Los cambios se guardaron correctamente." })

                }
                else {
                    res.json({ todo: todoUpdated, "status": "Fail", "msg": "No se pudieron guardar los cambios correctamente, intent nuevamente." })
                }
            }).catch((err) => {
                console.log(err);
            });
    } catch (error) {
        res.status(400).json({ error })
    }
}