import { user } from "../entity/user";

export interface interfaceNotificacion {
    id?: number,
    user_id: user,
    sendBy?: number,
    type: string,
    mensaje: string,
    createdAt?: Date,
    updatedAt?: Date
}