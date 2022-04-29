/* eslint-disable @typescript-eslint/no-unused-vars */
import { MigrationInterface, QueryRunner } from 'typeorm';

export class OrdersTestData1639553582937 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Первичная миграция
    await queryRunner.query(`
      -- Проекты
      INSERT INTO public.project ("name", "nameEng", "code", "sorting") VALUES
        ('Блок №1', 'Block #1', 'bloсk1', 1),
        ('Блок №2', 'Block #2', 'bloсk2', 2),
        ('Блок №3', 'Block #3', 'bloсk3', 3),
        ('Блок №4', 'Block #4', 'bloсk4', 4);

      -- Объекты смет
      INSERT INTO public.object_estimate ("name", "nameEng", "code", "sorting", "projectId") VALUES
        ('Работа №1', 'Work #1', '01-01', 1,
          (
            SELECT id FROM public.project
            WHERE code = 'bloсk1'
          )
        ),
        ('Работа №2', 'Work #2', '01-02', 2,
          (
            SELECT id FROM public.project
            WHERE code = 'bloсk1'
          )
        ),
        ('Работа №3', 'Work #3', '01-03', 3,
          (
            SELECT id FROM public.project
            WHERE code = 'bloсk1'
          )
        ),
        ('Работа №4', 'Work #4', '01-04', 1,
          (
            SELECT id FROM public.project
            WHERE code = 'bloсk2'
          )
        );

        -- Сметы
        INSERT INTO public.estimate ("name", "nameEng", "code", "sorting", "localEstimateNumber", "objectEstimateId") VALUES
          ('Устройство работы', 'Work', 'work', 1, '54-аа-33',
            (
              SELECT id FROM public.object_estimate
              WHERE code = '01-01'
            )
          ),
          ('Устройство работы 1', 'Work 1', 'work1', 2, '5-а-33',
            (
              SELECT id FROM public.object_estimate
              WHERE code = '01-02'
            )
          ),
          ('Устройство работы 2', 'Work 2', 'work2', 3, '5g-y-133',
            (
              SELECT id FROM public.object_estimate
              WHERE code = '01-03'
            )
          );
    `);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public async down(queryRunner: QueryRunner): Promise<void> {}
}
