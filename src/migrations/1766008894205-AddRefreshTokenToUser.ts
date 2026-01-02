import { MigrationInterface, QueryRunner } from "typeorm";

export class AddRefreshTokenToUser1766008894205 implements MigrationInterface {
    name = 'AddRefreshTokenToUser1766008894205'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "refreshToken" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "refreshToken"`);
    }

}
