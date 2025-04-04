import { MigrationInterface, QueryRunner } from "typeorm";

export class Wallets1743727444478 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.query(`
                CREATE TABLE wallets (
            id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
            user_id UUID UNIQUE NOT NULL,
            balance DECIMAL(10, 2) DEFAULT 0.00,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
          );`);

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE wallets;`);
    }

}
