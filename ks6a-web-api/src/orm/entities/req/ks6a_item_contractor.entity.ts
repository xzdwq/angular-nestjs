import { BeforeUpdate, Column, CreateDateColumn, Entity, Generated, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

import { ContractorEntity, ExecutionEntity, Ks6aItemEntity, TotalEntity } from "@src/orm";

@Entity({
  synchronize: true,
  schema: 'req',
  name: 'ks6a_item_contractor',
})
export class Ks6aItemContractorEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Generated('uuid')
  guid: string;

  @Column({ nullable: false })
  ks6aItemId: number;
  @ManyToOne(() => Ks6aItemEntity, (rel) => rel.ks6aItemContractors, { cascade: true })
  @JoinColumn()
  ks6aItem: Ks6aItemEntity;

  @Column({ nullable: false })
  contractorGuid: string;
  @ManyToOne(() => ContractorEntity, (rel) => rel.ks6aItemsContractors, { cascade: true, eager: true })
  @JoinColumn()
  contractor: ContractorEntity;

  @Column({ nullable: true })
  totalId: number;
  @OneToOne(() => TotalEntity, (rel) => rel.ks6aItemContractor, { eager: true })
  @JoinColumn()
  total: TotalEntity;

  @OneToMany(() => ExecutionEntity, (rel) => rel.ks6aItemContractor, { eager: true })
  executions: ExecutionEntity[];

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
