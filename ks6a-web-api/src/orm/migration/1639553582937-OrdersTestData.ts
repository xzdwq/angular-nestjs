/* eslint-disable @typescript-eslint/no-unused-vars */
import { MigrationInterface, QueryRunner } from 'typeorm';

export class OrdersTestData1639553582937 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Первичная миграция
    await queryRunner.query(``);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public async down(queryRunner: QueryRunner): Promise<void> {}
}
