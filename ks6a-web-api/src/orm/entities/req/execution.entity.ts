import { BeforeUpdate, Column, CreateDateColumn, Entity, Generated, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

import { Ks6aItemContractorEntity, Ks6aItemEntity } from "@src/orm";

@Entity({
  synchronize: true,
  schema: 'req',
  name: 'execution',
  orderBy: {
    periodDate: 'ASC',
  },
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

  @Column({ nullable: true })
  ks6aItemId: number;
  @ManyToOne(() => Ks6aItemEntity, (rel) => rel.executions, { cascade: true })
  @JoinColumn()
  ks6aItem: Ks6aItemEntity;

  @Column({ nullable: true })
  ks6aItemContractorId: number;
  @ManyToOne(() => Ks6aItemContractorEntity, (rel) => rel.executions, { cascade: true })
  @JoinColumn()
  ks6aItemContractor: Ks6aItemContractorEntity;

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
