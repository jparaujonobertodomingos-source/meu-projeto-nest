import { MigrationInterface, QueryRunner } from "typeorm";

export class CriaColunaDeletedAt1769890096013 implements MigrationInterface {
    name = 'CriaColunaDeletedAt1769890096013'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "project" ADD "deletedAt" TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "project" DROP COLUMN "deletedAt"`);
    }

}
