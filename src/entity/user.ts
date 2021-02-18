import { Entity, Column, PrimaryGeneratedColumn, Unique, CreateDateColumn, UpdateDateColumn } from 'typeorm'
import * as bcrypt from 'bcrypt'
// *Tabla/entidad de usuario

@Entity("user")
@Unique(["usuario", "email"])

export class user {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;

    @Column()
    apelido: string;

    @Column()
    usuario: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    @CreateDateColumn()
    createdAt: Date;

    @Column()
    @UpdateDateColumn()
    updatedAt: Date;


    // Funciones
    /**
     * 
     * @param textPlano contraseña
     */
    compararContraseña(textPlano: string): any {
        return bcrypt.compareSync(textPlano, this.password)
    }

}