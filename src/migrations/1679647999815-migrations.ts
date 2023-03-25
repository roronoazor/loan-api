import { MigrationInterface, QueryRunner } from "typeorm";

export class migrations1679647999815 implements MigrationInterface {
    name = 'migrations1679647999815'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_profile" ADD CONSTRAINT "UQ_bdadf5bdbc7955e20c2431a9758" UNIQUE ("phoneNumber")`);
        await queryRunner.query(`ALTER TABLE "user_profile" ADD CONSTRAINT "UQ_2e4690b7e83c2701fa56e765f23" UNIQUE ("identificationNumber")`);
        await queryRunner.query(`ALTER TABLE "user_profile" ADD CONSTRAINT "UQ_67a8c2294d209ad9492f4656d18" UNIQUE ("bvn")`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email")`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "isActive" SET DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "isAdmin" SET DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "isAdmin" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "isActive" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22"`);
        await queryRunner.query(`ALTER TABLE "user_profile" DROP CONSTRAINT "UQ_67a8c2294d209ad9492f4656d18"`);
        await queryRunner.query(`ALTER TABLE "user_profile" DROP CONSTRAINT "UQ_2e4690b7e83c2701fa56e765f23"`);
        await queryRunner.query(`ALTER TABLE "user_profile" DROP CONSTRAINT "UQ_bdadf5bdbc7955e20c2431a9758"`);
    }

}
