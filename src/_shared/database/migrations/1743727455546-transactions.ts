import { MigrationInterface, QueryRunner } from "typeorm";

export class Transactions1743727455546 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
                CREATE TABLE transactions (
            id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
            sender_wallet_id UUID NOT NULL,
            receiver_wallet_id UUID NOT NULL,
            amount DECIMAL(10, 2) NOT NULL,
            status VARCHAR(20) DEFAULT 'pending',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (sender_wallet_id) REFERENCES wallets(id),
            FOREIGN KEY (receiver_wallet_id) REFERENCES wallets(id)
          );`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE transactions;`);
    }

}
