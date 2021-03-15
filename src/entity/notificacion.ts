import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm'
import { user } from './user';

@Entity("notificacion")
export class notificacion {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => user, user_id => user_id.id)
    @JoinColumn({ name: "user_id" })
    user_id: user;

    @Column()
    type: string;

    @Column()
    status: boolean;

    @Column()
    mensaje: string;

    @Column()
    @CreateDateColumn()
    createdAt: Date;

    @Column()
    @UpdateDateColumn()
    updatedAt: Date;
}