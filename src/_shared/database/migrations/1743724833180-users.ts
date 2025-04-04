import { MigrationInterface, QueryRunner } from "typeorm";

export class Users1743724833180 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`);
    await queryRunner.query(`
			CREATE TABLE users (
					id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
					email VARCHAR(255) UNIQUE NOT NULL,
					password VARCHAR(255) NOT NULL,
					created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
			);`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE users;`);
  }

} 
