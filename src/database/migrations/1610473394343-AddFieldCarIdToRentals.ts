import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from "typeorm";

export default class AddFieldCarIdToRentals1610473394343
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "rentals",
      new TableColumn({
        name: "car_id",
        type: "varchar",
      })
    );

    await queryRunner.createForeignKey(
      "rentals",
      new TableForeignKey({
        name: "CarId-Rentals",
        referencedTableName: "vehicles",
        referencedColumnNames: ["id"],
        columnNames: ["car_id"],
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey("rentals", "CarId-Rentals");
    await queryRunner.dropColumn("rentals", "car_id");
  }
}
