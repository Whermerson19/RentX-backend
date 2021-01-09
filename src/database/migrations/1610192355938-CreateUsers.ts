import { MigrationInterface, QueryRunner, Table } from "typeorm";

export default class CreateUsers1610192355938 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);
    await queryRunner.createTable(
      new Table({
        name: "users",
        columns: [
          {
            name: "id",
            type: "varchar",
            isPrimary: true,
            generationStrategy: "uuid",
            default: "uuid_generate_v4()",
          },
          {
            name: "username",
            type: "varchar",
          },
          {
            name: "image",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "email",
            type: " varchar",
          },
          {
            name: "password",
            type: "varchar",
          },
          {
            name: "admin",
            type: "boolean",
          },
          {
            name: "created_at",
            type: "timestamp with time zone",
            default: "now()",
          },
          {
            name: "updated_at",
            type: "timestamp with time zone",
            default: "now()",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("users");
  }
}
