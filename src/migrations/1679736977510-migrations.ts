import { MigrationInterface, QueryRunner } from "typeorm";

export class migrations1679736977510 implements MigrationInterface {
    name = 'migrations1679736977510'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "loan" ADD "repaymentDate" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "loan" ADD "amountPaid" integer`);
        await queryRunner.query(`ALTER TABLE "user_profile" ALTER COLUMN "address" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user_profile" ALTER COLUMN "phoneNumber" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user_profile" ALTER COLUMN "identificationNumber" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user_profile" DROP COLUMN "identificationType"`);
        await queryRunner.query(`CREATE TYPE "public"."user_profile_identificationtype_enum" AS ENUM('driver license', 'international passport', 'voters card')`);
        await queryRunner.query(`ALTER TABLE "user_profile" ADD "identificationType" "public"."user_profile_identificationtype_enum" NOT NULL`);
        await queryRunner.query(`ALTER TABLE "loan" DROP COLUMN "status"`);
        await queryRunner.query(`CREATE TYPE "public"."loan_status_enum" AS ENUM('opened', 'settled', 'rejected', 'disbursed')`);
        await queryRunner.query(`ALTER TABLE "loan" ADD "status" "public"."loan_status_enum" NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "loan" DROP COLUMN "status"`);
        await queryRunner.query(`DROP TYPE "public"."loan_status_enum"`);
        await queryRunner.query(`ALTER TABLE "loan" ADD "status" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user_profile" DROP COLUMN "identificationType"`);
        await queryRunner.query(`DROP TYPE "public"."user_profile_identificationtype_enum"`);
        await queryRunner.query(`ALTER TABLE "user_profile" ADD "identificationType" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user_profile" ALTER COLUMN "identificationNumber" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user_profile" ALTER COLUMN "phoneNumber" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user_profile" ALTER COLUMN "address" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "loan" DROP COLUMN "amountPaid"`);
        await queryRunner.query(`ALTER TABLE "loan" DROP COLUMN "repaymentDate"`);
    }

}
