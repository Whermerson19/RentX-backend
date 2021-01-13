import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from "typeorm";

export default class AddFieldClientIdToRentals1610473113863
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "rentals",
      new TableColumn({
        name: "client_id",
        type: "varchar",
      })
    );

    await queryRunner.createForeignKey(
      "rentals",
      new TableForeignKey({
        name: "ClientId-Rentals",
        referencedTableName: "users",
        referencedColumnNames: ["id"],
        columnNames: ["client_id"],
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey("rentals", "ClientId-Rentals");
    await queryRunner.dropColumn('rentals', 'client_id')
  }
}
