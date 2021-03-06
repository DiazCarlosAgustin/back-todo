import { Request, Response } from 'express'
import { user } from '../entity/user'
import { createQueryBuilder, getRepository } from 'typeorm'
import * as bcrypt from 'bcrypt'

/**
 * *Crear usuario
 * @param req 
 * @param res 
 */
export async function crearUsuario(req: Request, res: Response): Promise<any> {

    try {
        let usuario = req.body
        const validEmail = await getRepository(user)
            .find({ where: { email: usuario.email } })
            .catch(err => {
                console.error(err);
            })
        const validUsuario = await getRepository(user)
            .find({ where: { usuario: usuario.usuario } })
            .catch(err => {
                console.error(err);
            })

        if (validEmail === []) {
            res.status(200).json({
                status: "Fail",
                msg: `El email ${usuario.email} ya esta registrado.`
            })
        } else if (validUsuario === []) {
            res.status(200).json({
                status: "Fail",
                msg: `El usuario ${usuario.usuario} ya esta registrado.`
            })
        }
        else {
            const salt = 10
            // ? GenerarContraseña necesita la contraseña y los saltos
            let pass: any = await generarContraseña(usuario.password, salt)

            usuario.password = pass

            // ? Genero el usuario
            await getRepository(user)
                .save(usuario)
                .then((newUser) => {
                    res.json({
                        status: "Ok",
                        msg: "Se registro correctamente.",
                        user: newUser
                    })
                })
                .catch((err) => {
                    res.json({
                        status: "Fail",
                        msg: "No se pudo registrar correctamente, intente nuevamente.",
                        error: err
                    })
                })
        }

    } catch (err) {
        console.error(err);
        res.status(404).json({ error: err })
    }

}

/**
 * *Genera la contraseña con bcrypt
 * @param textPlano contraseña plana
 * @param salt saltos para generar la clave
 */
export default async function generarContraseña(textPlano: any, salt: number): Promise<string> {
    return bcrypt.hashSync(textPlano, salt)
}

/**
 * *Obtiene el usuario logeado
 * @param req 
 * @param res 
 */
export async function getUserLog(req: Request | any, res: Response): Promise<any> {

    if (req?.userId?.id != null) {
        try {
            await getRepository(user)
                .find({ where: { id: req.userId.id } })
                .then((result) => {
                    res.json({ status: "Ok", user: result[0] })
                })
                .catch(err => {
                    console.error(err);
                })
        } catch (error) {
            console.error(error);
            res.status(400).json({
                error: error
            })
        }
    }
    else {
        res.json({
            status: "Ok",
            user: null
        })
    }
}

/**
 * 
 * @param req 
 * @param res 
 */
export async function getUsersToAdd(req: Request, res: Response): Promise<any> {
    try {
        const id = req.params.id
        await createQueryBuilder('user')
            .where('id != :id', { id: id })
            .getMany()
            .then(result => {
                res.json({
                    status: "Ok",
                    users: result
                })
            })
    } catch (error) {
        res.status(400).json({
            status: "Fail",
            error
        })
    }

}

export async function getNombreUsuario(id: number): Promise<any> {
    try {
        const userName = await getRepository(user)
            .createQueryBuilder("user")
            .select("user.usuario")
            .where("user.id = :id", { id })
            .getMany()
        return userName[0].usuario
    }
    catch (err) {
        console.log(err);

    }
}