import { Request, Response, NextFunction } from 'express'
import { user } from '../entity/user'
import * as jwt from 'jsonwebtoken'
import { getRepository } from 'typeorm'
import jwtConfig from '../config/jwtConfig'

/**
 * 
 * @param req 
 * @param res 
 * @param next 
 */
export async function isLog(req: Request | any, res: Response, next: NextFunction): Promise<any> {
    if (!req.headers['usertoken']) {
        res.json({ error: "Token no valido" })
    }
    else {
        const token: any = req.headers["usertoken"]
        let payload: any = null
        try {
            payload = jwt.decode(token)
        } catch (error) {
            res.json({ error })
        }
        req.userId = payload
    }
    next()
}

/**
 * 
 * @param req 
 * @param res 
 */
export async function login(req: Request, res: Response): Promise<any> {
    let { usuario, password } = await req.body

    if (!(usuario && password)) {
        res.status(400).json({ status: "Fail", msg: "El Usuario y la Contraseña no son validos." })
    }

    let userToLog: any = await getRepository(user)
        .findOneOrFail({
            where: {
                usuario
            }
        })

    if (!userToLog) {
        res.status(400).json({ error: "El usuario ingresado no es correcto." })
    }
    else if (!userToLog.compararContraseña(password)) {
        res.json({ error: "La contraseña ingresada no es correcta." })
    }
    else {
        try {
            const token: any = await jwt.sign({
                id: userToLog.id,
                nombre: userToLog.nombre,
                email: userToLog.email,
                usuario: userToLog.usuario
            }, jwtConfig.Secret)

            res.json({
                token,
                status: "Ok",
                msg: "Se ingreso correctamente",
                user: userToLog
            })
        } catch (err) {
            console.error(err)
            res.status(404).json({ error: err })
        }
    }
}