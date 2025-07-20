import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert } from "typeorm";
import * as bcrypt from 'bcryptjs';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn() id!: number;
    @Column({ type: 'varchar', length: 255 }) full_name!: string;
    @Column({ type: 'varchar', length: 255, unique: true }) email!: string;
    @Column({ type: 'varchar', length: 255, select: false }) password!: string; // select: false
    @Column({ type: 'varchar', nullable: true }) address_line_1?: string;
    @Column({ type: 'varchar', nullable: true }) address_line_2?: string;
    @Column({ type: 'varchar', nullable: true }) phone_number?: string;
    @Column({ type: 'varchar', nullable: true }) city?: string;
    @Column({ type: 'varchar', nullable: true }) state?: string;
    @Column({ type: 'varchar', nullable: true }) country?: string;
    @Column({ type: 'varchar', nullable: true }) nok_name?: string;
    @Column({ type: 'varchar', nullable: true }) nok_phone_number?: string;

    @BeforeInsert()
    async hashPassword() { this.password = await bcrypt.hash(this.password, 12); }
    async comparePassword(attempt: string): Promise<boolean> { return await bcrypt.compare(attempt, this.password); }
}
