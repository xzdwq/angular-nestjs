import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BeforeUpdate, Generated, ManyToOne, JoinColumn } from "typeorm";

import { Ks6aEntity, PeriodTypeEntity } from "@src/orm";

@Entity({
  synchronize: true,
  schema: 'req',
  name: 'ks6a_period',
})
export class Ks6aPeriodEntity {
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

  @Column({ default: 0 })
  isFixed: boolean;

  @Column({ nullable: true })
  ks6aId: number;
  @ManyToOne(() => Ks6aEntity, (rel) => rel.ks6aPeriods, { cascade: true })
  @JoinColumn()
  ks6a: Ks6aEntity;

  @Column({ nullable: true })
  periodTypeId: number;
  @ManyToOne(() => PeriodTypeEntity, (rel) => rel.ks6aPeriods, { cascade: true })
  @JoinColumn()
  periodType: PeriodTypeEntity;

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
