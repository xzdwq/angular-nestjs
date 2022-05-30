import { BeforeUpdate, Column, CreateDateColumn, Entity, Generated, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

import { Ks6aItemEntity } from "@src/orm";

@Entity({
  synchronize: true,
  schema: 'req',
  name: 'remainder',
})
export class RemainderEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Generated('uuid')
  guid: string;

  @Column({ length: 4 })
  year: string;

  @Column({
    type: 'decimal',
    comment: 'Остаток работ по КС-6а в конце периода (года)',
  })
  volume: number;

  @Column({ nullable: true })
  ks6aItemId: number;
  @ManyToOne(() => Ks6aItemEntity, (rel) => rel.remainders, { cascade: true })
  @JoinColumn()
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
