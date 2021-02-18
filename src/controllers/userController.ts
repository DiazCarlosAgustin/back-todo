import { Request, Response } from 'express'
import { user } from '../entity/user'
import { Any, getRepository } from 'typeorm'
import * as bcrypt from 'bcrypt'

/**
 * *Crear usuario
 * @param req 
 * @param res 
 */
export async function crearUsuario(req: Request, res: Response): Promise<any> {

    try {
        let usuario = req.query
        console.log(usuario)
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
                        status: "OK",
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

export default async function generarContraseña(textPlano: any, salt: number): Promise<string> {
    return bcrypt.hashSync(textPlano, salt)
}