import { MigrationInterface, QueryRunner, Table } from "typeorm";

export default class CreateVehiclesTable1610360723335
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "vehicles",
        columns: [
          {
            name: "id",
            type: "varchar",
            isPrimary: true,
            generationStrategy: "uuid",
            default: "uuid_generate_v4()",
          },
          {
            name: "name",
            type: "varchar",
          },
          {
            name: "brand",
            type: "varchar",
          },
          {
            name: "daily_value",
            type: "decimal",
            scale: 2,
            precision: 10,
          },
          {
            name: 'transmission_type',
            type: 'varchar'
          },
          {
            name: 'fuel_type',
            type: 'varchar'
          },
          {
            name: 'acceleration',
            type: 'decimal',
            scale: 2,
            precision: 2
          },
          {
            name: 'maximun_speed',
            type: 'integer'
          },
          {
            name: 'seats',
            type: 'integer'
          },
          {
            name: 'potency',
            type: 'integer'
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
    await queryRunner.dropTable("vehicles");
  }
}
