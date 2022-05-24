import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BeforeUpdate, Generated, ManyToOne, JoinColumn, OneToMany } from "typeorm";

import { EstimateEntity, Ks6aItemEntity } from "@src/orm";

@Entity({
  synchronize: true,
  schema: 'ks6a',
  name: 'journal',
})
export class Ks6aJournalEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Generated('uuid')
  guid: string;

  @Column({
    name: 'customer_name',
    length: 1024,
  })
  customerName: string;

  @Column({
    name: 'contractor_name',
    length: 1024,
  })
  contractorName: string;

  @Column({
    name: 'estimate_id',
    nullable: true,
  })
  estimateId: number;
  @ManyToOne(() => EstimateEntity, (rel) => rel.journals, { cascade: true })
  @JoinColumn({ name: 'estimate_id' })
  estimate: EstimateEntity;

  @OneToMany(() => Ks6aItemEntity, (rel) => rel.journal)
  journals: Ks6aItemEntity[];

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
