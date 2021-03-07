import { Column, Entity, JoinColumn, CreateDateColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn, ManyToMany, OneToMany } from "typeorm";
import { user } from './user'
@Entity("friend")

export class friend {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => user, user_id => user_id.id)
    @JoinColumn({ name: "user_id" })
    user_id: user;

    @ManyToOne(() => user, friend_id => friend_id.id)
    @JoinColumn({ name: "friend_id" })
    friend_id: user;

    @Column()
    aceptado: boolean;

    @Column()
    @CreateDateColumn()
    createdAt: Date;

    @Column()
    @UpdateDateColumn()
    updatedAt: Date;
}