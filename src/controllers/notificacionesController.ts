import { Request, Response } from 'express'
import { getRepository } from 'typeorm'
import { notificacion } from '../entity/notificacion'
import { interfaceNotificacion } from '../interfaces/notificacion'
import { user } from '../entity/user'
import { getNombreUsuario } from './userController'

export async function getNotificaciones(req: Request, res: Response) {
    try {
        const id: any = req.params.id
        await getRepository(notificacion)
            .find({
                relations: ["user_id"],
                where: {
                    user_id: id,
                    status: 0
                },
                order: { id: "DESC" }
            })
            .then(result => {
                res.json({
                    status: "Ok",
                    notificaciones: result
                })
            })
            .catch(error => {
                res.json({
                    status: "Fail",
                    msg: "Algo fallo, intentenuevamente.",
                    error
                })
            })
    } catch (error) {
        console.error(error)
        res.status(400).json(error)
    }
}

export async function addNotificacion(noti: interfaceNotificacion): Promise<any> {
    if (noti != null) {
        try {
            if (noti.sendBy != null) {
                const usuario = await getNombreUsuario(noti.sendBy)
                noti.mensaje = await `El usuario ${usuario} te envio una solicitud.`
            }
            await getRepository(notificacion)
                .save(noti)
                .then(result => {
                    console.log(result);
                })
                .catch(err => console.error(err))
        } catch (error) { console.error(error) }
    }
}