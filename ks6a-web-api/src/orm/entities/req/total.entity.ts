import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BeforeUpdate, OneToOne } from "typeorm";

import { Ks6aItemContractorEntity, Ks6aItemEntity } from "@src/orm";

@Entity({
  synchronize: true,
  schema: 'req',
  name: 'total',
})
export class TotalEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'uuid',
    unique: true,
    nullable: false,
  })
  guid: string;

  @Column({
    type: 'decimal',
    default: 0,
  })
  quantityVolume: number;

  @Column({
    type: 'decimal',
    default: 0,
  })
  quantitySum: number;

  @Column({
    type: 'decimal',
    default: 0,
  })
  customerVolume: number;

  @Column({
    type: 'decimal',
    default: 0,
  })
  customerSum: number;

  @Column({
    type: 'decimal',
    default: 0,
  })
  subcontractorVolume: number;

  @Column({
    type: 'decimal',
    default: 0,
  })
  subcontractorSum: number;

  @Column({
    type: 'decimal',
    default: 0,
  })
  remainderVolume: number;

  @Column({
    type: 'decimal',
    default: 0,
  })
  remainderSum: number;

  @OneToOne(() => Ks6aItemEntity, (rel) => rel.total, { cascade: true })
  ks6aItem: Ks6aItemEntity;

  @OneToOne(() => Ks6aItemContractorEntity, (rel) => rel.total, { cascade: true })
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
