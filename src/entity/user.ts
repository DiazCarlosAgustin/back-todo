import { Entity, Column, PrimaryGeneratedColumn, Unique, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm'
import * as bcrypt from 'bcrypt'
import { todo } from './todo'
import { friend } from './friend'
import { notificacion } from './notificacion';
// *Tabla/entidad de usuario

@Entity("user")
@Unique(["usuario", "email"])

export class user {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;

    @Column()
    apellido: string;

    @Column()
    usuario: string;

    @Column()
    email: string;

    @Column()
    private password: string;

    @Column()
    @CreateDateColumn()
    createdAt: Date;

    @Column()
    @UpdateDateColumn()
    updatedAt: Date;

    @OneToMany(() => todo, todo => todo.user)
    todo: todo

    @OneToMany(() => friend, friend => friend.user_id)
    friend: friend

    @OneToMany(() => friend, myFriend => myFriend.friend_id)
    myFriend: friend

    @OneToMany(() => notificacion, notificacion_id => notificacion_id.user_id)
    notificacion: notificacion

    // Funciones
    /**
     * 
     * @param textPlano contraseña
     */
    compararContraseña(textPlano: string): any {
        return bcrypt.compareSync(textPlano, this.password)
    }

}