import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export default class AddFieldCarImageToVehicles1610371134833 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('vehicles', new TableColumn({
            name: 'car_image',
            type: 'varchar'
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('vehicles', 'car_image')
    }

}
