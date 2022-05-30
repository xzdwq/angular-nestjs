import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BeforeUpdate, Generated, ManyToOne, JoinColumn, OneToMany } from "typeorm";

import { EstimateEntity, Ks6aItemEntity } from "@src/orm";

@Entity({
  synchronize: true,
  schema: 'req',
  name: 'ks6a',
})
export class Ks6aEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Generated('uuid')
  guid: string;

  @Column({ length: 1024 })
  customerName: string;

  @Column({ length: 1024 })
  contractorName: string;

  @Column({ nullable: true })
  estimateId: number;
  @ManyToOne(() => EstimateEntity, (rel) => rel.ks6as, { cascade: true })
  @JoinColumn()
  estimate: EstimateEntity;

  @OneToMany(() => Ks6aItemEntity, (rel) => rel.ks6a)
  ks6as: Ks6aItemEntity[];

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
