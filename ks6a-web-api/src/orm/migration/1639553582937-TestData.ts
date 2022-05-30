/* eslint-disable @typescript-eslint/no-unused-vars */
import { MigrationInterface, QueryRunner } from 'typeorm';

export class TestData1639553582937 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    // Первичная миграция
    await queryRunner.query(`
      -- Установка раширения генерации uuid (если нет в БД)
      CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

      -- Проекты
      INSERT INTO req.project ("guid", "name", "name_eng", "code", "sorting") VALUES
        (uuid_generate_v4(), 'Блок №1', 'Block #1', 'bloсk1', 1),
        (uuid_generate_v4(), 'Блок №2', 'Block #2', 'bloсk2', 2),
        (uuid_generate_v4(), 'Блок №3', 'Block #3', 'bloсk3', 3),
        (uuid_generate_v4(), 'Блок №4', 'Block #4', 'bloсk4', 4);

      -- Объекты смет
      INSERT INTO req.object_estimate ("guid", "name", "name_eng", "code", "sorting", "project_id") VALUES
        (uuid_generate_v4(), 'Работа №1', 'Work #1', '01-01', 1,
          (
            SELECT id FROM req.project
            WHERE id = 1
          )
        ),
        (uuid_generate_v4(), 'Работа №2', 'Work #2', '01-02', 2,
          (
            SELECT id FROM req.project
            WHERE id = 1
          )
        ),
        (uuid_generate_v4(), 'Работа №3', 'Work #3', '01-03', 3,
          (
            SELECT id FROM req.project
            WHERE id = 1
          )
        ),
        (uuid_generate_v4(), 'Работа №4', 'Work #4', '01-04', 1,
          (
            SELECT id FROM req.project
            WHERE id = 2
          )
        );

        -- Сметы
        INSERT INTO req.estimate ("guid", "name", "name_eng", "code", "sorting", "local_estimate_number", "object_estimate_id") VALUES
          (uuid_generate_v4(), 'Устройство работы', 'Work', '10Q.RET(C01)', 1, '54-аа-33',
            (
              SELECT id FROM req.object_estimate
              WHERE id = 1
            )
          ),
          (uuid_generate_v4(), 'Устройство работы 1', 'Work 1', '20E.RET(C01)', 2, '5-а-33',
            (
              SELECT id FROM req.object_estimate
              WHERE id = 2
            )
          ),
          (uuid_generate_v4(), 'Устройство работы 2', 'Work 2', '30D.RET(C01)', 3, '5g-y-133',
            (
              SELECT id FROM req.object_estimate
              WHERE id = 3
            )
          );

          -- КС-6а (Журнал)
          INSERT INTO req.ks6a ("guid", "customer_name", "contractor_name", "estimate_id") VALUES
            (uuid_generate_v4(), 'Customer name test', 'Contractor name test',
              (
                SELECT id FROM req.estimate WHERE id = 1
              )
            );

          -- Итоги (для КС-6а)
          INSERT INTO req.total ("guid", "quantity_volume", "quantity_sum", "customer_volume", "customer_sum", "subcontractor_volume", "subcontractor_sum", "remainder_volume", "remainder_sum") VALUES
            -- Итоги строки КС-6а
            (uuid_generate_v4(), 50.0227, 53565.70700874, 13.3567, 14302.7281375, 13.3567, 14302.72813, 8.7103, 9327.232991286982),
            -- Итоги исполнителя
            (uuid_generate_v4(), 0, 0, 13.3567, 0, 0, 0, 0, 0),
            (uuid_generate_v4(), 50.0227, 0, 0, 0, 0, 0, 0, 0);

          -- Строка КС-6а
          INSERT INTO req.ks6a_item ("guid", "number", "code", "unit_measure", "volume", "price", "cost", "section", "name", "kks", "wbs_code", "cbs_code_i", "cbs_code_ii", "estimate_id", "ks6a_id", "total_id") VALUES
            (uuid_generate_v4(), 1, 'ФЕР-13-00-000-01', '100 м2', 58.733, 1070.83847562, 62892.94, '2 Без названия', 'Шлифовка бетонных поверхностей', '18-00043', 'AKU.E43', '1.2.5', '1.1.2.3',
              (
                SELECT id FROM req.estimate WHERE id = 1
              ),
              (
                SELECT id FROM req.ks6a WHERE id = 1
              ),
              (
                SELECT id FROM req.total WHERE id = 1
              )
            );

          -- Исполнители работ по строкам КС-6а
          INSERT INTO req.contractor ("guid", "name") VALUES
            (uuid_generate_v4(), 'Деталь Проект ООО'),
            (uuid_generate_v4(), 'КОНЦЕРН ТИТАН-2 АО'),
            (uuid_generate_v4(), 'УС БАЭС ООО');

          -- Промежуточная таблица (ks6a_item-(MTM)-contractor)
          INSERT INTO req.ks6a_item_contractor ("guid", "ks6a_item_id", "contractor_guid", "total_id") VALUES
            (uuid_generate_v4(),
              (
                SELECT id FROM req.ks6a_item WHERE id = 1
              ),
              (
                SELECT guid FROM req.contractor WHERE id = 1
              ),
              (
                SELECT id FROM req.total WHERE id = 2
              )
            ),
            (uuid_generate_v4(),
              (
                SELECT id FROM req.ks6a_item WHERE id = 1
              ),
              (
                SELECT guid FROM req.contractor WHERE id = 2
              ),
              (
                SELECT id FROM req.total WHERE id = 3
              )
            );

          -- Выполненно работ по КС-6а
          INSERT INTO req.execution ("guid", "period_timestamp", "volume", "ks6a_item_id", "ks6a_item_contractor_id") VALUES
            -- Для вида работы
            (uuid_generate_v4(), '2020-10-31T21:00:00Z', 45.0227,
              (
                SELECT id FROM req.ks6a_item WHERE id = 1
              ),
              NULL
            ),
            (uuid_generate_v4(), '2020-04-10T21:00:00Z', 1.9167,
              (
                SELECT id FROM req.ks6a_item WHERE id = 1
              ),
              NULL
            ),
            (uuid_generate_v4(), '2020-12-10T21:00:00Z', 8.44,
              (
                SELECT id FROM req.ks6a_item WHERE id = 1
              ),
              NULL
            ),
            (uuid_generate_v4(), '2021-12-30T21:00:00Z', 1.24,
              (
                SELECT id FROM req.ks6a_item WHERE id = 1
              ),
              NULL
            ),
            -- Для исполнителя
            (uuid_generate_v4(), '2020-10-31T21:00:00Z', 45.0227,
              (
                SELECT id FROM req.ks6a_item WHERE id = 1
              ),
              (
                SELECT id FROM req.ks6a_item_contractor WHERE id = 2
              )
            );

            -- Остаток работ по КС-6а (Итоги, только для вида работ, не для исполнителей)
            INSERT INTO req.remainder ("guid", "year", "volume", "ks6a_item_id") VALUES
            (uuid_generate_v4(), '2020', 13.7103,
              (
                SELECT id FROM req.ks6a_item WHERE id = 1
              )
            ),
            (uuid_generate_v4(), '2021', 0.24,
              (
                SELECT id FROM req.ks6a_item WHERE id = 1
              )
            ),
            (uuid_generate_v4(), '2022', 0.24,
              (
                SELECT id FROM req.ks6a_item WHERE id = 1
              )
            );
    `);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public async down (queryRunner: QueryRunner): Promise<void> {}
}
