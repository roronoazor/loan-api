import { MigrationInterface, QueryRunner } from "typeorm";

export class migrations1679838154634 implements MigrationInterface {
    name = 'migrations1679838154634'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "payment" ADD "loanId" uuid`);
        await queryRunner.query(`ALTER TABLE "payment" DROP COLUMN "type"`);
        await queryRunner.query(`CREATE TYPE "public"."payment_type_enum" AS ENUM('credit', 'debit')`);
        await queryRunner.query(`ALTER TABLE "payment" ADD "type" "public"."payment_type_enum" NOT NULL DEFAULT 'debit'`);
        await queryRunner.query(`ALTER TABLE "payment" ADD CONSTRAINT "FK_47d8439ec0f7527bf93454c1194" FOREIGN KEY ("loanId") REFERENCES "loan"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "payment" DROP CONSTRAINT "FK_47d8439ec0f7527bf93454c1194"`);
        await queryRunner.query(`ALTER TABLE "payment" DROP COLUMN "type"`);
        await queryRunner.query(`DROP TYPE "public"."payment_type_enum"`);
        await queryRunner.query(`ALTER TABLE "payment" ADD "type" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "payment" DROP COLUMN "loanId"`);
    }

}
