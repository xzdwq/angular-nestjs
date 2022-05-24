/* eslint-disable @typescript-eslint/no-unused-vars */
import { MigrationInterface, QueryRunner } from 'typeorm';

export class Ks6aTestData1639553582937 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    // Первичная миграция
    await queryRunner.query(`
      -- Установка раширения генерации uuid (если нет в БД)
      CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

      -- Проекты
      INSERT INTO ks6a.project ("guid", "name", "name_eng", "code", "sorting") VALUES
        (uuid_generate_v4(), 'Блок №1', 'Block #1', 'bloсk1', 1),
        (uuid_generate_v4(), 'Блок №2', 'Block #2', 'bloсk2', 2),
        (uuid_generate_v4(), 'Блок №3', 'Block #3', 'bloсk3', 3),
        (uuid_generate_v4(), 'Блок №4', 'Block #4', 'bloсk4', 4);

      -- Объекты смет
      INSERT INTO ks6a.object_estimate ("guid", "name", "name_eng", "code", "sorting", "project_id") VALUES
        (uuid_generate_v4(), 'Работа №1', 'Work #1', '01-01', 1,
          (
            SELECT id FROM ks6a.project
            WHERE id = 1
          )
        ),
        (uuid_generate_v4(), 'Работа №2', 'Work #2', '01-02', 2,
          (
            SELECT id FROM ks6a.project
            WHERE id = 1
          )
        ),
        (uuid_generate_v4(), 'Работа №3', 'Work #3', '01-03', 3,
          (
            SELECT id FROM ks6a.project
            WHERE id = 1
          )
        ),
        (uuid_generate_v4(), 'Работа №4', 'Work #4', '01-04', 1,
          (
            SELECT id FROM ks6a.project
            WHERE id = 2
          )
        );

        -- Сметы
        INSERT INTO ks6a.estimate ("guid", "name", "name_eng", "code", "sorting", "local_estimate_number", "object_estimate_id") VALUES
          (uuid_generate_v4(), 'Устройство работы', 'Work', '10Q.RET(C01)', 1, '54-аа-33',
            (
              SELECT id FROM ks6a.object_estimate
              WHERE id = 1
            )
          ),
          (uuid_generate_v4(), 'Устройство работы 1', 'Work 1', '20E.RET(C01)', 2, '5-а-33',
            (
              SELECT id FROM ks6a.object_estimate
              WHERE id = 2
            )
          ),
          (uuid_generate_v4(), 'Устройство работы 2', 'Work 2', '30D.RET(C01)', 3, '5g-y-133',
            (
              SELECT id FROM ks6a.object_estimate
              WHERE id = 3
            )
          );

          -- Журнал
          INSERT INTO ks6a.journal ("guid", "customer_name", "contractor_name", "estimate_id") VALUES
            (uuid_generate_v4(), 'Customer name test', 'Contractor name test',
              (
                SELECT id FROM ks6a.estimate WHERE id = 1
              )
            );

          -- Строка КС-6а
          INSERT INTO ks6a.ks6a_item ("guid", "number", "code", "unit_measure", "volume", "price", "cost", "section", "name", "kks", "wbs_code", "cbs_code_i", "cbs_code_ii", "estimate_id", "journal_id") VALUES
            (uuid_generate_v4(), 1, 'ФЕР-13-00-000-01', '100 м2', 58.733, 1070.83847562, 62892.94, '2 Без названия', 'Шлифовка бетонных поверхностей', '18-00043', 'AKU.E43', '1.2.5', '1.1.2.3',
              (
                SELECT id FROM ks6a.estimate WHERE id = 1
              ),
              (
                SELECT id FROM ks6a.journal WHERE id = 1
              )
            ),
            (uuid_generate_v4(), 2, '', 'м2', 4028.5, 55.35000124, 222977.48, '6 Объем: 0,406*9,6', 'Покрытие', '18-00032', 'AKU.F11', '1.3.4', '1.1.4.5',
              (
                SELECT id FROM ks6a.estimate WHERE id = 1
              ),
              (
                SELECT id FROM ks6a.journal WHERE id = 1
              )
            );

          -- Выполненно работ по КС-6а
          INSERT INTO ks6a.execution ("guid", "period_timestamp", "volume", "ks6a_item_id") VALUES
            (uuid_generate_v4(), '2020-10-31T21:00:00Z', 45.0227,
              (
                SELECT id FROM ks6a.ks6a_item WHERE id = 1
              )
            ),
            (uuid_generate_v4(), '2020-04-10T21:00:00Z', 1.9167,
              (
                SELECT id FROM ks6a.ks6a_item WHERE id = 1
              )
            ),
            (uuid_generate_v4(), '2020-12-10T21:00:00Z', 8.44,
              (
                SELECT id FROM ks6a.ks6a_item WHERE id = 1
              )
            ),
            (uuid_generate_v4(), '2021-12-30T21:00:00Z', 1.24,
              (
                SELECT id FROM ks6a.ks6a_item WHERE id = 1
              )
            );

            -- Остаток работ по КС-6а (Итоги)
            INSERT INTO ks6a.remainder ("guid", "type", "year", "volume", "ks6a_item_id") VALUES
            (uuid_generate_v4(), 'period', '2020', 13.7103,
              (
                SELECT id FROM ks6a.ks6a_item WHERE id = 1
              )
            ),
            (uuid_generate_v4(), 'period', '2021', 0.24,
              (
                SELECT id FROM ks6a.ks6a_item WHERE id = 1
              )
            ),
            (uuid_generate_v4(), 'total', '2022', 0.24,
              (
                SELECT id FROM ks6a.ks6a_item WHERE id = 1
              )
            ),;
    `);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public async down (queryRunner: QueryRunner): Promise<void> {}
}
