import { Project } from 'src/project/entities/project.entity';
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
    } from 'typeorm';

@Entity()
export class Task {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Project, (project) => project.tasks, { onDelete: 'CASCADE'})
    @JoinColumn({ name: 'projectId'})
    project: Project


    @Column()
    title: string;

    @Column({ type:'varchar', nullable: true })
    description: string | null;

    @Column()
    status: string;

    @Column()
    priority: string;

    @Column({ type: 'timestamp', nullable: true })
    dueDate: Date | null;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

}