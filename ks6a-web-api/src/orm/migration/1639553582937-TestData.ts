/* eslint-disable @typescript-eslint/no-unused-vars */
import { MigrationInterface, QueryRunner } from 'typeorm';

export class TestData1639553582937 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    // Первичная миграция тестовых данных
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

          -- Тип периода
          INSERT INTO req.period_type ("guid", "name", "code") VALUES
            (uuid_generate_v4(), 'Выполнение', 'execution'),
            (uuid_generate_v4(), 'Остаток', 'remainder');

          -- Все уникальные периоды для конктретной КС-6а
          INSERT INTO req.ks6a_period ("guid", "period_timestamp", "is_fixed", "ks6a_id", "period_type_id") VALUES
            -- Периоды выполнения (собираются уникальные периоды со всех строк КС-6а при перекачке)
            (uuid_generate_v4(), '2020-11-30T00:00:00Z', true,
              (
                SELECT id FROM req.ks6a WHERE id = 1
              ),
              (
                SELECT id FROM req.period_type WHERE id = 1
              )
            ),
            (uuid_generate_v4(), '2021-04-30T00:00:00Z', true,
              (
                SELECT id FROM req.ks6a WHERE id = 1
              ),
              (
                SELECT id FROM req.period_type WHERE id = 1
              )
            ),
            (uuid_generate_v4(), '2021-10-30T00:00:00Z', true,
              (
                SELECT id FROM req.ks6a WHERE id = 1
              ),
              (
                SELECT id FROM req.period_type WHERE id = 1
              )
            ),
            (uuid_generate_v4(), '2021-11-30T00:00:00Z', true,
              (
                SELECT id FROM req.ks6a WHERE id = 1
              ),
              (
                SELECT id FROM req.period_type WHERE id = 1
              )
            ),
            (uuid_generate_v4(), '2021-12-30T00:00:00Z', false,
              (
                SELECT id FROM req.ks6a WHERE id = 1
              ),
              (
                SELECT id FROM req.period_type WHERE id = 1
              )
            ),
            (uuid_generate_v4(), '2022-02-27T00:00:00Z', false,
              (
                SELECT id FROM req.ks6a WHERE id = 1
              ),
              (
                SELECT id FROM req.period_type WHERE id = 1
              )
            ),
            -- Годовые остатки (собираются уникальные периоды со всех строк КС-6а при перекачке)
            (uuid_generate_v4(),
              (date_trunc('month', TO_TIMESTAMP('2020','YYYY-MM-DD HH24:MI:SS')) + interval '12 month' - interval '1 day'),
              true,
              (
                SELECT id FROM req.ks6a WHERE id = 1
              ),
              (
                SELECT id FROM req.period_type WHERE id = 2
              )
            ),
            (uuid_generate_v4(),
              (date_trunc('month', TO_TIMESTAMP('2021','YYYY-MM-DD HH24:MI:SS')) + interval '12 month' - interval '1 day'),
              true,
              (
                SELECT id FROM req.ks6a WHERE id = 1
              ),
              (
                SELECT id FROM req.period_type WHERE id = 2
              )
            );

          -- Итоги (для КС-6а)
          INSERT INTO req.total ("guid", "quantity_volume", "quantity_sum", "customer_volume", "customer_sum", "subcontractor_volume", "subcontractor_sum", "remainder_volume", "remainder_sum") VALUES
            -- Итоги строки КС-6а
            (uuid_generate_v4(), 50.0227, 53565.70700874, 13.3567, 14302.7281375, 13.3567, 14302.72813, 8.7103, 9327.232991286982),
            (uuid_generate_v4(), 25.027, 1565.7, 133.567, 12.75, 123.7, 130.7213, 28.703, 33.23286982),
            (uuid_generate_v4(), 2.4027, 32365.707, 123.3567, 302.7281375, 13.3567, 14302.72813, 8.7103, 9327.232991286982),
            (uuid_generate_v4(), 4.527, 135.7, 1333.567, 122.75, 99.7, 130.7213, 28.703, 33.23286982),
            -- Итоги исполнителя
            (uuid_generate_v4(), 0, 0, 13.3567, 0, 0, 0, 0, 0),
            (uuid_generate_v4(), 50.0227, 0, 0, 0, 0, 0, 0, 0),
            (uuid_generate_v4(), 150.23, 0, 32.3332, 0, 0, 0, 0, 0);

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
            ),
            (uuid_generate_v4(), 2, 'ВАК-12-10-000-02', '10 м2', 15.73, 17.8362, 82.9, '3 Без названия', 'Обеспыливание поверхности', '34-02042', 'AKU.D11', '1.2.3', '2.1.1.3',
              (
                SELECT id FROM req.estimate WHERE id = 1
              ),
              (
                SELECT id FROM req.ks6a WHERE id = 1
              ),
              (
                SELECT id FROM req.total WHERE id = 2
              )
            ),
            (uuid_generate_v4(), 3, 'НГ-32-10-000-02', '20 м2', 156.73, 217.8362, 812.9, '4 Без названия', 'Огрунтовка бетонных и оштукатуренных поверхностей: составом "Бирсс Грунт-Универсал"', '22-01042', 'AKU.Q71', '1.2.3', '2.1.1.3',
              (
                SELECT id FROM req.estimate WHERE id = 1
              ),
              (
                SELECT id FROM req.ks6a WHERE id = 1
              ),
              (
                SELECT id FROM req.total WHERE id = 3
              )
            ),
            (uuid_generate_v4(), 4, 'ОТ-99-10-000-02', '320 м2', 25.73, 137.8362, 822.9, '5 Без названия', 'Грунтовка сильнопоглощающих поверхностей "БИРСС Грунт Универсал" (расход 0,25 кг/м2)', '99-02042', 'AKU.C21', '1.2.3', '2.1.1.3',
              (
                SELECT id FROM req.estimate WHERE id = 1
              ),
              (
                SELECT id FROM req.ks6a WHERE id = 1
              ),
              (
                SELECT id FROM req.total WHERE id = 4
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
                SELECT id FROM req.total WHERE id = 5
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
                SELECT id FROM req.total WHERE id = 6
              )
            ),
            (uuid_generate_v4(),
              (
                SELECT id FROM req.ks6a_item WHERE id = 2
              ),
              (
                SELECT guid FROM req.contractor WHERE id = 3
              ),
              SELECT id FROM req.total WHERE id = 7
            );

          -- Выполненно работ по КС-6а (Периоды в "period_timestamp" такие же как и в ks6a_period для конкретной КС6-а)
          INSERT INTO req.execution ("guid", "period_timestamp", "volume", "ks6a_item_id", "ks6a_item_contractor_id") VALUES
            -- Для вида работы
            (uuid_generate_v4(), (SELECT period_timestamp FROM req.ks6a_period WHERE id = 1 AND ks6a_id = 1), 45.0227,
              (
                SELECT id FROM req.ks6a_item WHERE id = 1
              ),
              NULL
            ),
            (uuid_generate_v4(), (SELECT period_timestamp FROM req.ks6a_period WHERE id = 2 AND ks6a_id = 1), 1.9167,
              (
                SELECT id FROM req.ks6a_item WHERE id = 1
              ),
              NULL
            ),
            (uuid_generate_v4(), (SELECT period_timestamp FROM req.ks6a_period WHERE id = 3 AND ks6a_id = 1), 8.44,
              (
                SELECT id FROM req.ks6a_item WHERE id = 1
              ),
              NULL
            ),
            (uuid_generate_v4(), (SELECT period_timestamp FROM req.ks6a_period WHERE id = 4 AND ks6a_id = 1), 1.24,
              (
                SELECT id FROM req.ks6a_item WHERE id = 1
              ),
              NULL
            ),
            (uuid_generate_v4(), (SELECT period_timestamp FROM req.ks6a_period WHERE id = 5 AND ks6a_id = 1), 0.24,
              (
                SELECT id FROM req.ks6a_item WHERE id = 1
              ),
              NULL
            ),
            (uuid_generate_v4(), (SELECT period_timestamp FROM req.ks6a_period WHERE id = 6 AND ks6a_id = 1), 0,
              (
                SELECT id FROM req.ks6a_item WHERE id = 1
              ),
              NULL
            ),
            (uuid_generate_v4(), (SELECT period_timestamp FROM req.ks6a_period WHERE id = 1 AND ks6a_id = 1), 25.0227,
              (
                SELECT id FROM req.ks6a_item WHERE id = 2
              ),
              NULL
            ),
            (uuid_generate_v4(), (SELECT period_timestamp FROM req.ks6a_period WHERE id = 2 AND ks6a_id = 1), 3.04,
              (
                SELECT id FROM req.ks6a_item WHERE id = 2
              ),
              NULL
            ),
            (uuid_generate_v4(), (SELECT period_timestamp FROM req.ks6a_period WHERE id = 3 AND ks6a_id = 1), 2.104,
              (
                SELECT id FROM req.ks6a_item WHERE id = 2
              ),
              NULL
            ),
            (uuid_generate_v4(), (SELECT period_timestamp FROM req.ks6a_period WHERE id = 4 AND ks6a_id = 1), 21.33,
              (
                SELECT id FROM req.ks6a_item WHERE id = 2
              ),
              NULL
            ),
            (uuid_generate_v4(), (SELECT period_timestamp FROM req.ks6a_period WHERE id = 5 AND ks6a_id = 1), 1.04,
              (
                SELECT id FROM req.ks6a_item WHERE id = 2
              ),
              NULL
            ),
            (uuid_generate_v4(), (SELECT period_timestamp FROM req.ks6a_period WHERE id = 6 AND ks6a_id = 1), 0.04,
              (
                SELECT id FROM req.ks6a_item WHERE id = 2
              ),
              NULL
            ),
            (uuid_generate_v4(), (SELECT period_timestamp FROM req.ks6a_period WHERE id = 1 AND ks6a_id = 1), 43.0227,
              (
                SELECT id FROM req.ks6a_item WHERE id = 3
              ),
              NULL
            ),
            (uuid_generate_v4(), (SELECT period_timestamp FROM req.ks6a_period WHERE id = 2 AND ks6a_id = 1), 233.04,
              (
                SELECT id FROM req.ks6a_item WHERE id = 3
              ),
              NULL
            ),
            (uuid_generate_v4(), (SELECT period_timestamp FROM req.ks6a_period WHERE id = 3 AND ks6a_id = 1), 12.104,
              (
                SELECT id FROM req.ks6a_item WHERE id = 3
              ),
              NULL
            ),
            (uuid_generate_v4(), (SELECT period_timestamp FROM req.ks6a_period WHERE id = 4 AND ks6a_id = 1), 43.33,
              (
                SELECT id FROM req.ks6a_item WHERE id = 3
              ),
              NULL
            ),
            (uuid_generate_v4(), (SELECT period_timestamp FROM req.ks6a_period WHERE id = 5 AND ks6a_id = 1), 2.04,
              (
                SELECT id FROM req.ks6a_item WHERE id = 3
              ),
              NULL
            ),
            (uuid_generate_v4(), (SELECT period_timestamp FROM req.ks6a_period WHERE id = 6 AND ks6a_id = 1), 0.104,
              (
                SELECT id FROM req.ks6a_item WHERE id = 3
              ),
              NULL
            ),
            (uuid_generate_v4(), (SELECT period_timestamp FROM req.ks6a_period WHERE id = 1 AND ks6a_id = 1), 157.7,
              (
                SELECT id FROM req.ks6a_item WHERE id = 4
              ),
              NULL
            ),
            (uuid_generate_v4(), (SELECT period_timestamp FROM req.ks6a_period WHERE id = 2 AND ks6a_id = 1), 44.04,
              (
                SELECT id FROM req.ks6a_item WHERE id = 4
              ),
              NULL
            ),
            (uuid_generate_v4(), (SELECT period_timestamp FROM req.ks6a_period WHERE id = 3 AND ks6a_id = 1), 33.104,
              (
                SELECT id FROM req.ks6a_item WHERE id = 4
              ),
              NULL
            ),
            (uuid_generate_v4(), (SELECT period_timestamp FROM req.ks6a_period WHERE id = 4 AND ks6a_id = 1), 22.33,
              (
                SELECT id FROM req.ks6a_item WHERE id = 4
              ),
              NULL
            ),
            (uuid_generate_v4(), (SELECT period_timestamp FROM req.ks6a_period WHERE id = 5 AND ks6a_id = 1), 11.04,
              (
                SELECT id FROM req.ks6a_item WHERE id = 4
              ),
              NULL
            ),
            (uuid_generate_v4(), (SELECT period_timestamp FROM req.ks6a_period WHERE id = 6 AND ks6a_id = 1), 10.104,
              (
                SELECT id FROM req.ks6a_item WHERE id = 4
              ),
              NULL
            ),
            -- Для исполнителя
            (uuid_generate_v4(), (SELECT period_timestamp FROM req.ks6a_period WHERE id = 1 AND ks6a_id = 1), 33.2,
              (
                SELECT id FROM req.ks6a_item WHERE id = 1
              ),
              (
                SELECT id FROM req.ks6a_item_contractor WHERE id = 1
              )
            ),
            (uuid_generate_v4(), (SELECT period_timestamp FROM req.ks6a_period WHERE id = 2 AND ks6a_id = 1), 42.332,
              (
                SELECT id FROM req.ks6a_item WHERE id = 1
              ),
              (
                SELECT id FROM req.ks6a_item_contractor WHERE id = 1
              )
            ),
            (uuid_generate_v4(), (SELECT period_timestamp FROM req.ks6a_period WHERE id = 3 AND ks6a_id = 1), 32.13,
              (
                SELECT id FROM req.ks6a_item WHERE id = 1
              ),
              (
                SELECT id FROM req.ks6a_item_contractor WHERE id = 1
              )
            ),
            (uuid_generate_v4(), (SELECT period_timestamp FROM req.ks6a_period WHERE id = 4 AND ks6a_id = 1), 56.23,
              (
                SELECT id FROM req.ks6a_item WHERE id = 1
              ),
              (
                SELECT id FROM req.ks6a_item_contractor WHERE id = 1
              )
            ),
            (uuid_generate_v4(), (SELECT period_timestamp FROM req.ks6a_period WHERE id = 6 AND ks6a_id = 1), 32.2,
              (
                SELECT id FROM req.ks6a_item WHERE id = 1
              ),
              (
                SELECT id FROM req.ks6a_item_contractor WHERE id = 1
              )
            ),
            (uuid_generate_v4(), (SELECT period_timestamp FROM req.ks6a_period WHERE id = 1 AND ks6a_id = 1), 3.0227,
              (
                SELECT id FROM req.ks6a_item WHERE id = 1
              ),
              (
                SELECT id FROM req.ks6a_item_contractor WHERE id = 2
              )
            ),
            (uuid_generate_v4(), (SELECT period_timestamp FROM req.ks6a_period WHERE id = 2 AND ks6a_id = 1), 4.33,
              (
                SELECT id FROM req.ks6a_item WHERE id = 1
              ),
              (
                SELECT id FROM req.ks6a_item_contractor WHERE id = 2
              )
            ),
            (uuid_generate_v4(), (SELECT period_timestamp FROM req.ks6a_period WHERE id = 3 AND ks6a_id = 1), 2.1,
              (
                SELECT id FROM req.ks6a_item WHERE id = 1
              ),
              (
                SELECT id FROM req.ks6a_item_contractor WHERE id = 2
              )
            ),
            (uuid_generate_v4(), (SELECT period_timestamp FROM req.ks6a_period WHERE id = 4 AND ks6a_id = 1), 0.0227,
              (
                SELECT id FROM req.ks6a_item WHERE id = 1
              ),
              (
                SELECT id FROM req.ks6a_item_contractor WHERE id = 2
              )
            ),
            (uuid_generate_v4(), (SELECT period_timestamp FROM req.ks6a_period WHERE id = 6 AND ks6a_id = 1), 0.01,
              (
                SELECT id FROM req.ks6a_item WHERE id = 1
              ),
              (
                SELECT id FROM req.ks6a_item_contractor WHERE id = 2
              )
            ),
            (uuid_generate_v4(), (SELECT period_timestamp FROM req.ks6a_period WHERE id = 1 AND ks6a_id = 1), 43.2,
              (
                SELECT id FROM req.ks6a_item WHERE id = 2
              ),
              (
                SELECT id FROM req.ks6a_item_contractor WHERE id = 3
              )
            ),
            (uuid_generate_v4(), (SELECT period_timestamp FROM req.ks6a_period WHERE id = 2 AND ks6a_id = 1), 22.332,
              (
                SELECT id FROM req.ks6a_item WHERE id = 2
              ),
              (
                SELECT id FROM req.ks6a_item_contractor WHERE id = 3
              )
            ),
            (uuid_generate_v4(), (SELECT period_timestamp FROM req.ks6a_period WHERE id = 3 AND ks6a_id = 1), 14.13,
              (
                SELECT id FROM req.ks6a_item WHERE id = 2
              ),
              (
                SELECT id FROM req.ks6a_item_contractor WHERE id = 3
              )
            ),
            (uuid_generate_v4(), (SELECT period_timestamp FROM req.ks6a_period WHERE id = 4 AND ks6a_id = 1), 77.23,
              (
                SELECT id FROM req.ks6a_item WHERE id = 2
              ),
              (
                SELECT id FROM req.ks6a_item_contractor WHERE id = 3
              )
            ),
            (uuid_generate_v4(), (SELECT period_timestamp FROM req.ks6a_period WHERE id = 6 AND ks6a_id = 1), 55.2,
              (
                SELECT id FROM req.ks6a_item WHERE id = 2
              ),
              (
                SELECT id FROM req.ks6a_item_contractor WHERE id = 3
              )
            );

            -- Остаток работ по КС-6а (Итоги, только для вида работ, не для исполнителей)
            INSERT INTO req.remainder ("guid", "year", "volume", "ks6a_item_id", "period_timestamp") VALUES
            (uuid_generate_v4(), '2020', 13.7103,
              (
                SELECT id FROM req.ks6a_item WHERE id = 1
              ),
              (date_trunc('month', TO_TIMESTAMP('2020','YYYY-MM-DD HH24:MI:SS')) + interval '12 month' - interval '1 day')
            ),
            (uuid_generate_v4(), '2021', 0.24,
              (
                SELECT id FROM req.ks6a_item WHERE id = 1
              ),
              (date_trunc('month', TO_TIMESTAMP('2021','YYYY-MM-DD HH24:MI:SS')) + interval '12 month' - interval '1 day')
            ),
            (uuid_generate_v4(), '2020', 2.7103,
              (
                SELECT id FROM req.ks6a_item WHERE id = 2
              ),
              (date_trunc('month', TO_TIMESTAMP('2020','YYYY-MM-DD HH24:MI:SS')) + interval '12 month' - interval '1 day')
            ),
            (uuid_generate_v4(), '2021', 2.24,
              (
                SELECT id FROM req.ks6a_item WHERE id = 2
              ),
              (date_trunc('month', TO_TIMESTAMP('2021','YYYY-MM-DD HH24:MI:SS')) + interval '12 month' - interval '1 day')
            ),
            (uuid_generate_v4(), '2020', 3.7103,
              (
                SELECT id FROM req.ks6a_item WHERE id = 3
              ),
              (date_trunc('month', TO_TIMESTAMP('2020','YYYY-MM-DD HH24:MI:SS')) + interval '12 month' - interval '1 day')
            ),
            (uuid_generate_v4(), '2021', 3.24,
              (
                SELECT id FROM req.ks6a_item WHERE id = 3
              ),
              (date_trunc('month', TO_TIMESTAMP('2021','YYYY-MM-DD HH24:MI:SS')) + interval '12 month' - interval '1 day')
            ),
            (uuid_generate_v4(), '2020', 4.7103,
              (
                SELECT id FROM req.ks6a_item WHERE id = 4
              ),
              (date_trunc('month', TO_TIMESTAMP('2020','YYYY-MM-DD HH24:MI:SS')) + interval '12 month' - interval '1 day')
            ),
            (uuid_generate_v4(), '2021', 4.24,
              (
                SELECT id FROM req.ks6a_item WHERE id = 4
              ),
              (date_trunc('month', TO_TIMESTAMP('2021','YYYY-MM-DD HH24:MI:SS')) + interval '12 month' - interval '1 day')
            );
    `);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public async down (queryRunner: QueryRunner): Promise<void> {}
}
