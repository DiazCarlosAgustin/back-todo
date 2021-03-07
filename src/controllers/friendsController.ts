import { Request, Response } from 'express'
import { friend } from '../entity/friend'
import { createQueryBuilder, getRepository } from 'typeorm'

/**
 * 
 * @param req 
 * @param res 
 */
export async function getFriends(req: Request, res: Response): Promise<any> {
    try {
        const id: any = req.params.id
        await createQueryBuilder("friend")
            .leftJoinAndSelect("friend.friend_id", "user")
            .where("friend.aceptado = true")
            .andWhere("friend.user_id = :id", { id })
            .getMany()
            .then(result => {
                res.json({
                    status: "Ok",
                    friends: result
                })
            })
            .catch(error => {
                console.error(error);

            })
    } catch (error) {
        console.error(error);
        res.status(400).json({
            status: "Fail",
            error
        })
    }
}

export async function addFriend(req: Request, res: Response): Promise<any> {
    try {
        const newFriend = {
            user_id: req.body.user_id,
            friend_id: req.body.friend_id
        }
        const existeUnaRelacion = await getRepository(friend)
            .find({ where: { user_id: newFriend.user_id, friend_id: newFriend.friend_id } })

        if (existeUnaRelacion == null) {
            if (newFriend.user_id != newFriend.friend_id) {
                await getRepository(friend)
                    .save(newFriend)
                    .then(result => {
                        res.json({
                            status: "Ok",
                            msg: "Se envio la solicitud al usuario.",
                            friend: result
                        })
                    })
            }
            else {
                res.json({
                    status: "Fail",
                    msg: "No te puedes agregar a ti mismo como amigo."
                })
            }
        }
        else {
            res.json({
                status: "Await",
                msg: "Ya fue enviada la solicitud, aun esta en espera de aprobación del usuario."
            })
        }
    }
    catch (error) {
        res.status(400).json(error)
    }
}