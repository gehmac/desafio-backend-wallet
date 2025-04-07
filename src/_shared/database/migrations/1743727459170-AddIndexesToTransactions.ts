// import { MigrationInterface, QueryRunner } from "typeorm";

// export class AddIndexesToTransactions1743727459170 implements MigrationInterface {

//     public async up(queryRunner: QueryRunner): Promise<void> {
//         await queryRunner.query(`
//           CREATE INDEX idx_transactions_sender ON transactions(sender_wallet_id);
//           CREATE INDEX idx_transactions_receiver ON transactions(receiver_wallet_id);
//           CREATE INDEX idx_transactions_created_at ON transactions(created_at);
//         `);
//     }

//     public async down(queryRunner: QueryRunner): Promise<void> {
//         await queryRunner.query(`
//           DROP INDEX idx_transactions_sender;
//           DROP INDEX idx_transactions_receiver;
//           DROP INDEX idx_transactions_created_at;
//         `);
//     }

// }
