import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateColumnDeletedAt1771636499110 implements MigrationInterface {
    name = 'CreateColumnDeletedAt1771636499110'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" ADD "deletedAt" TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "deletedAt"`);
    }

}
