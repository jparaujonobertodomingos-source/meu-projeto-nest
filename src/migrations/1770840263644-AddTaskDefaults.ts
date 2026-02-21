import { MigrationInterface, QueryRunner } from "typeorm";

export class AddTaskDefaults1770840263644 implements MigrationInterface {
    name = 'AddTaskDefaults1770840263644'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" DROP CONSTRAINT "FK_3797a20ef5553ae87af126bc2fe"`);
        await queryRunner.query(`ALTER TABLE "task" ALTER COLUMN "projectId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "task" ALTER COLUMN "status" SET DEFAULT 'pending'`);
        await queryRunner.query(`ALTER TABLE "task" ALTER COLUMN "priority" SET DEFAULT 'medium'`);
        await queryRunner.query(`ALTER TABLE "task" ADD CONSTRAINT "FK_3797a20ef5553ae87af126bc2fe" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" DROP CONSTRAINT "FK_3797a20ef5553ae87af126bc2fe"`);
        await queryRunner.query(`ALTER TABLE "task" ALTER COLUMN "priority" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "task" ALTER COLUMN "status" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "task" ALTER COLUMN "projectId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "task" ADD CONSTRAINT "FK_3797a20ef5553ae87af126bc2fe" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
