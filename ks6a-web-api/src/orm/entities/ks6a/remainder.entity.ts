import { BeforeUpdate, Column, CreateDateColumn, Entity, Generated, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

import { Ks6aItemEntity } from "@src/orm";
import { ReminderEnum } from '@src/dto/types/remainder.type';

@Entity({
  synchronize: true,
  schema: 'ks6a',
  name: 'remainder',
})
export class RemainderEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Generated('uuid')
  guid: string;

  @Column({
    type: 'enum',
    enum: ReminderEnum,
    default: ReminderEnum.period,
  })
  type: string;

  @Column({ length: 4 })
  year: string;

  @Column({
    type: 'decimal',
    comment: 'Остаток работ по КС-6а в конце периода (года)',
  })
  volume: number;

  @Column({
    name: 'ks6a_item_id',
    nullable: true,
  })
  ks6aItemId: number;
  @ManyToOne(() => Ks6aItemEntity, (rel) => rel.remainder, { cascade: true })
  @JoinColumn({ name: 'ks6a_item_id' })
  ks6aItem: Ks6aItemEntity;

  @CreateDateColumn({
    name: 'create_timestamp',
    type: 'timestamp',
  })
  createDate: Date;

  @UpdateDateColumn({
    name: 'update_timestamp',
    type: 'timestamp',
  })
  updateDate: Date;

  @BeforeUpdate()
  updateTimestamp (): void {
    this.updateDate = new Date;
  }
}
