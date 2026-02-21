import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
    ManyToOne,
    JoinColumn
    } from 'typeorm';
import { Task } from 'src/task/entities/task.entity';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Project {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ type:'varchar', nullable: true })
    description: string | null;

    @ManyToOne(() => User, (user) => user.projects, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'ownerId' })
    owner: User;

    @OneToMany(() => Task, (task) => task.project)
    tasks: Task[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @Column({ type: 'timestamp', nullable: true })
    deletedAt:Date | null



}