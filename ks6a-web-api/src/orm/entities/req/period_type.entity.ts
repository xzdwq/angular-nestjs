import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BeforeUpdate, Generated, OneToMany } from "typeorm";

import { Ks6aPeriodEntity } from "@src/orm";

@Entity({
  synchronize: true,
  schema: 'req',
  name: 'period_type',
})
export class PeriodTypeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Generated('uuid')
  guid: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  code: string;

  @OneToMany(() => Ks6aPeriodEntity, (rel) => rel.periodType)
  ks6aPeriods: Ks6aPeriodEntity[];

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
