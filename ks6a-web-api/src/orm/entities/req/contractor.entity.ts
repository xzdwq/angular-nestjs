import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BeforeUpdate, OneToMany, Generated } from "typeorm";

import { Ks6aItemContractorEntity } from "@src/orm";

@Entity({
  synchronize: true,
  schema: 'req',
  name: 'contractor',
})
export class ContractorEntity {
  @PrimaryGeneratedColumn('uuid')
  guid: string;

  @Column()
  @Generated('increment')
  id: number;

  @Column({ length: 1024 })
  name: string;

  @OneToMany(() => Ks6aItemContractorEntity, (rel) => rel.contractor)
  ks6aItemsContractors: Ks6aItemContractorEntity[];

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
