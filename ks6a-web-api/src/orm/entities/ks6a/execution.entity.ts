import { BeforeUpdate, Column, CreateDateColumn, Entity, Generated, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

import { Ks6aItemEntity } from "@src/orm";

@Entity({
  synchronize: true,
  schema: 'ks6a',
  name: 'execution',
})
export class ExecutionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Generated('uuid')
  guid: string;

  @Column({
    name: 'period_timestamp',
    type: 'timestamp',
  })
  periodDate: Date;

  @Column({
    type: 'decimal',
    comment: 'Количество выполненных работ по КС-6а',
  })
  volume: number;

  @Column({
    name: 'ks6a_item_id',
    nullable: true,
  })
  ks6aItemId: number;
  @ManyToOne(() => Ks6aItemEntity, (rel) => rel.execution, { cascade: true })
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
