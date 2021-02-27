import { Column, Entity, JoinColumn, UpdateDateColumn, CreateDateColumn, ManyToOne, PrimaryGeneratedColumn, ManyToMany, OneToOne } from 'typeorm'
import { user } from './user'
@Entity("todo")

export class todo {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => user)
    @JoinColumn({ name: "userId" })
    user: user

    @ManyToOne(() => user, fromUser => fromUser.id)
    fromUser: number

    @Column()
    descripcion: string;

    @Column()
    titulo: string;

    @Column()
    progreso: number;

    @Column()
    @CreateDateColumn()
    createdAt: Date;

    @Column()
    @UpdateDateColumn()
    updatedAt: Date;

}
