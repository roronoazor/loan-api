import { MigrationInterface, QueryRunner } from "typeorm";

export class initializeDb1679646707585 implements MigrationInterface {
    name = 'initializeDb1679646707585'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "loan" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "amount" integer NOT NULL, "interestRate" integer NOT NULL, "duration" integer NOT NULL, "status" character varying NOT NULL, "createdBy" character varying NOT NULL, "createdOn" TIMESTAMP NOT NULL DEFAULT now(), "lastUpdatedBy" character varying NOT NULL, "lastUpdatedOn" TIMESTAMP NOT NULL DEFAULT now(), "userId" uuid, CONSTRAINT "PK_4ceda725a323d254a5fd48bf95f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_profile" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "address" character varying NOT NULL, "phoneNumber" character varying NOT NULL, "identificationNumber" character varying NOT NULL, "bvn" character varying NOT NULL, "identificationType" character varying NOT NULL, "createdBy" character varying NOT NULL, "createdOn" TIMESTAMP NOT NULL DEFAULT now(), "lastUpdatedBy" character varying NOT NULL, "lastUpdatedOn" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_f44d0cd18cfd80b0fed7806c3b7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "bank_card" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "cardNumber" character varying NOT NULL, "cardHolderName" character varying NOT NULL, "cvv" character varying NOT NULL, "expiryDate" character varying NOT NULL, "createdBy" character varying NOT NULL, "createdOn" TIMESTAMP NOT NULL DEFAULT now(), "lastUpdatedBy" character varying NOT NULL, "lastUpdatedOn" TIMESTAMP NOT NULL DEFAULT now(), "userId" uuid, CONSTRAINT "PK_309e54c6f6af3ee8ed268a8be9e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "payment" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "amount" integer NOT NULL, "paymentDate" TIMESTAMP NOT NULL, "type" character varying NOT NULL, "createdBy" character varying NOT NULL, "createdOn" TIMESTAMP NOT NULL DEFAULT now(), "lastUpdatedBy" character varying NOT NULL, "lastUpdatedOn" TIMESTAMP NOT NULL DEFAULT now(), "userId" uuid, CONSTRAINT "PK_fcaec7df5adf9cac408c686b2ab" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "isActive" boolean NOT NULL, "isAdmin" boolean NOT NULL, "createdBy" character varying NOT NULL, "createdOn" TIMESTAMP NOT NULL DEFAULT now(), "lastUpdatedBy" character varying NOT NULL, "lastUpdatedOn" TIMESTAMP NOT NULL DEFAULT now(), "profileId" uuid, CONSTRAINT "REL_9466682df91534dd95e4dbaa61" UNIQUE ("profileId"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "bank_account" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "accountNumber" character varying NOT NULL, "bankName" character varying NOT NULL, "createdBy" character varying NOT NULL, "createdOn" TIMESTAMP NOT NULL DEFAULT now(), "lastUpdatedBy" character varying NOT NULL, "lastUpdatedOn" TIMESTAMP NOT NULL DEFAULT now(), "userId" uuid, CONSTRAINT "PK_f3246deb6b79123482c6adb9745" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "loan" ADD CONSTRAINT "FK_ef7a63b4c4f0edd90e389edb103" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "bank_card" ADD CONSTRAINT "FK_7a4aba1b502157cc85f8f767818" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "payment" ADD CONSTRAINT "FK_b046318e0b341a7f72110b75857" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_9466682df91534dd95e4dbaa616" FOREIGN KEY ("profileId") REFERENCES "user_profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "bank_account" ADD CONSTRAINT "FK_c2ba1381682b0291238cbc7a65d" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "bank_account" DROP CONSTRAINT "FK_c2ba1381682b0291238cbc7a65d"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_9466682df91534dd95e4dbaa616"`);
        await queryRunner.query(`ALTER TABLE "payment" DROP CONSTRAINT "FK_b046318e0b341a7f72110b75857"`);
        await queryRunner.query(`ALTER TABLE "bank_card" DROP CONSTRAINT "FK_7a4aba1b502157cc85f8f767818"`);
        await queryRunner.query(`ALTER TABLE "loan" DROP CONSTRAINT "FK_ef7a63b4c4f0edd90e389edb103"`);
        await queryRunner.query(`DROP TABLE "bank_account"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "payment"`);
        await queryRunner.query(`DROP TABLE "bank_card"`);
        await queryRunner.query(`DROP TABLE "user_profile"`);
        await queryRunner.query(`DROP TABLE "loan"`);
    }

}
